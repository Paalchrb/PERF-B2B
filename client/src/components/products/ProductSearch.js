import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/productSearch';


const ProductSearch = ({ products, getAllProducts}) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const allProducts = products.map(product => (
  
    <div key={product._id} className='content-area product-cards product-card'>
      {/* <img src={product.productImage} /> */}
      <h4>{product.productName}</h4>
      <h6>{product.productSubhead}</h6>
    </div>
  ))

  return (
    <Fragment>
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
  products: state.productSearch.products
});

const mapDispatchToProps = {
  getAllProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearch);