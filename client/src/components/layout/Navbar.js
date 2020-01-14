import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField } from '../../actions/navbar';
import { logout } from '../../actions/auth';
import whiteLogo from '../../assets/dtb-logo-white-03.png'



const Navbar = ({ auth: { isAuthenticated, loading }, logout, setSearchField }) => {
const authLinks = (
  <ul>
    <li>
      <Link to='/dashboard'>Dashboard</Link>
    </li>
    <li>
      <Link to='/' onClick={logout}>Logout</Link>
    </li>
    <li>
      <Link to='shopcart'>Shopping cart</Link>
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
        <img id='logo' src={whiteLogo} alt='Company logo'></img>
      </Link>
      
      <div id='search-container'>
        
        <i id='search-icon' className='fas fa-search'></i>
        <input 
          type='text'
          onChange={event => searchFieldChange(event)}
          id='search'>
        </input>
      </div>
      <div className='top-right-nav'>
        <i className="fas fa-user" id="top-right-icon"></i>
        <i className="fas fa-cog" id="top-right-icon"></i>
        <i className="fas fa-shopping-cart" id="top-right-icon"></i>
        <i className="fas fa-sign-out-alt" id="top-right-icon"></i>
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


