const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  await dbConnect();

  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('referrals.user', 'username wallet.transaction_status');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, referrals: user.referrals });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
