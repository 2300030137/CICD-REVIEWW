# Social Connect - Social Media Platform

A full-stack social media platform with user authentication, post creation, messaging, and search functionality.

## Project Structure

```
social-media-platform/
├── backend/            # Node.js Express backend
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── package.json    # Backend dependencies
│   ├── .env            # Environment variables
│   └── server.js       # Backend entry point
├── frontend/           # React frontend
│   ├── public/         # Static assets
│   ├── src/            # React source files
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── App.js      # Main app component
│   │   ├── index.js    # React entry point
│   │   └── index.css   # Global styles
│   └── package.json    # Frontend dependencies
├── .gitignore          # Git ignore file
└── README.md           # Project documentation
```

## Features

### Backend
- User authentication (register, login) with JWT
- CRUD operations for posts, comments, and messages
- User following functionality
- Like/unlike posts and comments
- Search for users
- Message between users
- MongoDB database integration with Mongoose

### Frontend
- Responsive UI with React
- User authentication pages (login, register)
- Home feed with posts
- Profile pages
- Search functionality
- Messaging system
- Create and interact with posts

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin resource sharing
- dotenv for environment variables
- multer for file uploads

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Styled components

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with the following variables (modify values according to your setup)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/social-media-platform
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server
```bash
npm run dev
```
This will start the server with nodemon for development.

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the frontend development server
```bash
npm start
```
This will start the React application at http://localhost:3000.

## Available Scripts

### Backend
- `npm run dev`: Starts the server with nodemon for development
- `npm start`: Starts the server in production mode

### Frontend
- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Runs the test runner

## API Endpoints

### Users
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login user
- `GET /api/users/:id`: Get user profile
- `PUT /api/users/:id`: Update user profile
- `PUT /api/users/:id/follow`: Follow/unfollow a user
- `GET /api/users`: Get all users
- `GET /api/users/search`: Search users

### Posts
- `POST /api/posts`: Create a new post
- `GET /api/posts`: Get all posts
- `GET /api/posts/user/:id`: Get posts by user
- `GET /api/posts/:id`: Get single post
- `PUT /api/posts/:id`: Update post
- `DELETE /api/posts/:id`: Delete post
- `PUT /api/posts/:id/like`: Like/unlike post

### Comments
- `POST /api/comments`: Create a comment
- `GET /api/comments/post/:id`: Get comments for a post
- `PUT /api/comments/:id`: Update comment
- `DELETE /api/comments/:id`: Delete comment
- `PUT /api/comments/:id/like`: Like/unlike comment

### Messages
- `POST /api/messages`: Send a message
- `GET /api/messages/:senderId/:receiverId`: Get messages between two users
- `GET /api/messages/conversations/:userId`: Get all conversations for a user
- `PUT /api/messages/read/:userId/:otherUserId`: Mark messages as read

## Deployment

For deployment, you can use platforms like Heroku, Vercel, or AWS. Make sure to set up the environment variables for production.

## Demo Mode

The application includes mock data for demo purposes. If the API calls fail (e.g., when the backend server is not running), the frontend will automatically use mock data to display content.

## Future Enhancements
- Real-time messaging with Socket.io
- File/image uploads
- Notifications system
- Advanced search filters
- Groups/communities feature"# CICD-REVIEWW" 
