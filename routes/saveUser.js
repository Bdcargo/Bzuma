const express = require('express');
const dbConnect = require('../utils/dbConnect');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  await dbConnect();

  const { id, username, first_name, last_name } = req.body;

  try {
    let user = await User.findOne({ id });

    if (!user) {
      user = await User.create({
        id,
        username,
        first_name,
        last_name,
        wallet: {
          balance: 0,
          transaction_status: 'inactive',
          number_referred: 0,
          transaction_hash: '',
        },
      });
    } else {
      user.username = username;
      user.first_name = first_name;
      user.last_name = last_name;

      await user.save();
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
