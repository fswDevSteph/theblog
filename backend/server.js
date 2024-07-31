import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/posts.js';
import subscribeRoutes from './routes/subscribe.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const mongoURI = process.env.MONGODB_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Connecting to MongoDB with URI: ${mongoURI}`);

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['https://www.blogettebird.com', 'http://localhost:5173'];
        console.log('Incoming request from origin:', origin);
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/subscribe', subscribeRoutes);

if (!mongoURI) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
}

mongoose.set('debug', true); // Enable mongoose debug mode

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('MongoDB URI:', mongoURI);
        process.exit(1);
    });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

