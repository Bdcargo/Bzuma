const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

router.get('/:id', async (req, res) => {
  await dbConnect();

  const { id } = req.params;

  try {
    // Ensure you're querying with _id
    const user = await User.findOne({ _id: id }); 

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
