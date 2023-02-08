require('dotenv').config();
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from 'morgan';
import { json } from "body-parser";
import mongoose from 'mongoose'
import userRouter from "./src/routes/UserRoutes";
import productRoutes from "./src/routes/ProductRoutes";
import orderRoutes from "./src/routes/OrderRoutes";


mongoose.connect(process.env.MONGO_URL!, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", { error });
  })

const app = express();
app.use(json());
app.use(cors())
app.use(morgan("common"));

app.use('/api/user', userRouter)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

app.get('/test', (req: Request, res: Response) => res.send('ok'))

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
