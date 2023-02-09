import express from "express";
import { auth } from "../auth/user_auth";
import { createUser, deleteUser, editUser, getUser, login } from "../controllers/UserController";
const userRouter = express.Router()

userRouter.get('/get-user', auth, getUser)
userRouter.post('/register', createUser)
userRouter.post('/login', login)
userRouter.put('/edit-user', auth, editUser)
userRouter.delete('/delete-user', auth, deleteUser)

export default userRouter;