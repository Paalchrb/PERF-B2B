import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
// import DashboardCompanyInfo from './dashboardCompanyInfo';
// import DashboardRecentProducts from './dashboardRecentProducts';
// import DashboardRecentOrders from './dashboardRecentOrders';
// import DashboardFavoriteProducts from './dashboardFavoriteProducts';
import { 
  getCurrentCompany,
  getRecentProducts,
  getRecentOrders,
  getFavoriteProducts,
} from '../../actions/dashboard';


const Dashboard = ({
  auth: {
    token,
    isAuthenticated
  },
  dashboard,
  getCurrentCompany,
  getRecentProducts,
  getFavoriteProducts,
  getRecentOrders
}) => {
  useEffect(() => {
    (async function() {
      await getCurrentCompany(token);
      await getRecentProducts(token);
      await getFavoriteProducts(token);
      await getRecentOrders(token);
    })();
  }, [getCurrentCompany, getRecentProducts, getFavoriteProducts, getRecentOrders, isAuthenticated, token]);

  return (
    <div>
      <nav className="toolbar-small">
      <div id="toolbar-small-menu">
        <i className="fas fa-bars" id="icon"></i>
      </div>
      <div id="toolbar-small-top">
        <i className="fas fa-search" id="icon"></i>
        <i className="fas fa-plus" id="icon"></i>
        <i className="fas fa-box" id="icon"></i>
        <i className="fas fa-th" id="icon"></i>
      </div>
      <div id="toolbar-small-bottom">
        <i className="fas fa-user" id="icon"></i>
        <i className="fas fa-industry" id="icon"></i>
      </div>
    </nav>
  
  <div className='content-area'>

  <div className='company-section'>
        {/* <img src={logoWhite} className="company-logo"></img> */}
        <div className="company-title">
          <h1>Tap That AS</h1>
        </div>
        <div className="about-container">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula magna dolor, id commodo neque efficitur et. Suspendisse in lacus sit amet purus tempor varius. Proin sed posuere odio. Phasellus a accumsan nibh. Donec id est tincidunt, eleifend ante nec, iaculis urna. Quisque elementum tincidunt justo, sed lacinia quam sagittis a. Pellentesque cursus eleifend justo, in vestibulum massa tempus sed. Donec orci velit, facilisis sed leo eget, maximus sodales purus. Proin vel facilisis sapien. Pellentesque erat nulla, tempus id ullamcorper vitae, mollis a elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut fringilla nec tellus at pulvinar. Vestibulum felis enim, interdum quis nunc at, pulvinar sodales dui. Aliquam malesuada dignissim metus id semper. Nunc non imperdiet eros. Curabitur laoreet risus ex, at finibus augue tincidunt sed.</p>
  
        </div>
        <div className="action-buttons">
          <div><i className="fas fa-search"></i><h4>Finn produkt</h4></div>
          <div><i className="fas fa-plus"></i><h4>Legg til produkt</h4></div>
          <div><i className="fas fa-box"></i><h4>Endre produkt</h4></div>
          <div><i className="fas fa-th"></i><h4>Se mine produkter</h4></div>
        </div>

      </div>
    <h2>My Favourites</h2>

      <Fragment>
        <p>This is the dashboard</p>
        <Link to='/order'>Orderview</Link>
      </Fragment>
    </div>
    
  </div>
  );
  
};

Dashboard.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  getRecentProducts: PropTypes.func.isRequired,
  getRecentOrders: PropTypes.func.isRequired,
  getFavoriteProducts: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  auth: state.auth
});

const mapDispatchToProps = {
  getCurrentCompany,
  getRecentProducts,
  getFavoriteProducts,
  getRecentOrders 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
