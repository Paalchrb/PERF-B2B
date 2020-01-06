const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Test = require('../../models/Test');

// @route    POST /api/test
// @desc     Test api route setup
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('birthyear', 'Birthyear is required')
      .not()
      .isEmpty()
      .isLength(4)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, birthyear } = req.body;

    try {

      const testObject = new Test({
        name,
        birthyear
      });

      await testObject.save();

      res.status(201).json(testObject);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
