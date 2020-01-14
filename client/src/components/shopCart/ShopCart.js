import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemToCart, updateCartItemQuantity } from '../../actions/shopCart';

const ShopCart = ({
  auth: {
    token
  },
  shopCart: {
    shopCartItems = []
  },
  addItemToCart
}) => {
  const handleClick = event => {
    event.preventDefault();
    addItemToCart(token, '5e19e065d0a60f24bb99520a', 5);
  }

  const handleChange = event => {
    event.preventDefault();
    updateCartItemQuantity(event.target.value, event.target.id);
  };

  const itemMarkup = shopCartItems.map((product, index) => (
    <div 
      className='product-card'
      key={index}
      id={product._id}
    >
      <h3>{product.productName}</h3>
      <label htmlFor='quantity'>
      Quantity:
        <input 
          name='quantity'
          type = 'text'
          id = {product._id}
          value = {product.quantity}
          onChange = {event => handleChange(event)}
        />
      </label>
      <p>Quantity: {product.quantity}</p>
  </div>
  ));


  return (
    <Fragment>
      <h3>This is the shopcart component</h3>
      <button
        onClick={event => handleClick(event)}
      >Add item</button>
      <div className='product-container'>
        {itemMarkup}
      </div>
    </Fragment>
  )
};

ShopCart.propTypes = {
  auth: PropTypes.object.isRequired,
  shopCart: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shopCart: state.shopCart
});

const mapDispatchToProps = {
  addItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
