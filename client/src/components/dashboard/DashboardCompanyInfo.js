import React, { Fragment } from 'react';

const DashboardCompanyInfo = ({
  company,
}) => ( company && (
  <div className='company-section'>
    <div className='company-title'>
      <Fragment>
        <h1>{company.companyName}</h1>
      </Fragment>
    </div>
    <div className='about-container'>
      {company.aboutUs && (
        <Fragment>
          <h2 className='text-primary'>Info om {company.companyName}</h2>
          <p>{company.aboutUs}</p>
        </Fragment>
      )}
    </div>
  </div>
));

export default DashboardCompanyInfo;
