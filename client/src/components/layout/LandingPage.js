import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Fragment>
      <p>This is the landing page</p>
      <Link to='/login'>Login</Link>
    </Fragment>
  )
}

export default LandingPage;
