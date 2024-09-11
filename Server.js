import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectdb from './config/db.js';
import authRoute from './routes/authRoute.js';
import catagoryRoutes from './routes/catagoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from "path";
import cors from 'cors';
import { fileURLToPath } from 'url';

// Convert import.meta.url to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configer env
dotenv.config();

// Database config
connectdb();

// Rest object
const app = express();

// Middlewares
app.use(cors({ origin: '*' })); 
app.use(express.json());
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", catagoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", productRoutes);

// Handle SPA
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
