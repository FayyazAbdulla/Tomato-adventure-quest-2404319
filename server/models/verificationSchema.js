// Verification.js

const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
});

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;
