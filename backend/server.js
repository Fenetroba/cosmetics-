import  express  from 'express';
import mongoose from 'mongoose';
import  cors from 'cors';
import  dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import Auth from './routes/auth.js'
import users from './routes/users.js'
import dbconnect from './lib/DB.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PATCH", "DELETE","PUT"],
  allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth',Auth);
// app.use('/api/properties');
app.use('/api/users',users );

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbconnect()
}); 