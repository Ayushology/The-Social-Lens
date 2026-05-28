const express = require('express')
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({ 
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean), 
  credentials: true 
}));
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
module.exports = app