import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../layout/Toolbar';
import ProductCardButton from '../layout/ProductCardButton';


const SingleProductView = ({ 
  products, 
  }) => {

    const allProductsMarkup = products.map(product => (
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

      <ProductCardButton product={product._id}/>
      
    </div>
    ));
  
    return (
      <Fragment>
        {products.length > 0 ? (
          <div className="dashboard-products-container">
            <h3>Siste bestillinger</h3>
              <div className='product-card-container-dashboard'> 
               {recentProductsMarkup}
              </div>
          </div>
          ) : (
          <div className="dashboard-products-container">
            <h4>Det har ikke blitt gjort noen bestillinger</h4>
          </div>
          )
        }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView);