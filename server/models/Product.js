const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  category: { type: String, required: true, enum: ['Sacred Collections', 'Mijalis Fashion', 'Religious Art', 'Sacred Keepsakes'] },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  tags: [String],
  specifications: { type: Map, of: String },
  dateAdded: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
