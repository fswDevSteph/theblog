# Project Title

The Blog

## Overview

The Blog is a digital trash can that homes a myriad of expressions; thoughts, experiences, perspectives, contemplations, questions, etc... It's a blog - for now.

### Problem

I have a habit of buying too many notebooks, only to leave them half-used and collecting dust. I also waste more paper than I’d like to admit. With inflation pinching everybody's wallet and my penchant for paper wasting, I need a budget-friendly, eco-conscious solution to write. Enter: a much needed digital platform. Oh! And, I hired someone to create a blog for me but somehow my information got into hackers hands and I became a victim of fraud to the tune of 4g so, I decided to learn how to build software myself.

### User Profile

- Me:
  - I'll use the app to write and share.
- Readers:
  - Will use the app for entertainment, to love or hate, criticize or relate. Maybe no one will use it all! Regardless, to each their own.

### Features

- As a user, I want a blog that only I can post blogs to
- As a user, I want home, about and blog page
- As a user, I want my homepage to show some blogs
- As a user, I want my blogs to have a title, text content, date stamp, author and image
- As a user, I want readers to be able to like a blog post
- As a user, I want to subscribe to an email letter
- As a user, I want to contact the blog by email and receive a reply
- As a user, as the blogger, I just want to run a script to create or delete posts.

### Project Implementation

- Clone the project
- CD into the project
- CD into the backend folder and run 'npm i' to install all backend dependencies
- Start the server: 'node --watch server.js'
- CD into the client folder and run 'npm i' to install all frontend dependencies
- Display project in browser: run 'npm run dev'

### Tech Stack

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
- **emailjs** : "^3.2.0"

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

- This project uses [EmailJS](https://www.emailjs.com/) to receive contact form submissions and auto respond until I can personally respond

### Sitemap

- Home - renders a bit of everything the site has
- About - Has img, about text and contact form
- Blog - has all the blogs
- Contact - is a section or page with a contact form

### Mockup for blog

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

The `Subscribe` model includes:

- `name` (String, required): The name of subscriber
- `email` (String, required): The email of the subscriber
- `consentDate` (Date, required): Date of subscription consent

### Auth

N/A

## Nice-to-haves

- Admin dashboard
- User Log in
- Comments
- Store
- img api (still involves several steps to optimize for loading)
