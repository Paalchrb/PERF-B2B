import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardCompanyInfo from './DashboardCompanyInfo';
import DashboardFavoriteProducts from './DashboardFavoriteProducts';
import DashboardRecentProducts from './DashboardRecentProducts';
import Toolbar from '../layout/Toolbar';
// import DashboardRecentOrders from './DashboardRecentOrders';

import { 
  getCurrentCompany,
  getRecentProducts,
  getRecentOrders,
  getFavoriteProducts,
} from '../../actions/dashboard';


const Dashboard = ({
  auth: {
    user,
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
      <Toolbar/>

      <Fragment>
        {dashboard === null || dashboard.loading ? (
          <Spinner />
        ) : (
          <div className='content-area'>
          <Fragment>
            <DashboardCompanyInfo company={dashboard.company} user={user} />   
            <div className="action-buttons">
              <div><i className="fas fa-search"></i><h4>Finn produkt</h4></div>
              <div><i className="fas fa-plus"></i><h4>Legg til produkt</h4></div>
              <div><i className="fas fa-box"></i><h4>Endre produkt</h4></div>
              <div><i className="fas fa-th"></i><h4>Se mine produkter</h4></div>
            </div> 
          </Fragment>

          <Fragment>
            <DashboardFavoriteProducts products={dashboard.favoriteProducts}/>
            <DashboardRecentProducts products={dashboard.recentProducts}/>
            {/* <DashboardRecentOrders orders={dashboard.recentProducts}/> */}
          </Fragment>

          </div>
        )}
      </Fragment>
        <Link to='/order'>Orderview</Link>
    </div>
  )
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
