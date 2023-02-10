import express from "express";
import { auth } from "../auth/user_auth";
import { createProduct, deleteProduct, editProduct, filterProducts, findByCategory, findProduct, getProduct } from "../controllers/ProductController";
import { upload_img } from "../services/uploadImage";
import { v_create, v_edit } from "../validations/product/validate-product";

const productRoutes = express.Router()

// productRoutes.use(multer)

productRoutes.get('/getSingleProduct/:productId', getProduct)
// productRoutes.get('/all-products', getAllProducts)
// productRoutes.get('/find-product', findProduct)
productRoutes.get('/filter-products', filterProducts)
// productRoutes.get('/find-product-by-cat/:categoryId', findByCategory)
productRoutes.post('/add-product', auth, upload_img, v_create, createProduct)
productRoutes.put('/edit-product', auth, upload_img, v_edit, editProduct)
productRoutes.delete('/delete-product/:productId', auth, deleteProduct)


export default productRoutes;