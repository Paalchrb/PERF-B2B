import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



const Toolbar = () => {


  return (
    <nav className="toolbar">
        <div id="toolbar-menu">
          <i className="fas fa-bars" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop" id="icon"></i></Link>
        <Link to='/products'><i className="fas fa-search" id="icon"></i></Link>
          <i className="fas fa-th" id="icon"></i>
          <i className="fas fa-plus" id="icon"></i>
          <i className="fas fa-industry" id="icon"></i>
        </div>
      </nav>
  )
}



export default Toolbar;


