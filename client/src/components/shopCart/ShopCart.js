import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../actions/shopCart';
import Toolbar from '../layout/Toolbar';

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

  const itemMarkup = shopCartItems.map((product, index) => (
    <div 
      className='product-card'
      key={index}
      id={product._id}
    >
      <h3>{product.productName}</h3>
      <img 
        src={product.productImage} 
        alt='Product' 
        width='100px'
        heigth='100px'
      />
      <p>Quantity: {product.quantity}</p>
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
};

const mapStateToProps = state => ({
  auth: state.auth,
  shopCart: state.shopCart
});

const mapDispatchToProps = {
  addItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
