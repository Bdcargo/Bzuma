const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

// POST route to set or update wallet name
router.post('/setWalletName', async (req, res) => {
  try {
    // Connect to the database
    await dbConnect();

    // Destructure the request body
    const { userId, walletName } = req.body;

    // Validate the presence of userId and walletName
    if (!userId || !walletName) {
      return res.status(400).json({ success: false, error: 'User ID and wallet name are required.' });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the wallet name
    user.wallet.name = walletName;

    // Save the updated user document
    await user.save();

    // Return a success response
    return res.status(200).json({ success: true, message: 'Wallet name updated successfully', wallet: user.wallet });
  } catch (error) {
    // Log the error for debugging
    console.error('Error updating wallet name:', error);

    // Return a generic error response
    return res.status(500).json({ success: false, error: 'An error occurred while updating the wallet name.' });
  }
});

module.exports = router;
