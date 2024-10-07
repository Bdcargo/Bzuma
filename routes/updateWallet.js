const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  await dbConnect();

  const { userId, amount, transactionHash } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.wallet.amount_sent += amount;
    user.wallet.transaction_status = 'pending';
    user.wallet.transaction_hash = transactionHash;

    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
