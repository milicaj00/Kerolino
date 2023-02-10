import { NextFunction, Response, Request } from "express";

export const v_addOrder = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.buyerId) {
        return res.status(406).json({ message: 'buyer id is required' })
    }

    if (!req.body.products) {
        return res.status(406).json({ message: 'product list is required' })
    }

    if (!req.body.products.length) {
        return res.status(406).json({ message: 'product list is required' })
    }
   
    for (let i = 0; i < req.body.products.length; i++) {
        if (!req.body.products[i].productId) {
            return res.status(406).json({ message: 'product id is required' })
        }
      
        if (!req.body.products[i].amount || req.body.products[i].amount < 1) {
            return res.status(406).json({ message: 'product amount is required' })
        }
    }
    next()
}