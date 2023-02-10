import { NextFunction, Response, Request } from "express";
export const v_register = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || req.body.name.length < 2) {
        return res.status(403).json({ message: 'not valid name' })
    }
    if (!req.body.surname || req.body.surname.length < 2) {
        return res.status(403).json({ message: 'not valid surname' })
    }
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!req.body.email || !req.body.email.match(emailFormat)) {
        return res.status(403).json({ message: 'not valid email' })
    }
    if (!req.body.password || req.body.password.length < 5) {
        return res.status(403).json({ message: 'not valid password' })
    }
    if (!req.body.address || req.body.address.length < 2) {
        return res.status(403).json({ message: 'not valid address' })
    }
    if (req.body.postNumber < 10000 || req.body.postNumber >= 100000) {
        return res.status(403).json({ message: 'not valid postnumber' })
    }
    if (!req.body.city || req.body.city.length < 2) {
        return res.status(403).json({ message: 'not valid city' })
    }
    // const phone_format = '+381([0-9])[9]'
    if (!req.body.phoneNum || req.body.phoneNum.length < 2) {
        return res.status(403).json({ message: 'not valid phone num' })
    }

    return next()
}

export const v_create = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || req.body.name.length < 2) {
        return res.status(403).json({ message: 'not valid name' })
    }
    if (!req.body.surname || req.body.surname.length < 2) {
        return res.status(403).json({ message: 'not valid surname' })
    }

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!req.body.email || !req.body.email.match(emailFormat)) {
        return res.status(403).json({ message: 'not valid email' })
    }

    if (!req.body.address || req.body.address.length < 2) {
        return res.status(403).json({ message: 'not valid address' })
    }
    if (req.body.postNumber < 10000 || req.body.postNumber >= 100000) {
        return res.status(403).json({ message: 'not valid postnumber' })
    }
    if (!req.body.city || req.body.city.length < 2) {
        return res.status(403).json({ message: 'not valid city' })
    }
    // const phone_format = '+381([0-9])[9]'
    if (!req.body.phoneNum || req.body.phoneNum.length < 2) {
        return res.status(403).json({ message: 'not valid phone num' })
    }

    return next()
}

export const v_login = (req: Request, res: Response, next: NextFunction) => {

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!req.body.email || !req.body.email.match(emailFormat)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (!req.body.password || req.body.password.length < 5) {
        return res.status(403).json({ message: 'not valid inputs' })
    }

    return next()
}


export const v_edit = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id

    if (!userId) {
        return res.status(500).json({ message: 'token id' })
    }

    if (req.body.name && req.body.name.length < 2) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (!req.body.surname && req.body.surname.length < 2) {
        return res.status(403).json({ message: 'not valid inputs' })
    }

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (req.body.email && !req.body.email.match(emailFormat)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (req.body.password && req.body.password.length < 5) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (req.body.address && req.body.address.length < 2) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (req.body.postNumber && (req.body.postNumber < 10000 || req.body.postNumber >= 100000)) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    if (req.body.city && req.body.city.length < 2) {
        return res.status(403).json({ message: 'not valid inputs' })
    }
    // const phone_format = '+381([0-9]){9}'
    if (req.body.phoneNum && req.body.phoneNum.length < 2) {
        return res.status(403).json({ message: 'not valid inputs' })
    }

    return next()
}