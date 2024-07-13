import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();


const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//! 1. After editing, paste single post data here
//! in terminal, run: node insertSinglePostData.js
const singlePost = {
    title: "Lorem ipsum dolor sit amet",
    content: `Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet.`,
    author: "Lorem ipsum",
    //displays on page as month, day, year
    date: new Date("2024-07-09"),
    category: "Dating",
    image: {
        data: fs.readFileSync(path.join(__dirname, 'uploads', 'bumble-love.jpg')),
        contentType: 'image/jpeg'
    },
    featured: false
};



//! Function to insert a single post into MongoDB
const insertSinglePost = async () => {
    try {
        const newPost = new Post(singlePost);
        await newPost.save();
        console.log('Post inserted successfully.');
    } catch (err) {
        console.error('Error inserting post:', err);
    } finally {

        mongoose.connection.close();
    }
};


insertSinglePost();
