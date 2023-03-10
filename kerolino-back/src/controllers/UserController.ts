import { Request, Response } from "express";
import mongoose from "mongoose";
import { generateAccessToken } from "../auth/user_auth";

import User from "../models/user/user.model";

export const createUser = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email, password: null });

  if (user) {
    user.set(req.body);
  } else {
    user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      address: req.body.address,
      postNumber: req.body.postNumber,
      city: req.body.city,
      phoneNum: req.body.phoneNum,
      is_seller: false,
    });
  }

  const access_token = generateAccessToken({
    _id: user._id,
    email: user.email,
    is_seller: user.is_seller,
  });

  return await user
    .save()
    .then((user) =>
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        is_seller: user.is_seller,
        fullAddress: user.address + ", " + user.postNumber + " " + user.city,
        postNumber: user.postNumber,
        address: user.address,
        city: user.city,
        phoneNum: user.phoneNum,
        access_token,
      })
    )
    .catch((err) => {
      console.log(err);
      if (err.code == 11000 && err.keyValue?.email == req.body.email) {
        res.status(500).json({ message: "User already exists" });
      } else {
        res.status(500).json({ message: "Connection error" });
      }
    });
};

export const register = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email, password: null });

  if (user) {
    user.set(req.body);
  } else {
    user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      postNumber: req.body.postNumber,
      city: req.body.city,
      phoneNum: req.body.phoneNum,
      is_seller: false,
    });
  }

  const access_token = generateAccessToken({
    _id: user._id,
    email: user.email,
    is_seller: user.is_seller,
  });

  return await user
    .save()
    .then((user) =>
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        is_seller: user.is_seller,
        fullAddress: user.address + ", " + user.postNumber + " " + user.city,
        postNumber: user.postNumber,
        address: user.address,
        city: user.city,
        phoneNum: user.phoneNum,
        access_token,
      })
    )
    .catch((err) => {
      console.log(err);
      if (err.code == 11000 && err.keyValue?.email == req.body.email) {
        res.status(500).json({ message: "User already exists" });
      } else {
        res.status(500).json({ message: "Connection error" });
      }
    });
};

export const getUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  if (!userId) {
    return res.status(500).json({ message: "token id" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Connection error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(406).json({ message: "Wrong password" });
    }
    const access_token = generateAccessToken({
      _id: user._id,
      email: user.email,
      is_seller: user.is_seller,
    });
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
      access_token,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Connection error" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.set(req.body);

    return await user
      .save()
      .then(() => res.status(200).json({ user }))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Connection error" });
      });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Connection error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  if (!userId) {
    return res.status(500).json({ message: "token id" });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Connection error" });
  }
};
