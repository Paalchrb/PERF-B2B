const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Order = require('../../models/Order');

// @route   POST api/orders
// @desc    Create order
// @access  Private

router.post(
  '/', 
  // [ auth, 
    [
      check('orgNum', 'Organization number is required')
        .not()
        .isEmpty(),
      check('orgNum', 'Organization number has to be 9 characters')
        .isLength(9)
    // ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const {
      
    // } = req.body;

    try {
      
      const order = new Order({
        orderDate,
        orderNumber,
        orderLine: {
          productName,
          productVat,
          quantity,
          orderLineTotal
        },
        buyer: {
          companyId,
          orgNum,
          companyName,
          address
        },
        seller: {
          companyId,
          orgNum,
          companyName,
          address
        },
        sellerContact: {
          firstName,
          lastName,
          userPhone,
          userEmail
        }
      });

      await order.save();

      res.status(201).json(order);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }   
  }
);

module.exports = router;