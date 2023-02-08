import express, { Router } from "express";
import { addOrder, deleteOrder, getAllOrders, getMyOrders, sendOrder } from "../controllers/OrderController";

const orderRoutes: Router = express.Router()

orderRoutes.get('/all-orders', getAllOrders)
orderRoutes.get('/my-orders/:id', getMyOrders)
orderRoutes.post('/add-order', addOrder)
orderRoutes.put('/send-order/:orderId', sendOrder)
orderRoutes.delete('/delete-order/:orderId', deleteOrder)

export default orderRoutes