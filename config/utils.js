const Order = require('../models/Order');
const User = require('../models/User');
const Company = require('../models/Company');

const formatShopCartItems = shopCartItems => {
  const shopCartObjects = [];
  shopCartItems.forEach(shopCartItem => {
    const {
      _id,
      productName,
      productPrice,
      productVat,
      companyId,
      sellerName,
      quantity
    } = shopCartItem;

    const orderLineTotal =  productPrice * +quantity;

    const existingIndex = shopCartObjects.findIndex(shopCartObject => shopCartObject.companyId === companyId);
    
    if (existingIndex !== -1) {
      shopCartObjects[existingIndex].products.push({
        _id,
        productName,
        productPrice,
        productVat,
        quantity,
        orderLineTotal
      });
    } else {
      shopCartObjects.push({
        sellerName,
        companyId,
        products: [
          {
            _id,
            productName,
            productPrice,
            productVat,
            quantity,
            orderLineTotal
          }
        ]
      });
    }
  });

  return shopCartObjects;
};


const createOrder = async (cartOrder, userId, buyerCompanyId) => {
  try {
    const contactPerson = await User.findById(userId);
    const buyer = await Company.findById(buyerCompanyId);
    const seller = await Company.findById(order.companyId);
    
    
    const order = new Order({   
      orderLine: [
        ...cartOrder.products
      ],
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
  
    seller.recentOrders.unshift(order._id);
    if (seller.recentOrders.length > 4) {
      seller.recentOrders = seller.recentOrders.slice(5);
    }
  
    buyer.recentOrders.unshift(order._id);
    if (buyer.recentOrders.length > 4) {
      buyer.recentOrders = buyer.recentOrders.slice(5);
    }
    
    //avoid duplicate products in recent products:
    if(!buyer.recentProducts.includes(productId)) {
      buyer.recentProducts.unshift(productId);
      if (buyer.recentProducts.length > 4) {
        buyer.recentProducts = buyer.recentProducts.slice(5);
      }
    }
    console.log(order)
  /*   await order.save();
    await seller.save();
    await buyer.save() */

    return order._id
  } catch(error) {

  }
}

module.exports = {
  formatShopCartItems,
  createOrder
}