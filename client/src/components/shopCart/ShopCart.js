import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { addItemToCart, updateCartItemQuantity } from '../../actions/shopCart';
=======
import { addItemToCart } from '../../actions/shopCart';
import Toolbar from '../layout/Toolbar';
>>>>>>> 3a41a0676fff55cfceda01435db0610e6f4e8ba4

const ShopCart = ({
  auth: {
    token
  },
  shopCart: {
    shopCartItems = []
  },
  addItemToCart,
  updateCartItemQuantity
}) => {
  const handleClick = event => {
    event.preventDefault();
    console.log(event.target.id)
    addItemToCart(token, '5e19e065d0a60f24bb99520a', 5);
  }

<<<<<<< HEAD
  const handleChange = event => {
    console.log(event.target.value, event.target.id)
    event.preventDefault();
    updateCartItemQuantity(event.target.value, event.target.id);
  };

  const itemMarkup = shopCartItems.map((product, index) => (
=======
  const shopItemsMarkup = shopCartItems.map((product, index) => (
>>>>>>> 3a41a0676fff55cfceda01435db0610e6f4e8ba4
    <div 
      className='product-card'
      key={index}
      id={product._id}
    >
      <h3>{product.sellerName}</h3>
      <label htmlFor='quantity'>
      Quantity:
        <input 
          name='quantity'
          type = 'number'
          value={product.quantity}
          id = {product._id}
          onChange = {event => handleChange(event)}
        />
      </label>
      <p>
        Navn:  {product.productName}
      </p>
      <p>
        Enhetspris:  {product.productPrice}
      </p>
      <p>
        Total: {+product.productPrice * +product.quantity}
      </p>
  </div>
  ));


  return (
    <Fragment>
      <Toolbar/>
      <div className='content-area'>
        <h3>This is the shopcart component</h3>
        <button
          onClick={event => handleClick(event)}
        >Add item</button>
        <div className='product-container'>
          {shopItemsMarkup}
        </div>
      <h3>This is the shopcart component</h3>
      <button
        onClick={event => handleClick(event)}
        id='1234'
      >Add item</button>
      <div className='product-container'>
        {shopItemsMarkup}
      </div>
      </div>
    </Fragment>
  )
};

ShopCart.propTypes = {
  auth: PropTypes.object.isRequired,
  shopCart: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shopCart: state.shopCart
});

const mapDispatchToProps = {
  addItemToCart,
  updateCartItemQuantity
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
