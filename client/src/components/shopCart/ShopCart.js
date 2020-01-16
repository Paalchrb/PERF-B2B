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
    <div className="cart-company-container"
      key={index}
    >
      {/* <div className="cart-company-toggle"><i className="fas fa-chevron-down" id="cart-close-button"></i></div> */}
      <div className="cart-company"><h5>{object.sellerName}</h5></div>
      <div className="cart-tags">
        <div>Ant</div>
        <div>Produkt</div>
        <div>MVA</div>
        <div>Total (eks. mva)</div>
      </div>
      {
        object.products.map(product => (
          <div
            key={product.productId}
            className="product-line"
          >
            
              <input 
                className="cart-quantity"
                name='quantity'
                type = 'number'
                value={product.quantity}
                onChange = {event => handleChange(event, product.productId)}
              />
            <div className="cart-product-name">
              <p>{product.productName}</p>
            </div>
            
            <div className="cart-product-vat">
              <p>{product.productVat * 100}%</p>
            </div>
            <div className="cart-product-total">
              {product.productPrice * +product.quantity},-
            </div>
          </div>
        ))
      }
      {console.log(object.products)}
      
      <div className="cart-company-total">
        <div className="cart-company-total-tag">Total</div>
    <div className="cart-company-total-sum">{
      object.products.reduce((acc, product) => {
        return acc + product.productPrice * +product.quantity
      }, 0)
    },-</div>
      </div>
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
          <div className="cart">
          <i className="fas fa-times" id="cart-close-button"></i>
            <div className="cart-header"><h3 id="cart-title">Handlekurv</h3></div>
            <div className='cart-body'>
              {shopCartItems.length > 0 ? shopItemsMarkup : <p>Ingen varer i handlekurv</p>}
            </div>
            
            <div className="cart-subtotal">
              <div className="cart-subtotal-tag">Subtotal</div>
              <div className="cart-subtotal-sum">{
                shopCartObjects.reduce((acc, object) => {
                  return acc + object.products.reduce((acc, product) => {
                    return acc + product.productPrice * +product.quantity

                  }, 0)
                }, 0)
              },-</div>

            </div>
            <div className="cart-info"><p>Alle priser eks mva</p></div>
            
            <div className="cart-footer">
            <button id="cart-order-button"
              onClick={event => handleClick(event)}>
              Send bestilling
            </button>
              </div>

          </div>
          
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
