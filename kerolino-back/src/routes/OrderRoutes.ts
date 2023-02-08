import express from "express";
import { addOrder, deleteOrder, getAllOrders, getMyOrders } from "../controllers/OrderController";

const orderRoutes = express.Router()

orderRoutes.get('/all-orders', getAllOrders)
orderRoutes.get('/my-orders/:id', getMyOrders)
orderRoutes.post('/add-order', addOrder)
orderRoutes.delete('/delete-order', deleteOrder)

export default orderRoutes