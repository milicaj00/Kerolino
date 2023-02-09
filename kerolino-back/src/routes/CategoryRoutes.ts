import express, { Router } from "express";
import { auth } from "../auth/user_auth";
import { addCategory, deleteCategory, getAllCategores } from "../controllers/CategoryController";

const categoryRoutes: Router = express.Router()

categoryRoutes.get('/get', getAllCategores);
categoryRoutes.post('/add', auth, addCategory)
categoryRoutes.delete('/delete/:id', auth, deleteCategory)

export default categoryRoutes