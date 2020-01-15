import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/productSearch';
import Toolbar from '../layout/Toolbar';


const ProductSearch = ({ products, getAllProducts, searchField}) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const allProducts = products.filter(product => {
    return (
      product.productName.toLowerCase().includes(searchField.toLowerCase()) ||
      product.productSubhead.toLowerCase().includes(searchField.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(searchField.toLowerCase())
    )
  })
  .map(product => (
  
    <div key={product._id} className='content-area product-cards product-card'>
      {/* <img src={product.productImage} /> */}
      <h4>{product.productName}</h4>
      <h6>{product.productSubhead}</h6>
    </div>
  ))

  return (
    
    <Fragment>
      <Toolbar/>
      <div className='content-area'>
        <div className='content-area product-cards'>
          {allProducts}
        </div>
      </div>
    </Fragment>
  )
};

ProductSearch.propTypes = {
  getAllProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.productSearch.products,
  searchField: state.navbar.searchField
});

const mapDispatchToProps = {
  getAllProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearch);