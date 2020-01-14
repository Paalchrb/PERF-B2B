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
  addItemToCart,
  updateCartItemQuantity
}) => {
  const handleClick = event => {
    event.preventDefault();
    addItemToCart(token, '5e19e065d0a60f24bb99520a', 5);
  }

  const handleChange = event => {
    console.log(event.target.value, event.target.id)
    event.preventDefault();
    updateCartItemQuantity(event.target.value, event.target.id);
  };

  const itemMarkup = shopCartItems.map((product, index) => (
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
      <div className='content-area'>
        <h3>This is the shopcart component</h3>
        <button
          onClick={event => handleClick(event)}
        >Add item</button>
        <div className='product-container'>
          {itemMarkup}
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
