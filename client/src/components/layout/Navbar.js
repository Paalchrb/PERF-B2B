import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField, submitSearch } from '../../actions/navbar';
import { logout } from '../../actions/auth';
import logoWhite from '../../img/dtb-logo-white-03.png';
import whiteLogo from '../../assets/dtb-logo-white-03.png'



const Navbar = ({ auth: { isAuthenticated, loading }, logout, setSearchField, submitSearch, history }) => {
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
};

const onSubmit = (event) => {
  event.preventDefault();
  submitSearch();
  history.push('/products');
};

  return (
    <nav className='navbar'>
      <Link to='/'>
        <img id='logo' src={logoWhite} alt='Company logo'></img>
        <img id='logo' src={whiteLogo} alt='Company logo'></img>
      </Link>
      
      <form onSubmit={(event) => onSubmit(event)}>
        <div id='search-container'>
          
          <i id='search-icon' className='fas fa-search'></i>
          <input 
            id='search'
            type='text'
            onChange={event => searchFieldChange(event)}
          >
          </input>
        </div>
      </form>

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
  submitSearch: PropTypes.func.isRequired,
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
  { logout, setSearchField, submitSearch }
  )(withRouter(Navbar));


