import express from "express";
import { createUser, deleteUser, editUser, getUser } from "../controllers/UserController";
const userRouter = express.Router()

userRouter.get('/get-user/:userId', getUser)
userRouter.post('/register', createUser)
userRouter.put('/edit-user', editUser)
userRouter.delete('/delete-user/:userId', deleteUser)

export default userRouter;