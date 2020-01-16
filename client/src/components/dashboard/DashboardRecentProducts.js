import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../actions/shopCart';
import { Link } from 'react-router-dom';

const DashboardRecentProducts = ({
  products,
  auth: { isAuthenticated 
  },
  addItemToCart,
}) => {


  const handleClick = id => {
    if (isAuthenticated) {
      addItemToCart(id);
    }
  };


  const recentProductsMarkup = products.map(product => (
    <div key={product._id} className='product-card grow'>
    <div className="product-image-container">
    <Link to={`/products/${product._id}`}>
      <img className="product-card-image" src={product.productImage} alt='Product illustration'/>
    </Link>
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
    
      <button onClick={() => handleClick(product._id)} className="product-order-button"><i className="fas fa-shopping-cart" id="icon-order-button"></i>Bestill</button>
    
  </div>
  ));

  return (
    <Fragment>
      {products.length > 0 ? (
        <div className="dashboard-products-container">
          <h3>Sist kjøpte</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRecentProducts);
