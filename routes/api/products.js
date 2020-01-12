const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// MongoDB models
const Product = require('../../models/Product');
const Company = require('../../models/Company');



// @route   POST api/products
// @desc    Add new product
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('productName', 'Product name is required')
        .not()
        .isEmpty(),
      check('productPrice', 'Price is required')
        .not()
        .isEmpty(),
      check('productVat', 'Vat class is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;

    const {
      productName,
      productDescription,
      productImage,
      productPrice,
      productVat,
      productSubhead,
      productInfoUpload,
      productExternalUrl,
    } = req.body;

    try {
      const product = new Product({
        productName,
        productDescription,
        productImage,
        productPrice,
        productVat,
        productSubhead,
        productInfoUpload,
        productExternalUrl,
        companyId
      });

      await product.save();

      return res
        .status(201)
        .json(product);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   GET api/products/
// @desc    Get all products
// @access  Public
router.get(
  '/',
  async (req, res) => {
    try {
      const products = await Product.find();

      if (products.length === 0) {
        return res
          .status(404)
          .json({
            msg: 'No products found'
          })
      }

      return res
        .status(200)
        .json(products);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   GET api/products/favorites
// @desc    Get favourite products
// @access  Private
router.get(
  '/favorites',
  auth,
  async (req, res) => {
    try {
      const company = await Company.findById(req.user.companyId);
      const favIds = company.favoriteProducts;
      const favProducts = await Product.collection.find( { _id : { $in : favIds } } );

      console.log(favProducts);

      if (favProducts.length === 0) {
        return res
          .status(404)
          .json({
            msg: 'No favorite products found'
          })
      }

      return res
        .status(200)
        .json(favProducts)
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   GET api/products/recent
// @desc    Get recently bought products
// @access  Private
router.get(
  '/recent',
  auth,
  async (req, res) => {


    const recentIds = req.body.recentProducts;

    try {
      const recProducts = Product.collection.find( { _id : { $in : recentIds } } );

      if (recProducts.length === 0) {
        return res
          .status(404)
          .json({
            msg: 'No recent products found'
          })
      }
      return res
        .status(200)
        .json(recProducts)
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);

module.exports = router;