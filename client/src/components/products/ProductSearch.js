import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/productSearch';
import { addItemToCart } from '../../actions/shopCart';
import Toolbar from '../layout/Toolbar';


const ProductSearch = ({ auth: { isAuthenticated }, products, getAllProducts, searchField, addItemToCart }) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleClick = id => {
    if (isAuthenticated) {
      addItemToCart(id);
    }
  };

  const allProducts = products
  .filter(product => {
    return (
      product.productName.toLowerCase().includes(searchField.toLowerCase()) ||
      product.productSubhead.toLowerCase().includes(searchField.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(searchField.toLowerCase())
    )
  })
  .map(product => (
    <div key={product._id} className='product-card grow'>
      <div className="product-image-container">
        <img className="product-card-image" src={product.productImage} alt='Product illustration'/>
      </div>

      <div className="product-card-info">
       <div className="product-card-text">
        <h4>{product.productName}</h4>
        <h6>{product.productSubhead}</h6>
       </div>
        
        <div className="product-card-price-container">
          <div className="product-card-price">
            {product.productPrice},-

          </div>
        
        <div className="product-card-vat">(eks mva på {product.productVat * 100}%)</div>
        </div>
        
      </div>
      
        <button 
          className="product-order-button"
          onClick={() => handleClick(product._id)}
        >
          <i className="fas fa-shopping-cart" id="icon-order-button"></i>
          Bestill
        </button>
    </div>
  ))

  return (
    
    <Fragment>
      <Toolbar/>
      <div className='content-area'>
        <div className='product-card-container'>
          {allProducts}
        </div>
      </div>
    </Fragment>
  )
};

ProductSearch.propTypes = {
  products: PropTypes.array.isRequired,
  searchField: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.productSearch.products,
  searchField: state.navbar.searchField,
  auth: state.auth
});

const mapDispatchToProps = {
  getAllProducts,
  addItemToCart

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearch);