import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCartItemQuantity, createNewOrders } from '../../actions/shopCart';
import { shopCartSelector } from '../../utils/selectors';
import Toolbar from '../layout/Toolbar';

const ShopCart = ({
  auth: {
    token,
  },
  shopCart: {
    shopCartItems,
    loading,
    orderCreated
  },
  updateCartItemQuantity,
  createNewOrders
}) => {
  const handleClick = event => {
    event.preventDefault();
    if(shopCartItems.length > 0) {
      createNewOrders(shopCartItems, token );
    }
  };

  const handleChange = (event, id) => {
    updateCartItemQuantity(event.target.value, id);
  };

  const shopCartObjects = shopCartSelector(shopCartItems);
  const shopItemsMarkup = shopCartObjects.map((object, index) => (
    <div 
      key={index}
    >
      <h3>{object.sellerName}</h3>
      {
        object.products.map(product => (
          <div
            key={product.productId}
          >
            <h4>
              Navn:  {product.productName}
            </h4>
            <label htmlFor='quantity'>
              Quantity:
              <input 
                name='quantity'
                type = 'number'
                value={product.quantity}
                onChange = {event => handleChange(event, product.productId)}
              />
            </label>
            <p>
              Enhetspris:  {product.productPrice}
            </p>
            <p>
              Total: {product.productPrice * +product.quantity}
            </p>
          </div>
        ))
      }
  </div>
  ));

  return (
    <Fragment>
      <Toolbar/>
      <div className='content-area'>
      {(orderCreated && !loading) ? (
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
  createNewOrders: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shopCart: state.shopCart
});

const mapDispatchToProps = {
  createNewOrders,
  updateCartItemQuantity
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
