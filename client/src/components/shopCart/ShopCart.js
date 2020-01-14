import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemToCart, updateCart } from '../../actions/shopCart';

const ShopCart = ({
  auth: {
    token
  },
  shopCartItems = [],
  addItemToCart,
  updateCart
}) => {
  let shopItemsMarkup = [];
  useEffect(() => {
    shopItemsMarkup = createCartItemMarkup(shopCartItems);
  })


  const handleClick = event => {
    event.preventDefault();
    console.log(event.target.id)
    addItemToCart(token, '5e19e065d0a60f24bb99520a', 5);
  }
  
  const createCartItemMarkup = (products) => {
    const itemMarkup = products.map(product => (
      <div 
      className='product-card'
      key={product._id}
      >
        <h3>{product.productName}</h3>
        <img 
          src={product.productImage} 
          alt='Product' 
          width='100px'
          heigth='100px'
        />
    </div>
    ));
    return itemMarkup;
  }

  return (
    <Fragment>
      <h3>This is the shopcart component</h3>
      <button
        onClick={event => handleClick(event)}
        id='1234'
      >Add item</button>
      <div className='product-container'>
        {shopItemsMarkup}
      </div>
    </Fragment>
  )
};

ShopCart.propTypes = {
  auth: PropTypes.object.isRequired,
  shopCartItems: PropTypes.array,
  addItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  shopCartItems: state.shopCartItems
});

const mapDispatchToProps = {
  addItemToCart,
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
