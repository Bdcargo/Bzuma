const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./utils/dbConnect'); // Assuming this handles mongoose.connect
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
dbConnect(); // Call your custom MongoDB connection function

// Import routes
const referralsRoute = require('./routes/referrals');
const registerRoute = require('./routes/register');
const transactionRoute = require('./routes/transaction');
const updateWalletRoute = require('./routes/updateWallet');
const getUserRoute = require('./routes/getUser');
const saveUserRoute = require('./routes/saveUser');

// Use routes (all routes will be prefixed with /api)
app.use('/api/referrals', referralsRoute);
app.use('/api/register', registerRoute);
app.use('/api/transaction', transactionRoute);
app.use('/api/updateWallet', updateWalletRoute);
app.use('/api/getUser', getUserRoute);
app.use('/api/saveUser', saveUserRoute);

// Default route for health check or basic response
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
