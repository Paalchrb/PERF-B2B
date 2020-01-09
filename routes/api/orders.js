const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
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



// @route    GET api/orders/me
// @desc     Get order by companyId
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const order = await Order.find(req.user.companyId);

    if (!order) return res.status(400).json({ msg: 'Order list not found' });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/orders/:orderId
// @desc     Get specific order by orderId
// @access   Private

router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(400).json({ msg: 'Order not found' });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;