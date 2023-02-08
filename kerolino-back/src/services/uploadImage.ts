import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')

    },

    filename: function (req: any, file: any, cb: any) {
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePreffix + "_" + file.originalname)
    }
});
const fileFilter = (req: any, file: any, callback: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        return callback(null, true);
    }
    return callback(new Error('Only images are allowed'));
}


var upload = multer({
    storage,
    fileFilter
});

var uploadSingle = upload.single('image');

export const upload_img = (req: any, res: any, next: any) => {
    uploadSingle(req, res, (err) => {

        if (err) return res.status(500).send({ success: false, message: 'Only image are allowed' })

        const file = req.file;

        // if (!file) {
        //     return res.status(500).send({ success: false, message: "Please upload a file" });
        // }

        next()
    })

}
