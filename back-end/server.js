//express
import express from 'express';
//dotenv
import dotenv from 'dotenv';
//path
import path from "path";
const __dirname = path.resolve();
//db connection
import connectDB from './config/db.js';
//middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//Routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";
//Cors
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

//middlewares (statics)
app.use(express.json());
app.use(cors());
// uploaded images folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use("/upload", uploadRoutes);

app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;


const _os = process.env.OS || process.env.XDG_SESSION_DESKTOP;



if (process.env.NODE_ENV ==='production'){
  app.use(express.static('front-end/build'));
}



app.listen(PORT, () =>
  console.log(
    `Server is up and running in ${_os} mode on port ${PORT}`
  )
);
