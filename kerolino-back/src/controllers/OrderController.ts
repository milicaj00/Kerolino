import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product/product.model";
import User from "../models/user/user.model";
import Order from "../models/order/order.model";
import { ProductModelInterface } from "../models/product/product.interface";
import dayjs from "dayjs";

const make_product = (order: any) => {
    return {
        amount: order.amount,
        name: 'name' in order.product && order.product.name,
        image: 'image' in order.product && order.product.image,
        price: 'price' in order.product && order.product.price,
        orderId: order._id
    }
}

const make_order = (order: any, buyer: boolean = false) => {
    let address = ""
    if ('address' in order.buyer) {
        address += order.buyer.address + ", "
    }
    if ('postNumber' in order.buyer) {
        address += order.buyer.postNumber + " "
    }
    if ('city' in order.buyer) {
        address += order.buyer.city + " "
    }
    return {
        // _id: order._id,
        sent: order.sent,
        product: order.product &&
            [
                make_product(order)
            ],
        date_ordered: dayjs(order.createdAt).format('DD-MM-YYYY HH:mm'),
        date_sent: dayjs(order.updatedAt).format('DD-MM-YYYY HH:mm'),
        buyer: buyer && {
            _id: '_id' in order.buyer ? order.buyer._id : "",
            fullName: 'fullName' in order.buyer ? order.buyer.fullName : "",
            address: address,
            phoneNumber: 'phoneNum' in order.buyer ? order.buyer.phoneNum : "",
            email: 'email' in order.buyer ? order.buyer.email : "",
        },
    }
}

export const getMyOrders = async (req: Request, res: Response) => {
    const id = res.locals.user._id

    if (!id) {
        return res.status(500).json({ message: 'token id' })
    }
    try {
        const orders = await Order.find({ buyer: id }).populate('product').sort({ createdAt: -1 }).select('-__v');

        const all_orders: any = []

        if (orders.length === 0) {
            return res.status(200).json({ all_orders })
        }

        all_orders.push(make_order(orders[0]))

        let j = 0

        for (let i = 1; i < orders.length; i++) {
            const date = dayjs(orders[i].createdAt).format('DD-MM-YYYY HH:mm')
            const order = orders[i]
            if (all_orders[j].date_ordered === date) {
                all_orders[j].product.push(make_product(order))
            }
            else {
                j++;
                all_orders.push(make_order(order))
            }
        }

        return res.status(200).json({ all_orders })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const getAllOrders = async (req: Request, res: Response) => {

    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const orders = await Order.find({ sent: false }).populate('buyer').populate('product').select('-__v');

        const all_orders: any = []
        if (orders.length === 0) {
            return res.status(200).json({ all_orders })
        }

        all_orders.push(make_order(orders[0], true))

        let j = 0

        for (let i = 1; i < orders.length; i++) {
            const date = dayjs(orders[i].createdAt).format('DD-MM-YYYY HH:mm')

            const order = orders[i]
           
            if (all_orders[j].date_ordered === date && all_orders[j].buyer._id === order.buyer._id) {
                all_orders[j].product.push(make_product(order))
            }
            else {
                j++;
                all_orders.push(make_order(order, true))
            }
        }

        return res.status(200).json({ all_orders })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const addOrder = async (req: Request, res: Response) => {
    try {

        for (let i = 0; i < req.body.products.length; i++) {

            const p = req.body.products[i]
            const product: ProductModelInterface | null = await Product.findById(p.productId)

            if (product) {
                const newAmount: number = product.amount - p.amount
                if (newAmount >= 0) {
                    await product.updateOne({ $set: { amount: newAmount } })
                }
                else return res.status(422).json({ message: 'nema dovoljno proizvoda' })
            }
            else {
                return res.status(404).json({ message: 'product not found' })
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                buyer: req.body.buyerId,
                product: p.productId,
                amount: p.amount
            })

            const user = await User.findById(req.body.buyerId)
            if (user) {
                await user.updateOne({ $push: { myOrders: order._id } })
            }
            else {
                return res.status(404).json({ message: 'user not found' })
            }

            await order.save()

        }
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ message: 'Connestion error' })
    }

}

export const deleteOrder = async (req: Request, res: Response) => {

    const { orderId } = req.params

    if (!orderId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const order = await Order.findByIdAndDelete(orderId)
        if (!order) {
            return res.status(404).json({ message: 'order not found' })
        }
        if (order.sent === false) {
            const product = await Product.findById(order.product)
            if (product !== null) {

                await product.update({
                    $set: {
                        amount: product.amount + order.amount
                    }
                })
            }
        }

        return res.status(200).json({ message: 'order deleted', order })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const sendOrder = async (req: Request, res: Response) => {

    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const { orders } = req.body


    if (!orders) {
        return res.status(422).json({ message: 'you must enter orders' })
    }

    try {
        let brisi = false
        const pom: any = await Order.findById(orders[0]).populate('buyer')

        if (pom) {
            if (!pom.buyer.password) {
                brisi = true
                await User.findByIdAndDelete(pom.buyer._id)
            }
        }
        for (let i = 0; i < orders.length; i++) {
            let order;
            if (brisi) {
                order = await Order.findByIdAndDelete(orders[i])
            }
            else {

                order = await Order.findByIdAndUpdate(orders[i], { $set: { sent: true } })
            }

            if (!order) {
                return res.status(404).json({ message: 'order not found' })
            }
        }
        return res.status(200).json({ message: 'order sent' })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}