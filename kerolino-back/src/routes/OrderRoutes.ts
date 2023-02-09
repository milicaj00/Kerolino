import express, { Router } from "express";
import { auth } from "../auth/user_auth";
import { addOrder, deleteOrder, getAllOrders, getMyOrders, sendOrder } from "../controllers/OrderController";

const orderRoutes: Router = express.Router()

orderRoutes.get('/all-orders', auth, getAllOrders)
orderRoutes.get('/my-orders', auth, getMyOrders)
orderRoutes.post('/add-order', auth, addOrder)
orderRoutes.put('/send-order/:orderId', auth, sendOrder)
orderRoutes.delete('/delete-order/:orderId', auth, deleteOrder)

export default orderRoutes