const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalSales: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  avatar: { type: String },
  coverImage: { type: String },
  specialties: [String],
  responseTime: { type: String },
  shippingPolicy: { type: String },
  returnPolicy: { type: String },
  joinedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
