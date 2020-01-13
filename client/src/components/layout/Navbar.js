import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField, submitSearch } from '../../actions/navbar';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading }, logout, setSearchField, submitSearch }) => {
const authLinks = (
  <ul>
    <li>
      <Link to='/' onClick={logout}>Logout</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </li>
    
    <li>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/' onClick={logout}>Logout</Link>
    </li>
  </ul>
);

const guestLinks = (
  <ul>
    <li>
      <a href='#!'>Register</a>
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
    <div>
      navbar
      <form> 
        <input 
        type='text'
        onChange={event => searchFieldChange(event)}
        >
        </input>
        <input
        type='button'
        value='Button'
        onClick={() => submitSearch()}
        >
        </input>
      </form>
      <ul>
        <li>
          <Link to='/'>Landingpage</Link>
        </li>
      </ul>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>)}
    </div>
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
  submitSearch: PropTypes.func.isRequired,
  setSearchField: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  submitSearch: state.searchField,
  setSearchField: state.searchField,
  auth: state.auth
});

const mapDispatchToProps = {
  logout,
  setSearchField,
  submitSearch 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Navbar);


