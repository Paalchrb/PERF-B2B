import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCartItemQuantity, createNewOrder } from '../../actions/shopCart';
import Toolbar from '../layout/Toolbar';

const ShopCart = ({
  auth: {
    token,
  },
  shopCart: {
    shopCartItems = [],
    isLoading,
    orderCreated
  },
  updateCartItemQuantity,
  createNewOrder
}) => {
  const handleClick = event => {
    event.preventDefault();
    if(shopCartItems.length > 0) {
      shopCartItems.forEach(product => {
        createNewOrder(product.companyId, product._id, product.quantity, token );
      });
    }
  }

  const handleChange = event => {
    event.preventDefault();
    updateCartItemQuantity(event.target.value, event.target.id);
  };

  const shopItemsMarkup = shopCartItems.map((product, index) => (
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
        Total: {product.productPrice * +product.quantity}
      </p>
  </div>
  ));

  return (
    <Fragment>
      <Toolbar/>
      <div className='content-area'>
      {(orderCreated && !isLoading) ? (
        <Fragment>
          <p>Bestilling bekreftet</p>
          <Link to='#!'>Se ordre her</Link>
        </Fragment>
      ) : (
        <Fragment>
          <h3>Handlekurv</h3>
          <div className='product-container'>
            {shopCartItems.length > 0 ? shopItemsMarkup : <p>Ingen varer i handlekurv</p>}
          </div>
          <button
            onClick={event => handleClick(event)}
          >
            Send bestilling
          </button>
        </Fragment>
      )}
       </div>
    </Fragment>
  )
};

ShopCart.propTypes = {
  auth: PropTypes.object.isRequired,
  shopCart: PropTypes.object.isRequired,
  createNewOrder: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shopCart: state.shopCart
});

const mapDispatchToProps = {
  createNewOrder,
  updateCartItemQuantity
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
