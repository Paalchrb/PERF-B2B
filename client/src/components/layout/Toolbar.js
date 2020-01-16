import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { togleToolbar } from '../../actions/toolbar';


const Toolbar = ({togleToolbar, toolbar: { toolbar } }) => {
  const handleClick = event => {
    event.preventDefault();
    togleToolbar();
  };  

  return (
    <Fragment>
      {toolbar ? (
        <nav className="toolbar">
        <div id="toolbar-menu-close">
          <i onClick={event => handleClick(event)} className="fas fa-angle-left grow" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop grow" id="icon"><div className="icon-text">Dashbord</div></i></Link>
        <Link to='/products'><i className="fas fa-search grow" id="icon"><div className="icon-text">Finn produkt</div></i></Link>
        <Link to='/myproducts'><i className="fas fa-th grow" id="icon"><div className="icon-text">Mine produkter</div></i></Link>
        <Link to='/orders'><i className="fas fa-list grow" id="icon"><div className="icon-text">Mine ordre</div></i></Link>
        
        </div>
      </nav>
      ) : (
        <nav className="toolbar-small">
        <div id="toolbar-menu-open">
          <i onClick={event => handleClick(event)} className="fas fa-bars grow" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop grow" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/products'><i className="fas fa-search grow" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/myproducts'><i className="fas fa-th grow" id="icon"></i></Link>
        <Link to='/orders'><i className="fas fa-list grow" id="icon"></i></Link>
        
        </div>
      </nav>
      )}

      </Fragment>
  
  );
};

Toolbar.propTypes = {
  togleToolbar: PropTypes.func.isRequired,
  toolbar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  toolbar: state.toolbar,
  
});

export default connect(
  mapStateToProps,
  { togleToolbar }  
  )(Toolbar);

