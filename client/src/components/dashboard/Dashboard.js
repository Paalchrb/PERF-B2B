import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
    <Fragment>
      <p>This is the dashboard</p>
      <Link to='/order'>Orderview</Link>
    </Fragment>
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
