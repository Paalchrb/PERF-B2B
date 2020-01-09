const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Order = require('../../models/Order');
const User = require('../../models/User');
const Company = require('../../models/Company');


// @route   POST api/orders
// @desc    Create order
// @access  Private
router.post(
  '/',
  [
    [
      check('sellerId', 'Seller id must be provided')
        .not()
        .isEmpty(),
      check('productId', 'Product id must be provided')
        .not()
        .isEmpty()
    ],
    auth,
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const {
      sellerId,
      productId,
      quantity
    } = req.body;
    
    const buyer = await Company.findById(req.user.companyId);
    const contactPerson = await User.findById(req.user.id);
    const seller = await Company.findById(sellerId);
    const product = seller.products.filter(product => product.id === productId)[0];

    const orderLineTotal =+product.productPrice * +quantity;
    const orderLineVat = +orderLineTotal * +product.productVat;
    const orderLineNetTotal = +orderLineVat + +orderLineTotal;

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
          companyId: buyer._id,
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
          companyId: seller._id,
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
          firstName: contactPerson.userContact.firstName,
          lastName: contactPerson.userContact.lastName,
          userEmail: contactPerson.userContact.userEmail,
          userPhone: contactPerson.userContact.userPhone,
        }
      });

      await order.save();

      return res
        .status(201)
        .json(order);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    }   
  }
);


// @route    GET api/orders/me
// @desc     Get order by companyId
// @access   Private
router.get(
  '/me', 
  auth, 
  async (req, res) => {
    try {
      const salesOrders = await Order.find({ 'seller.companyId': req.user.companyId });
      const procurementOrders = await Order.find({ 'buyer.companyId':req.user.companyId });

      if (salesOrders || procurementOrders) {
        return res
          .status(200)
          .send({ salesOrders, procurementOrders });
      } else {
        return res
          .status(400)
          .json({ msg: 'No orders found' });
      };
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route    GET api/orders/:orderId
// @desc     Get specific order by orderId
// @access   Private
router.get(
  '/:orderId', 
  auth, 
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);

      if (!order) {
        return res
          .status(400)
          .json({ msg: 'No orders found' });
      } 

      return res
        .status(200)
        .json(order);
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);

module.exports = router;


