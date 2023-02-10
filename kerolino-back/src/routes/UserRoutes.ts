import express from "express";
import { auth } from "../auth/user_auth";
import { createUser, deleteUser, editUser, getUser, login, register } from "../controllers/UserController";
import { v_create, v_edit, v_login, v_register } from "../validations/user/validate-user";
const userRouter = express.Router()

userRouter.get('/get-user', auth, getUser)
userRouter.post('/register', v_register, register)
userRouter.post('/login', v_login, login)
userRouter.post('/add-user', v_create, createUser)
userRouter.put('/edit-user', auth, v_edit, editUser)
userRouter.delete('/delete-user', auth, deleteUser)

export default userRouter;