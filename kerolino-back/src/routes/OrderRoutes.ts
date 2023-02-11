import express, { Router } from "express";
import { auth } from "../auth/user_auth";
import { addOrder, deleteOrder, getAllOrders, getMyOrders, sendOrder } from "../controllers/OrderController";
import { v_addOrder } from "../validations/validate-order";

const orderRoutes: Router = express.Router()

orderRoutes.get('/all-orders', auth, getAllOrders)
orderRoutes.get('/my-orders', auth, getMyOrders)
orderRoutes.post('/add-order', v_addOrder, addOrder)
orderRoutes.put('/send-order', auth, sendOrder)
orderRoutes.delete('/delete-order/:orderId', auth, deleteOrder)

export default orderRoutes