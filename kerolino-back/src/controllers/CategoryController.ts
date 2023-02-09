import { Request, Response } from "express";
import mongoose from "mongoose";
import { CategoryModelInterface } from "../models/category/category.interface"
import Category from "../models/category/category.model"

export const addCategory = async (req: Request, res: Response) => {


    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (req.body.name.length < 2) {
        res.status(422).json({ message: 'name is required' })
    }

    const cat: CategoryModelInterface = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })

    return await cat.save()
        .then(c => res.status(200).json({ message: 'Success' }))
        .catch(err => res.status(500).json('Connection error'))
}

export const getAllCategores = async (req: Request, res: Response) => {

    return await Category.find()
        .then(categories => res.status(200).json({ categories }))
        .catch(err => res.status(500).json('Connection error'))
}

export const deleteCategory = async (req: Request, res: Response) => {

    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    return await Category.findByIdAndDelete(req.params.id)
        .then(c => res.status(200).json({ message: 'Success' }))
        .catch(err => res.status(500).json('Connection error'))
}