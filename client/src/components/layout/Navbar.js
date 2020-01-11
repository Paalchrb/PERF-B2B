import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField } from '../../actions/navbar';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
const authLinks = (
  <ul>
    <li>
      <Link to='/' onClick={logout}>Logout</Link>
    </li>
    <li>
      <Link to='/'>Landingpage</Link>
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

  return (
    <div>
      navbar
      <input 
        type='text'
        onChange={setSearchField}
      >
      </input>
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

const mapDispatchToProps = (dispatch) => {
  return {
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  }
}

export default connect(
  mapStateToProps,
  { logout }
  )(Navbar);


