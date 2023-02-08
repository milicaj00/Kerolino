import express from "express";
import { createProduct, deleteProduct, editProduct, findProduct, getAllProducts, getProduct } from "../controllers/ProductController";
import { upload_img } from "../services/uploadImage";
// import { upload } from "../controllers/uploadImage";

const productRoutes = express.Router()

productRoutes.get('/getSingleProduct/:productId', getProduct)
productRoutes.get('/all-products', getAllProducts)
// productRoutes.post('/add-product', upload.single('image'), createProduct)
productRoutes.post('/add-product', upload_img, createProduct)
productRoutes.put('/edit-product', editProduct)
productRoutes.delete('/delete-product/:productId', deleteProduct)

productRoutes.get('/find-product/:filter', findProduct)


export default productRoutes;