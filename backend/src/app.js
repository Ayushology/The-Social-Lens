const express = require('express');
const cors = require('cors'); // 💡 1. Import CORS
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Matches your default Vite local port
    credentials: true                // Allows cookies/tokens to pass through
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Helps parse standard form data
app.use(cookieParser());

// Route Declarations
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 

module.exports = app;