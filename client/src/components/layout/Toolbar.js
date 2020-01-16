import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleToolbar } from '../../actions/toolbar';


const Toolbar = ({toggleToolbar, toolbar: { toolbar } }) => {
  const handleClick = event => {
    event.preventDefault();
    toggleToolbar();
  };  

  return (
    <Fragment>
      {toolbar ? (
        <nav className="toolbar">
        <div id="toolbar-menu-close">
          <i onClick={event => handleClick(event)} className="fas fa-angle-left" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop" id="icon"><div className="icon-text">Dashbord</div></i></Link>
        <Link to='/products'><i className="fas fa-search" id="icon"><div className="icon-text">Finn produkt</div></i></Link>
        <Link to='/myproducts'><i className="fas fa-th" id="icon"><div className="icon-text">Mine produkter</div></i></Link>
        <Link to='/orders'><i className="fas fa-file-alt" id="icon"><div className="icon-text">Mine ordre</div></i></Link>
        <Link to="!#"><i className="fas fa-industry" id="icon"><div className="icon-text">Min bedrift</div></i></Link>
        </div>
      </nav>
      ) : (
        <nav className="toolbar-small">
        <div id="toolbar-menu-open">
          <i onClick={event => handleClick(event)} className="fas fa-bars" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/products'><i className="fas fa-search" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/myproducts'><i className="fas fa-th" id="icon"></i></Link>
        <Link to='/orders'><i className="fas fa-file-alt" id="icon"></i></Link>
        <Link to="!#"><i className="fas fa-industry" id="icon"></i></Link>
        </div>
      </nav>
      )}

      </Fragment>
  
  );
};

Toolbar.propTypes = {
  toggleToolbar: PropTypes.func.isRequired,
  toolbar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  toolbar: state.toolbar,
  
});

export default connect(
  mapStateToProps,
  { toggleToolbar }  
  )(Toolbar);

