const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// MongoDB models
const Company = require('../../models/Company');


// @route   POST api/companies
// @desc    Register company
// @access  Public
router.post(
  '/',
  [
    check('orgNum', 'Organization number is required')
      .not()
      .isEmpty(),
    check('orgNum', 'Organization number has to be 9 characters')
      .isLength(9),
      check('companyName', 'Company name is required')
        .not()
        .isEmpty(),
      check('strees', 'Street adress is required')
        .not()
        .isEmpty(),
      check('zipCode', 'Zip code is required')
        .not()
        .isEmpty(),
      check('city', 'City is required')
        .not()
        .isEmpty(),
      check('country', 'Country is required')
        .not()
        .isEmpty(),
      check('companyEmail', 'Company email is required')
        .isEmail(),
      check('companyPhone', 'Company phone number is required')
        .not()
        .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { 
      orgNum, 
      companyName,
      street,
      zipCode,
      city,
      country,
      companyEmail,
      companyPhone
    } = req.body;

    try {
      let company = await Company.findOne({ orgNum });

      if (company) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Company already exists' }] });
      }

      company = new Company({
        orgNum,
        companyName,
        address: {
          street,
          zipCode,
          city,
          country
        },
        companyContacts: {
          companyEmail,
          companyPhone
        }
      });
     
      await company.save();

      return res
        .status(201)
        .json(company);
    } catch(error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
);


// @route   GET api/companies
// @desc    Get all companies
// @access  Public
router.get(
  '/',
  async (req, res) => {
    try {
      const companies = await Company.find();
  
      return res
        .status(200)
        .json(companies);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
)


// @route    GET api/companies/me
// @desc     Get company by auth token
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.user.companyId);

    if (!company) {
      return res
        .status(400)
        .json({ msg: 'Company not found' });
    }

    return res
      .status(200)
      .json(company);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send('Server Error');
  }
});


// @route    GET api/companies/:_id
// @desc     Get company by companyId
// @access   Public
router.get(
  '/:_id', 
  async (req, res) => {
    try {
      const company = await Company.findById(req.params._id);

      if (!company) {
        return res
          .status(400)
          .json({ msg: 'Company not found' });
      }

      return res
        .status(200)
        .json(company);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   POST api/companies/products
// @desc    Add new product
// @access  Private
router.post(
  '/products',
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

    const {
      productName,
      productDescription,
      productImage,
      productPrice,
      productVat,
      productSubhead,
      productInfoUpload,
      productExternalUrl
    } = req.body;

    const newProduct= {
      productName,
      productDescription,
      productImage,
      productPrice,
      productVat,
      productSubhead,
      productInfoUpload,
      productExternalUrl
    };

    try {
      const company = await Company.findById(req.user.companyId);

      company.products.unshift(newProduct);

      await company.save();

      return res
        .status(201)
        .json(company);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   POST api/companies/products/favorites
// @desc    Add product to favorites
// @access  Private
router.post(
  '/products/favourites',
  [
    auth,
    [
      check('productId', 'Product id must be provided')
        .not()
        .isEmpty(),
      check('sellerId', 'Seller id must be provided')
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

    const { productId, sellerId } = req.body;

    try {
      const company = await Company.findById(req.user.id);

      const newFavourite = {
        productId,
        sellerId
      }

      company.favoriteProducts.unshift(newFavourite);

      company.save();

      return res
        .status(201)
        .json(company);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }  
);


// @route   GET api/companies/products/favorites
// @desc    Get favourite products
// @access  Private
router.get(
  '/products/favourites',
  auth,
  async (req, res) => {
    try {
      const company = await Company.findById(req.user.id);
      const favProducts = company.favouriteProducts;

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


// @route   GET api/companies/products/recent
// @desc    Get recently bought products
// @access  Private
router.get(
  '/products/recent',
  auth,
  async (req, res) => {
    try {
      const company = await Company.findById(req.user.id);
      const recProducts = company.favouriteProducts;

      return res
        .status(200)
        .json(recProducts);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);

module.exports = router;