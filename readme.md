# Project Title

Unscripted Scribbles

## Overview

Unscripted Scribbles is a digital trash can that homes a myriad of expressions; thoughts, experiences, perspectives, contemplations, questions, etc... It's a blog - for now.

### Problem

I have a habit of buying too many notebooks, only to leave them half-used and collecting dust. I also waste more paper than I’d like to admit. With inflation pinching everybody's wallet and my penchant for paper wasting, I need a budget-friendly, eco-conscious solution to write. Enter: a much needed digital platform.

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
- *Dotenv**: ^16.4.5 (Environment variables)

### Backend

- **Express**: ^4.19.2
- **Mongoose**: ^8.4.4 (MongoDB ODM)
- **MongoDB**: ^6.7.0
- **Multer**: ^1.4.5-lts.1 (File upload)
- **GridFS Stream**: ^1.1.1 (File storage)
- **Body-Parser**: ^1.20.2
- **Cors**: ^2.8.5
- **Dotenv**: ^16.4.5 (Environment variables)

### Other Libraries

- **dotenv**: ^16.4.5
- **cors**: ^2.8.5
- **ejs**: ^3.1.10
- **base64-arraybuffer**: ^1.0.2
- **buffer**: ^6.0.3
- **buffer-from**: ^1.1.2

### APIs


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
- `likes` (Number, default: 0): The number of likes the post has received
- `featured` (Boolean, default: false): Indicates if the post is featured

#### Subscribe

The `Subscribe` model includes:
- `name` { type: String, required: true }: The subscribers name
- `email` { type: String, required: true, unique: true }: The subscribers email
- `consentDate` { type: Date, default: Date.now }: A record of the subscribers consent date

### Endpoints examples

**Get All Posts:**
HTTP Method: GET
Endpoint: /api/posts
Description: Retrieves all blog posts from the database.

**Get Single Post:**
HTTP Method: GET
Endpoint: /api/posts/:id
Description: Retrieves a single blog post by its ID.

**Create a New Post:**
HTTP Method: POST
Endpoint: /api/posts
Description: Creates a new blog post.

**Subscriber:**
HTTP Method: POST
Endpoint: /api/psubscribe
Description: handle user subscription


--implementation:

1. Add a resized img to upload folder (backend>uploads)
2. Navigate to upload script (backend>insertSinglePostData.js)
3. Paste edited blog content into respective fields (make sure to edit file image name for seo and the extension so it matches what is in the uploads folder)
4. run 'node insertSinglePostData.js' in terminal to add data to DB and verify it renders on page.
5. You can inspect the post in the browser to get the post ID and delete a post using the script that way but if you have access to compass that is much more time effective.

**Like a Post:**
HTTP Method: POST
Endpoint: /api/posts/:id/like
Description: Likes a specific blog post by its ID.

**Set a Post as Featured:**
HTTP Method: PUT
Endpoint: /api/posts/set-featured/:id
Description: Sets a specific blog post as featured by its ID.

--implementation:

1. While following the implementation steps above to Create A New Post, edit the 'feature:' key to have a value of true

**Delete a Post:**
HTTP Method: DELETE
Endpoint: /api/posts/:id
Description: Deletes a specific blog post by its ID when running the script. Though, since you probably have compass open, just click delete in the GUI on the post you want to remove.

### Auth

N/A

##

## Nice-to-haves

- Admin dashboard
- User Log in
- Comments
- Store
- img api (still involves several steps to optimize for loading)
