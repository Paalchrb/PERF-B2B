import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await login(email, password);
  };

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className="login-container">
        <div className="login-form">
          <h1>Sign in</h1>
          <p>Sign Into Your Account</p>
          <form onSubmit={e => onSubmit(e)}>
            <div>
              <input
                className="login-input"
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div>
              <input
                className="login-input"
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
              />
            </div>
            <input className="login-button" type="submit" value="Login" />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
      </div>

      </div>
      
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, login })(Login);
