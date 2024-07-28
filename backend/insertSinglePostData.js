import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import cloudinary from './cloudinaryConfig.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//! 1. After editing, paste single post data here
//! in terminal, run: node insertSinglePostData.js
const singlePost = {
    title: "TESTTESTTESSSSSSSST",
    content: `
There's nothing quite like the experience of getting lost in a good book. From the moment you open the cover, you're transported to another world where anything is possible. Here are a few reasons why immersing yourself in a story can be incredibly rewarding:

1. **Escapism:** Reading allows you to escape reality and enter a different realm. Whether it's a fantasy land, a different era, or an alternate universe, books provide a perfect escape from daily life.

2. **Imagination:** When you read, your imagination is free to run wild. You picture characters, settings, and events in your mind, making the experience unique to you.

3. **Empathy:** Stories often put you in the shoes of characters from various walks of life, helping you to develop a greater sense of empathy and understanding for others.

4. **Knowledge:** Even fiction can be informative. You learn about different cultures, histories, and perspectives, broadening your knowledge and worldview.

5. **Relaxation:** Reading can be a relaxing activity that helps reduce stress. It's a great way to unwind and take a break from the hustle and bustle of everyday life.

6. **Personal Growth:** Books often contain life lessons and profound insights that can inspire personal growth and self-improvement.

So, the next time you pick up a book, remember that you're not just reading words on a page—you're embarking on a journey that can enrich your mind, heart, and soul. Happy reading!
    `,
    author: "NOvel NOva Bella",
    date: new Date("2024-07-16"),
    category: "Reading",
    featured: true
};

const insertSinglePost = async () => {
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(path.join(__dirname, 'uploads', 'books2.jpg'));

        // Add the Cloudinary URL to the post data
        singlePost.imageUrl = result.secure_url;

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