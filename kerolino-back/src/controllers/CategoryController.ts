import { Request, Response } from "express";
import mongoose from "mongoose";
import { CategoryModelInterface } from "../models/category/category.interface"
import Category from "../models/category/category.model"

export const addCategory = (req: Request, res: Response) => {
    //provere
    const cat: CategoryModelInterface = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })

    return cat.save()
        .then(c => res.status(200).json({ message: 'Success' }))
        .catch(err => res.status(500).json('Connection error'))
}

export const getAllCategores = (req: Request, res: Response) => {

    return Category.find()
        .then(categories => res.status(200).json({ categories }))
        .catch(err => res.status(500).json('Connection error'))
}

export const deleteCategory = (req: Request, res: Response) => {

    return Category.findByIdAndDelete(req.params.id)
        .then(c => res.status(200).json({ message: 'Success' }))
        .catch(err => res.status(500).json('Connection error'))
}