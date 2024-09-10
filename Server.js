import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from './config/db.js';
import authRoute from './routes/authRoute.js';
import catagoryRoutes from './routes/catagoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Configure dotenv
dotenv.config();

// Database configuration
connectdb();

// Create rest object
const app = express();

// Manually define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files for client build
app.use(express.static(path.join(__dirname, './client/dist')));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', catagoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/payment', productRoutes);

// Handle any other routes (React app)
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

// PORT
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});

