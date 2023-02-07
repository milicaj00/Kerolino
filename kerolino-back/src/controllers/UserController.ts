import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user/user.model";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,

    })
    return await user.save()
        .then(() => res.status(200).json({ user }))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Connection error' })
        })
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    console.log(req.params)

    if (!userId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({ user })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const editUser = async (req: Request, res: Response, next: NextFunction) => {

    const { userId } = req.body

    if (!userId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        user.set(req.body)

        return await user.save()
            .then(() => res.status(200).json({ user }))
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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({ message: 'User deleted' })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }

}