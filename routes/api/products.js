const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// MongoDB models
const Product = require('../../models/Product');


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



// @route   GET api/products/favorites
// @desc    Get favourite products
// @access  Private
router.get(
  '/products/favourites',
  auth,
  async (req, res) => {


    const favoriteIds = req.body.favouriteProducts;

    try {

      // TO DO: Query all product with ID from array.

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
  '/products/recent',
  auth,
  async (req, res) => {


    const recentIds = req.body.recentProducts;

    try {

      // TO DO: Query all product with ID from array.

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