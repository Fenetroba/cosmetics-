# Real Estate MERN Application

A full-stack real estate web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS.

## Features

- User Authentication (Signup, Login, Logout)
- Property Listings with Search and Filters
- Property Details Page
- User Dashboard
- Admin Panel
- Responsive Design with Tailwind CSS

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a .env file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Project Structure

```
real-estate-app/
├── frontend/          # React frontend
├── backend/           # Node.js backend
└── README.md
``` #   c o s m e t i c s -  
 