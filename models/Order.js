const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  orderNumber: {
    type: String,
    required: true
  },
  orderLine: {
    productName: {
      type: String,
      required: true
    },
    productVat: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    orderLineTotal: {
      type: Number,
      required: true
    }
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  sellerContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
});

module.exports = Order = mongoose.model('Order', OrderSchema);