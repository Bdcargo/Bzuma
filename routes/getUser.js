const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

router.get('/:username', async (req, res) => {
  await dbConnect();

  const { username } = req.params; // Now we're using username instead of _id

  try {
    // Query by username instead of _id
    const user = await User.findOne({ username }); 

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
