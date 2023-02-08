import express, { Router } from "express";
import { addCategory, deleteCategory, getAllCategores } from "../controllers/CategoryController";

const categoryRoutes: Router = express.Router()

categoryRoutes.get('/get', getAllCategores);
categoryRoutes.post('/add', addCategory)
categoryRoutes.delete('/delete/:id', deleteCategory)

export default categoryRoutes