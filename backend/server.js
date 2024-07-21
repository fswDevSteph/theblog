import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/posts.js';
import subscribeRoutes from './routes/subscribe.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const mongoURI = process.env.MONGODB_URI;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log(`Connecting to MongoDB with URI: ${mongoURI}`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: ['https://theblog-client.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRoutes);
app.use('/api/subscribe', subscribeRoutes);

if (!mongoURI) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
}

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('MongoDB URI:', mongoURI);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
