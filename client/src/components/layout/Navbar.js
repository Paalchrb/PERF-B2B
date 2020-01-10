import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField } from '../../actions/navbar';




const Navbar = () => {
  return (
    <div>
      navbar
      <input 
        type='text'
        onChange={setSearchField}
      ></input>
      <Link to='/'>
        Landingpage
      </Link>
      <Link to='/dashboard'>
        Dashboard
      </Link>
      <Link to='/login'>
        Login
      </Link>
    </div>
  )
}

Navbar.propTypes = {
  setSearchField: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
  setSearchField: state.searchField,
});

const mapDispatchToProps = (dispatch) => {
  return {
  onSearchChange: (event) => dispatch(setSearchField(event.target.value))
}
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(Navbar);


