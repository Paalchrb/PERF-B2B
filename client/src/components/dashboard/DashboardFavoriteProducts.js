import React, { Fragment } from 'react';

const DashboardFavoriteProducts = ({
  products, 
}) => {
  // const productsMarkup = products.map(product => (
    
  // ));
  const productsMarkup = products.map(product => (
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

  return (
    <Fragment>
      <h2>Favorite products:</h2>
      <div className='product-container'> {/*add a real class here*/}
        {productsMarkup}
      </div>
    </Fragment>
  );
}
export default DashboardFavoriteProducts;
