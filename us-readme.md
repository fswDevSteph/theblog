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
- As a user, I just want to run a script to create, update and delete posts.

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
- **Nodemon**: ^3.1.4 (Development server)
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

### Endpoints

**GET /cafes**

- Get cafés, with an optional "visited" if the user is logged in or not

Parameters:

- longitude: User-provided location as a number
- latitude: User-provided location as a number
- token (optional): JWT used to add "visited" boolean

Response:

```
[
    {
        "id": 1,
        "name": "Quantum Coffee",
        "distance": 0.25,
        "averageRating": 4.5,
        "visited": true
    },
    ...
]
```

**GET /cafes/:id**

- Get café by id, with an optional "userRating" if the user is logged in or not

Parameters:

- id: Café id as number
- token (optional): JWT used to add user rating

Response:

```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**POST /cafes/:id/rating**

- Logged in user can add their rating of a café

Parameters:

- id: Café id
- token: JWT of the logged in user
- rating: Number Rating out of 5 in 0.5 increments

Response:

```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**PUT /cafes/:id/rating**

- Logged in user can update their rating of a café

Parameters:

- id: Café id
- token: JWT of the logged in user
- rating: Number Rating out of 5 in 0.5 increments

Response:

```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features have first been implemented
  - Store JWT in localStorage, remove when a user logs out
  - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 15 sample café geolocations in two different cities

- Create seeds with sample café data

- Deploy client and server projects so all commits will be reflected in production

- Feature: List cafés from a given location

  - Implement list cafés page including location form
  - Store given location in sessionStorage
  - Create GET /cafes endpoint

- Feature: View café

  - Implement view café page
  - Create GET /cafes/:id

- Feature: Rate café

  - Add form input to view café page
  - Create POST /ratings
  - States for add & update ratings

- Feature: Home page

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Integrate Google Places / Maps
  - View more details about a café
  - Visual radius functionality
- Forgot password functionality
- Ability to add a café
- Elite status badging for users and cafés: Gamify user ratings
- Expand rating system
  - Coffee
  - Ambiance
  - Staff
- Expanded user information: full name, favorite café
- Unit and Integration Tests
