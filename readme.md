# Project Title

Unscripted Scribbles

## Overview

Unscripted Scribbles is a digital trash can that homes a myriad of expressions; thoughts, experiences, perspectives, contemplations, questions, etc... It's a blog.

### Problem

I have a habit of buying too many notebooks, only to leave them half-used and collecting dust. I also waste more paper than I’d like to admit. With inflation pinching my wallet and my penchant for paper wasting, I need a budget-friendly, eco-conscious solution. Enter: a much needed digital platform.

### User Profile

- Me:
  - I'll use the app to write and share.
- Readers:
  - Will use the app for entertainment, to love or hate, criticize or relate. Maybe no one will use it all! Regardless, to each their own.

### Features

- As a user, I want a blog that I can post blogs to
- As a user, I want home, about, blog and contact sections or pages
- As a user, I want my homepage to display a featured post
- As a user, I want my homepage to display other blogs below the feature post
- As a user, I want the blogs below the feature post to only share a few sentences and then have a read more link
- As a user, I want my blogs to have a title, text content, date stamp, author and image
- As a user, I want the read more link to display the full blog text
- As a user, I want readers to be able to like a blog post
- As a user, I want readers to be able to comment on a blog post
- As a user, I want to subscribe to an email letter
- As a user, I want to contact the blog by email
- As a user, I just want to run a script to create and delete posts.

## Implementation

### Frontend

- **React**: ^18.2.0
- **React DOM**: ^18.2.0
- **React Router DOM**: ^6.23.1
- **SASS**: ^1.77.6
- **Axios**: ^1.7.2
- **Font Awesome**:
  - **@fortawesome/fontawesome-svg-core**: ^6.5.2
  - **@fortawesome/free-brands-svg-icons**: ^6.5.2
  - **@fortawesome/react-fontawesome**: ^0.2.2
- **Vite**: ^5.3.2 (Build tool)

### Backend

- **Express**: ^4.19.2
- **Mongoose**: ^8.4.4 (MongoDB ODM)
- **MongoDB**: ^6.7.0
- **JWT**: ^9.0.2 (Authentication)
- **Bcrypt**: ^2.4.3 (Password hashing)
- **Multer**: ^1.4.5-lts.1 (File upload)
- **GridFS Stream**: ^1.1.1 (File storage)
- **Body-Parser**: ^1.20.2
- **Cors**: ^2.8.5
- **Dotenv**: ^16.4.5 (Environment variables)

### Development Tools

- **ESLint**: ^8.57.0 (Linting)
  - **eslint-plugin-react**: ^7.34.1
  - **eslint-plugin-react-hooks**: ^4.6.0
  - **eslint-plugin-react-refresh**: ^0.4.6
- **@vitejs/plugin-react**: ^4.2.1 (Vite plugin for React)

### Other Libraries

- **dotenv**: ^16.4.5
- **cors**: ^2.8.5
- **ejs**: ^3.1.10
- **base64-arraybuffer**: ^1.0.2
- **buffer**: ^6.0.3
- **buffer-from**: ^1.1.2

### APIs

- No external APIs yet

### Sitemap

- Home
- About
- Blogs
- Contact

### Mockup for blog

#### Home Page

![](sketchblog.png)

### Data

#### Post

The `Post` model includes:

- `title` (String, required): The title of the blog post
- `content` (String, required): The content of the blog post
- `author` (String, required): The author of the blog post
- `date` (Date, required): The date the blog post was created
- `image` (Buffer): The image data for the blog post
- `imageUrl` (String): The URL of the image
- `likes` (Number, default: 0): The number of likes the post has received
- `featured` (Boolean, default: false): Indicates if the post is featured

#### Subscribe

The `Subscribe` feature currently collects consent, emails and names in a json file.

### Endpoints examples

**GET /**
Get all posts
Response:
[
{
"_id": "60c72b2f5f1b2c001c8e4d1a",
"title": "My First Blog Post",
"content": "This is the content of the first blog post.",
"author": "Author Name",
"date": "2023-07-05T00:00:00.000Z",
"image": {
"data": "<image data>",
"contentType": "image/png"
},
"likes": 0,
"featured": false
}
]

**GET /:id**
Get single post
Response:
{
"\_id": "60c72b2f5f1b2c001c8e4d1a",
"title": "My First Blog Post",
"content": "This is the content of the first blog post.",
"author": "Author Name",
"date": "2023-07-05T00:00:00.000Z",
"image": {
"data": "<image data>",
"contentType": "image/png"
},
"likes": 0,
"featured": false
}

**POST /:id/like**
Like a post
Parameters:

id: Post ID
Response:
{
"likes": 1
}

**DELETE /:id**

### Auth

N/A

##

## Nice-to-haves

- Admin dashboard
- User Log in
