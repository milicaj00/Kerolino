import express from "express";
import { auth } from "../auth/user_auth";
import { createProduct, deleteProduct, editProduct, findProduct, getAllProducts, getProduct } from "../controllers/ProductController";
import { upload_img } from "../services/uploadImage";

const productRoutes = express.Router()

productRoutes.get('/getSingleProduct/:productId', getProduct)
productRoutes.get('/all-products', getAllProducts)
productRoutes.get('/find-product/:filter', findProduct)
productRoutes.post('/add-product', auth, upload_img, createProduct)
productRoutes.put('/edit-product', auth, upload_img, editProduct)
productRoutes.delete('/delete-product/:productId', auth, deleteProduct)


export default productRoutes;