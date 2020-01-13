import React, { Fragment } from 'react';

const DashboardFavoriteProducts = ({
  products, 
}) => {
  const productsMarkup = products.map(product => (
    
  ));

  return (
    <div className='product-card'>
    
        <Fragment>
          <h3>{products.forEach()}</h3>
        </Fragment>

      <div className='about-container'>
        {company.aboutUs && (
          <Fragment>
            <h2 className='text-primary'>Info om {company.companyName.trim().split(' ')[0]}</h2>
            <p>{company.aboutUs}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
}
export default DashboardCompanyInfo;
