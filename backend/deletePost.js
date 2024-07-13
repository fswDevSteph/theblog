//! SCRIPT TO RUN TO DELETE POST BY ID: node deletePost.js
const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const deletePostById = async (id) => {
    try {
        const result = await Post.findByIdAndDelete(id);
        if (!result) {
            console.log(`Post with id ${id} not found.`);
        } else {
            console.log(`Post with id ${id} deleted.`);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    } finally {
        mongoose.connection.close();
    }
};

//! Replace '' with the actual id
deletePostById('66816c912c694821c6117409');

