const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String
  },
  productImage: {
    type: String
  },
  productPrice: {
    type: Number
  },
  productVat: {
    type: Number
  },
  active: {
    type: Boolean,
    required: true
  },
  productSubhead: {
    type: String
  },
  productFileUpload:{
    type: String
  },
  productExternalUrl: {
    type: String
  }


});

module.exports = Product = mongoose.model('product', ProductSchema);