import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <Fragment>
    <div>
      Login
    </div>
    <div>
      <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
    </Fragment>
  )
};

export default Login;



