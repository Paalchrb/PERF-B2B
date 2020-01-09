const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
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
      .isLength(9)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      console.error(err.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
)

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
      console.error(err.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
)


// @route    GET api/companies/:companyId
// @desc     Get profile by companyId
// @access   Public

router.get('/:companyId', async (req, res) => {
  try {
    const company = await Company.findOne({
      Company: req.params.companyId
    });

    if (!company) return res.status(400).json({ msg: 'Company not found' });

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind == '_id') {
      return res.status(400).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server Error');
  }
});


// @route    GET api/companies/:me
// @desc     Get profile by companyId
// @access   Private
router.get('/:me', auth, async (req, res) => {
  try {
    const company = await Company.findOne({
      Company: req.params.me
    });

    if (!company) return res.status(400).json({ msg: 'Company not found' });

    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind == '_id') {
      return res.status(400).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server Error');
  }
});

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
      active,
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
      active,
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
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


module.exports = router;