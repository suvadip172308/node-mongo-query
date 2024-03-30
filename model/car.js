const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0
  },
  capacity: {
    type: String,
  }
});

const CarModel = mongoose.model('cars', CarSchema);

module.exports = {
  CarModel
}