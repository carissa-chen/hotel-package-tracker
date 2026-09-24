const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: [true, 'Tracking number is required'],
    trim: true
  },
  recipientName: {
    type: String,
    required: [true, 'Recipient name is required'],
    trim: true
  },
  carrier: {
    type: String,
    required: [true, 'Carrier is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Logged', 'In Transit', 'Delivered'],
    default: 'Logged'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema);
