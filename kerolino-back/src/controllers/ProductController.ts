import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product/product.model";
import User from "../models/user/user.model";

export const createProduct = async (req: Request, res: Response) => {
    //PROVERE !!!
    console.log(req.file)
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            image: req.file?.path.split('\\')[1],
            price: req.body.price,
            amount: req.body.amount,
            owner: req.body.ownerId
        })
        const user = await User.findById(req.body.ownerId)
        if (user) {
            await user.updateOne({ $push: { myProducts: product._id } })
        }

        return await product.save()
            .then(() => res.status(200).json({ product }))
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Connection error' })
            })
    } catch (error) {
        console.log('error', error)
    }

}

export const getProduct = async (req: Request, res: Response) => {
    const { productId } = req.params

    if (!productId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const product = await Product.findById(productId).populate('owner').select('-__v');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        return res.status(200).json({ product })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const getAllProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.find().populate('owner').select('-__v');

        return res.status(200).json({ products })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const editProduct = async (req: Request, res: Response) => {

    //PROVERE !!!
    const { productId } = req.body

    if (!productId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'product not found' })
        }
        product.set(req.body)

        return await product.save()
            .then(() => res.status(200).json({ product }))
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Connection error' })
            })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { productId } = req.params

    if (!productId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const product = await Product.findByIdAndDelete(productId)
        if (!product) {
            return res.status(404).json({ message: 'product not found' })
        }
        return res.status(200).json({ message: 'product deleted' })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }

}


export const findProduct = async (req: Request, res: Response) => {

    const filter: string = req.params.filter

    try {
        const products = await Product.find({ name: { $regex: filter } }).populate('owner').select('-__v');

        return res.status(200).json({ products })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}