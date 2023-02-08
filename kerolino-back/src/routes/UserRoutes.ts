import express from "express";
import { createUser, deleteUser, editUser, getUser, login } from "../controllers/UserController";
const userRouter = express.Router()

userRouter.get('/get-user/:userId', getUser)
userRouter.post('/register', createUser)
userRouter.post('/login', login)
userRouter.put('/edit-user', editUser)
userRouter.delete('/delete-user/:userId', deleteUser)

export default userRouter;