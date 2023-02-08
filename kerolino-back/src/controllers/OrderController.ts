import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product/product.model";
import User from "../models/user/user.model";
import Order from "../models/order/order.model";
import { ProductModelInterface } from "../models/product/product.interface";

export const getMyOrders = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const orders = await Order.find({ buyer: id }).populate('product').select('-__v');

        return res.status(200).json({ orders })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const getAllOrders = async (req: Request, res: Response) => {

    try {
        const orders = await Order.find().populate('buyer').populate('product').select('-__v');

        return res.status(200).json({ orders })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}
export const addOrder = async (req: Request, res: Response) => {
    try {
        type MyType = ProductModelInterface | null
        const product: MyType = await Product.findById(req.body.productId)

        if (product) {

            console.log(typeof product.amount)
            const newAmount: number = product.amount - req.body.amount
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
            product: req.body.productId,
            amount: req.body.amount
        })

        const user = await User.findById(req.body.buyerId)
        if (user) {
            await user.updateOne({ $push: { myOrders: order._id } })
        }
        else {
            return res.status(404).json({ message: 'user not found' })
        }

        return await order.save()
            .then(() => res.status(200).json({ order }))
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Connection error' })
            })
    } catch (error) {
        console.log('error', error)
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
        return res.status(200).json({ message: 'order deleted' })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}