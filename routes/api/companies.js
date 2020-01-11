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
      check('street', 'Street adress is required')
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


// @route   POST api/companies/favorite-products
// @desc    Add product to favorites
// @access  Private
router.post(
  '/favorite-products',
  [
    auth,
    [
      check('productId', 'Product id must be provided')
        .not()
        .isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { productId } = req.body;

    try {
      const company = await Company.findById(req.user.companyId);

      company.favoriteProducts.unshift(productId);

      company.save();

      return res
        .status(201)
        .json(company.favoriteProducts);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }  
);


// Strecth @TODO: route to unfavorite item **


module.exports = router;