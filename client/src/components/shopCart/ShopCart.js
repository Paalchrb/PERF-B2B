import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemToCart } from '../../actions/shopCart';

const ShopCart = ({
  auth: {
    token
  },
  shopCart,
  addItemToCart
}) => {
  const handleClick = event => {
    event.preventDefault();
    addItemToCart(token, '5e19e065d0a60f24bb99520a', 5);
  }

  return (
    <Fragment>
      <h3>This is the shopcart component</h3>
      <button
        onClick={event => handleClick(event)}
      >Add item</button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
