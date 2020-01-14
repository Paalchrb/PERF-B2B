import React, { Fragment } from 'react';

const DashboardRecentProducts = ({
  products, 
}) => {



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
export default DashboardRecentProducts;
