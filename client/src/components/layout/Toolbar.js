import React from 'react';
import { Link } from 'react-router-dom';

const Toolbar = () => {
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
  );
};

export default Toolbar;