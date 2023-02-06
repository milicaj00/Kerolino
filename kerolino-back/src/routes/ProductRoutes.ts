import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, getProduct } from "../controllers/ProductController";

const productRoutes = express.Router()

productRoutes.get('/getSingleProduct/:productId', getProduct)
productRoutes.get('/all-products', getAllProducts)
productRoutes.post('/add-product', createProduct)
productRoutes.put('/edit-product', editProduct)
productRoutes.delete('/delete-product/:productId', deleteProduct)

export default productRoutes;