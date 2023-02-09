import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product/product.model";
import User from "../models/user/user.model";
import { v_create, v_edit } from "../validations/product/validate-product";

export const createProduct = async (req: Request, res: Response) => {
    //PROVERE !!!
    if (!v_create(req.body)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (!req.body.categoryId) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (!req.file) {
        return res.status(403).json({ message: 'you must enter an image' })
    }

    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            image: req.file?.path.split('\\')[1],
            price: req.body.price,
            amount: req.body.amount,
            category: req.body.categoryId
            //  owner: req.body.ownerId
        })
        // const user = await User.findById(req.body.ownerId)
        // if (user) {
        //     await user.updateOne({ $push: { myProducts: product._id } })
        // }

        return await product.save()
            .then(() => res.status(200).json({ message: 'Successfully added new product' }))
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
        const product = await Product.findById(productId).populate('category').select('-__v');
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
        const products = await Product.find().populate('category')

        return res.status(200).json({ products })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const editProduct = async (req: Request, res: Response) => {

    if (!v_edit(req.body)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }

    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

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

        if (req.file) {
            product.set({ image: req.file.path.split('\\')[1] })
        }

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
    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

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
        const products = await Product.find({ name: { $regex: filter } }).populate('category').select('-__v');

        return res.status(200).json({ products })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}