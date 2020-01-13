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
      <Link to='/dashboard'>Dashboard</Link>
    </li>
    <li>
      <Link to='/' onClick={logout}>Logout</Link>
    </li>
  </ul>
);

const guestLinks = (
  <ul>
    <li>
      <a href='#!'>Companies</a>
    </li>
    <li>
      <Link to='/login'>Login</Link>
    </li>
    <li>
      <a href='#!'>Register</a>
    </li>
    
  </ul>
);

const searchFieldChange = function(event) {
  setSearchField(event.target.value);
}

  return (
    <nav className='navbar'>
      <Link to='/'>
        <img id='logo' src='../../public/dtb-logo-white-03.png' alt='Company logo'></img>
      </Link>
      
      <div id='search-container'>
        
        <i id='search-icon' className='fas fa-search' id='search'></i>
        <input 
          type='text'
          onChange={event => searchFieldChange(event)}
        >
        </input>
      </div>
      <div className='top-right-nav'>
      <i class="fas fa-user" id="top-right-icon"></i>
        <i class="fas fa-cog" id="top-right-icon"></i>
        <i class="fas fa-shopping-cart" id="top-right-icon"></i>
        <i class="fas fa-sign-out-alt" id="top-right-icon"></i>
      </div>
      
      { !loading && (
        <Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
    </nav>
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


