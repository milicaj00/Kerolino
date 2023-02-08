import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Role } from "../models/user/role";
import User from "../models/user/user.model";
import { v_edit, v_login, v_register } from "../validations/user/validate-user";

export const createUser = async (req: Request, res: Response) => {

    //PROVERE !!!

    if (!v_register(req.body)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        postNumber: req.body.postNumber,
        city: req.body.city,
        phoneNum: req.body.phoneNum,
        is_seller: false
    })

    return await user.save()
        .then(() => res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            is_seller: user.is_seller,
            fullAddress: user.address + ", " + user.postNumber + " " + user.city,
            postNumber: user.postNumber,
            address: user.address,
            city: user.city,
            phoneNum: user.phoneNum,
        }))
        .catch(err => {
            console.log(err)
            if (err.code == 11000 && err.keyValue?.email == req.body.email) {
                res.status(500).json({ message: 'User already exists' })
            }
            else {
                res.status(500).json({ message: 'Connection error' })
            }
        })
}

export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    try {
        const user = await User.findById(userId)//.populate('myProducts')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            is_seller: user.is_seller,
            fullAddress: user.address + ", " + user.postNumber + " " + user.city,
            postNumber: user.postNumber,
            address: user.address,
            city: user.city,
            phoneNum: user.phoneNum,
        })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    //PROVERE

    if (!v_login(req.body)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (!await user.comparePassword(password)) {
            return res.status(406).json({ message: 'Wrong password' })
        }
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            is_seller: user.is_seller,
            fullAddress: user.address + ", " + user.postNumber + " " + user.city,
            postNumber: user.postNumber,
            address: user.address,
            city: user.city,
            phoneNum: user.phoneNum,
        })
    }
    catch (err: any) {
        console.log(err)
        return res.status(500).json({ message: 'Connection error' })
    }
}

export const editUser = async (req: Request, res: Response) => {

    //PROVERE !!!
    const { userId } = req.body

    if (!userId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    if (!v_edit(req.body)) {
        return res.status(403).json({ message: 'not valid inputs' })
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

export const deleteUser = async (req: Request, res: Response) => {
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