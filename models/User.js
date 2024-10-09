const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Make username required
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referrals: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'inactive' },
  }],
  wallet: {
    balance: { type: Number, default: 0 },
    name: { type: String, default: "" },
    amount_sent: { type: Number, default: 0 },
    transaction_status: { type: String, default: 'inactive' },
    transaction_hash: { type: String, default: '' },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
