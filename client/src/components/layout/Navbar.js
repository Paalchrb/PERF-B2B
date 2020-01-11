import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField } from '../../actions/navbar';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading }, logout, setSearchField }) => {
const authLinks = (
  <ul>
    <li>
      <Link to='/' onClick={logout}>Logout</Link>
    </li>
    
    <li>
      <Link to='/dashboard'>Dashboard</Link>
    </li>
  </ul>
);

const guestLinks = (
  <ul>
    <li>
      <a href='#!'>Register</a>
    </li>
    <li>
      <Link to='/login'>Login</Link>
    </li>
  </ul>
);

const searchFieldChange = function(event) {
  setSearchField(event.target.value);
}

  return (
    <div>
      navbar
      <input 
        type='text'
        onChange={event => searchFieldChange(event)}
      >
      </input>
      <ul>
        <li>
          <Link to='/'>Landingpage</Link>
        </li>
      </ul>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
    </div>
  )
}


Navbar.propTypes = {
  setSearchField: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  setSearchField: state.searchField,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, setSearchField }
  )(Navbar);


