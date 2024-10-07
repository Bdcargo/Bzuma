const express = require('express'); // Require express
const mongoose = require('mongoose');
require('dotenv').config();


const mongoUri = process.env.MONGODB_URI;

const dbConnect = ()=>{

    console.log('what', process.env.MONGODB_URI)
    
mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 20000 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

}


module.exports = dbConnect;
