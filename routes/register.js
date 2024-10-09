const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

// POST route for user registration
router.post('/', async (req, res) => {
  try {
    // Connect to the database
    await dbConnect();

    // Destructure the request body
    const { username, referredBy } = req.body;

    // Validate the presence of username
    if (!username) {
      return res.status(400).json({ success: false, error: 'Username is required.' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Username already exists.' });
    }

    // Handle referral logic if referredBy is provided
    let referrer = null;
    if (referredBy) {
      referrer = await User.findOne({ username: referredBy });
      if (!referrer) {
        return res.status(400).json({ success: false, error: 'Referrer not found.' });
      }
    }

    // Create a new user instance
    const newUser = new User({
      username,
      referredBy: referrer ? referrer._id : null,  // Store referrer's ObjectId if exists
    });

    // Save the new user to the database
    await newUser.save();

    // Add referral information to the referrer if exists
    if (referrer) {
      referrer.referrals.push({
        user: newUser._id,
        status: 'inactive',
      });
      await referrer.save(); // Save the updated referrer document
    }

    // Return a success response with the new user's data
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    // Log the error for debugging
    console.error('Registration error:', error);
    
    // Return a generic error response
    return res.status(500).json({ success: false, error: 'An error occurred while registering the user.' });
  }
});

module.exports = router;
