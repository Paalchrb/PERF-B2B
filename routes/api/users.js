const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public

router.post(
  '/',
  [
    check('userEmail', 'Email is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      firstName, 
      lastName,
      userEmail,
      userPhone,
      password,
      password2,
      companyId
    } = req.body;

    try {
      let user = await User.findOne({ userEmail });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      if (password != password2) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Passwords do not match' }] });
      }

      user = new User({
        userContact: {
          firstName,
          lastName,
          userEmail,
          userPhone
        },
        companyId
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(201).json(user);
    } catch(error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
)

module.exports = router;