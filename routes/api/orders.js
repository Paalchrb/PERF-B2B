const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Order = require('../../models/Order');
const User = require('../../models/Order');
const Company = require('../../models/Order');

// @route   POST api/orders
// @desc    Create order
// @access  Private
router.post(
  '/', 
  [ auth, 
    [
      check('orgNum', 'Organization number is required')
        .not()
        .isEmpty(),
      check('orgNum', 'Organization number has to be 9 characters')
        .isLength(9)
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const buyer = await Company.findById(req.user.companyId);
    const buyerContact = await User.findById(req.user.userId);
    
    const {
      sellerId,
      productId,
      quantity
    } = req.body;
    
    const seller = await Company.findById(sellerId);
    const product = seller.products.filter(product => product.id === productId);

    const orderLineTotal = product.productPrice * quantity;
    const orderLineVat = orderLineNetTotal * product.productVat;
    const orderLineNetTotal = orderLineVat + orderLineTotal;

    try {
      const order = new Order({   
        orderLine: {
          productId: productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productVat: product.productVat,
          quantity,
          orderLineNetTotal
        },
        buyer: {
          companyId: buyer.companyId,
          orgNum: buyer.orgNum,
          companyName: buyer.companyName,
          address: {
            street: buyer.address.street,
            zipCode: buyer.address.zipCode,
            city: buyer.address.city,
            country: buyer.address.country
          }
        },
        seller: { 
          companyId: seller.companyId,
          orgNum: seller.orgNum,
          companyName: seller.companyName,
          address: {
            street: seller.address.street,
            zipCode: seller.address.zipCode,
            city: seller.address.city,
            country: seller.address.country
          }
        },
        buyerContact: {
          firstName: user.userContact.firstName,
          lastName: user.userContact.lastName,
          userEmail: user.userContact.userEmail,
          userPhone: user.userContact.userPhone,
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
    const salesOrders = await Order.find({'seller.companyId':req.user.companyId});

    const procurementOrders = await Order.find({'buyer.companyId':req.user.companyId});

    if (salesOrders || procurementOrders) {
      return res.json(salesOrders = {}, procurementOrders = {})
    } else {
      return res.status(400).json({ msg: 'Order list not found' }
    )};

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



