import { NextFunction, Request, Response } from "express";
import { ProductModelInterface } from "../../models/product/product.interface";

export const v_create = (req: Request, res: Response, next: NextFunction) => {


    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    console.log(req.body)

    if (!req.body.categoryId) {
        return res.status(403).json({ message: 'categoryId not valid' })
    }

    if (!req.file) {
        return res.status(403).json({ message: 'you must enter an image' })
    }

    if (!req.body.name || req.body.name.length < 2) {
        return res.status(406).json({ message: "name not valid" })
    }

    if (req.body.price < 1 || req.body.price >= 100000) {
        return res.status(406).json({ message: "price not valid" })
    }

    if (req.body.amount < 1 || req.body.amount >= 100000) {
        return res.status(406).json({ message: "amount not valid" })
    }

    next()

}


export const v_edit = (req: Request, res: Response, next: NextFunction) => {

    if (!res.locals.user.is_seller) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!req.body.productId) {
        return res.status(422).json({ message: 'you must enter id' })
    }

    if (req.body.name && req.body.name.length < 2) {
        return res.status(406).json({ message: "name not valid" })
    }

    if (req.body.price && (req.body.price < 1 || req.body.price >= 100000)) {
        return res.status(406).json({ message: "price not valid" })
    }

    if (req.body.amount && (req.body.amount < 1 || req.body.amount >= 100000)) {
        return res.status(406).json({ message: "amount not valid" })
    }

    next()
}