import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { togleToolbar } from '../../actions/toolbar';


const Toolbar = ({togleToolbar, toolbar: { toolbar } }) => {
  console.log(toolbar)
  const handleClick = event => {
    event.preventDefault();
    togleToolbar();
  };  

  return (
    <nav className="toolbar">
      <div id="toolbar-menu">
        <i className="fas fa-angle-left" id="icon"></i>
      </div>
      <div id="toolbar-top">
      <Link to='/dashboard'><i className="fas fa-desktop" id="icon"><div className="icon-text">Dashbord</div></i></Link>
      <Link to='/products'><i className="fas fa-search" id="icon"><div className="icon-text">Finn produkt</div></i></Link>
        <i className="fas fa-th" id="icon"><div className="icon-text">Mine produkter</div></i>
        <i className="fas fa-file-alt" id="icon"><div className="icon-text">Mine ordre</div></i>
        <i className="fas fa-industry" id="icon"><div className="icon-text">Min bedrift</div></i>
      </div>
    </nav>
    <Fragment>
      {toolbar ? (
        <nav className="toolbar">
        <div id="toolbar-menu">
          <i onClick={event => handleClick(event)} className="fas fa-angle-left" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop" id="icon"><div className="icon-text">Dashbord</div></i></Link>
        <Link to='/products'><i className="fas fa-search" id="icon"><div className="icon-text">Finn produkt</div></i></Link>
          <i className="fas fa-th" id="icon"><div className="icon-text">Mine produkter</div></i>
          <i className="fas fa-plus" id="icon"><div className="icon-text">Legg til produkt</div></i>
          <i className="fas fa-industry" id="icon"><div className="icon-text">Min bedrift</div></i>
        </div>
      </nav>
      ) : (
        <nav className="toolbar">
        <div id="toolbar-menu">
          <i onClick={event => handleClick(event)} className="fas fa-angle-left" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/products'><i className="fas fa-search" id="icon"><div className="icon-text"></div></i></Link>
          <i className="fas fa-th" id="icon"><div className="icon-text"></div></i>
          <i className="fas fa-plus" id="icon"><div className="icon-text"></div></i>
          <i className="fas fa-industry" id="icon"><div className="icon-text"></div></i>
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

