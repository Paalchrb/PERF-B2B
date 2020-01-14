import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../actions/shopCart';

const DashboardRecentProducts = ({
  products,
  auth: { token 
  },
  addItemToCart,
}) => {


  const handleClick = event => {
    event.preventDefault();
    addItemToCart(token, event.target.id);
  }


  const recentProductsMarkup = products.map(product => (
    <div 
      className='product-card'
      key={product._id}
    >
      <h4>{product.productName}</h4>
      <img 
        src={product.productImage} 
        alt='Product' 
        width='100px'
        heigth='100px'
      />
      <p>Price per unit: {product.productPrice}</p>
      <p>MVA per unit: {product.productVat}</p>
      <p>Net price per unit: {product.productPrice * (1 + product.productVat)}</p>
      <button id={product._id} onClick={event => handleClick(event)}
      >Legg i handlevogn</button> 
    </div>
  ));

  return (
    <Fragment>
      <h3>Recent products:</h3>
      <div className='product-container'> {/*add a real class here*/}
        {recentProductsMarkup}
      </div>
    </Fragment>
  );
}


DashboardRecentProducts.propTypes = {
  auth: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRecentProducts);
