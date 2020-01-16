import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductById } from '../../actions/product';
import { format } from 'date-fns';
import Toolbar from '../layout/Toolbar';

const SinglePageProductView = ({ auth: { token, isAuthenticated }, product: { selectedProduct, loading }, getProductById, match  }) => {
  const productId = match.params.productId;

  useEffect(() => {
    (async function() {
      await getProductById(token, productId);
    })();
  }, [getProductById, token, isAuthenticated, productId]);

  let productMarkup = [];

  if (selectedProduct && !loading) {

    productMarkup = selectedProduct.product.map(product => {
      return (
        <div key={product._id}>
          <div>Navn: {product.productName}</div>
          <div>Produkt-id: {product.productId}</div>
          <div>Pris: {product.productPrice}</div>
          <div>Mva: {product.productVat}</div>
          <div>Netto: {product.productLineNetTotal}</div>
        </div>
      )
    });
  };

  
  return (
    <div>
      {selectedProduct && !loading && isAuthenticated ? (
  
     
          <Fragment>
      <Toolbar />
      <div className='content-area'> 
        <h3>Produkt</h3>
        <div>{productMarkup}</div>
      </div>
    </Fragment>) : (
      <div className='content-area'> 
      <h3>Produkt</h3>
      <div>{productMarkup}</div>
    </div>
    )}
      </div>
   )
};

SinglePageProductView.propTypes = {
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
});

const mapDispatchToProps = {
  getProductById
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePageProductView);
