MERN Chat App with Socket.IO

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for live messaging. Users can sign up, log in, chat in real-time, and view online users.

🔥 Features

User Authentication (Sign up / Login) with JWT

Real-time chat using Socket.IO

Online user tracking

Send and receive messages instantly

Profile page to view user info

Responsive design

🛠 Tech Stack

Frontend:

React

Tailwind CSS

React Router

React Hot Toast (Notifications)

Axios

Backend:

Node.js

Express.js

MongoDB + Mongoose

Socket.IO

dotenv

bcryptjs (Password hashing)

jsonwebtoken (JWT Authentication)

Hosting / Deployment:

Frontend: Render / Vercel

Backend: Render / Heroku

Database: MongoDB Atlas

📂 Project Structure
chat-app/
├── backend/
│   ├── Routes/
│   ├── lib/
│   ├── index.js
│   ├── package.json
├── frontend/
│   ├── public/
│   │   └── R.jpeg (background)
│   ├── src/
│   │   ├── assets/
│   │   ├── Pages/
│   │   ├── context/
│   │   └── App.jsx
│   ├── package.json
├── README.md

🚀 Installation
Backend Setup

Navigate to backend folder:

cd backend


Install dependencies:

npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173


Start the server:

npm run dev

Frontend Setup

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Create .env file (optional):

VITE_API_URL=http://localhost:5000/api


Start the frontend:

npm run dev

⚡ Usage

Open your browser at:

http://localhost:5173


Sign up or log in.

Send and receive messages in real-time.

View online users.

🔧 Socket.IO Configuration

Backend (Node.js / Express):

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://your-frontend-url.com"],
    credentials: true
  }
});

io.on("connection", socket => {
  console.log("User connected", socket.id);
});


Frontend (React):

import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: { userId: currentUserId }
});

🔐 Authentication

Passwords hashed with bcryptjs

Authenticated routes protected using JWT middleware

Cookies or localStorage used to store JWT

🌐 Deployment

Frontend hosted on Render / Vercel

Backend hosted on Render / Heroku

MongoDB Atlas for database

🎨 Screenshots

(Add screenshots of Login, Home, Profile, and chat interface here)

🤝 Contributing

Fork the repository

Create your branch: git checkout -b feature/YourFeature

Commit changes: git commit -m "Add some feature"

Push to the branch: git push origin feature/YourFeature

Create a Pull Request
