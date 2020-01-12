import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  getMyCompany, 
  getRecentProducts,
   /* getRecentOrders */ 
  getFavoriteProducts
} from '../../actions/dashboard';

const Dashboard = ({
  dashboard,
  getMyCompany,
  getRecentProducts,
  getFavoriteProducts
}) => {
  console.log(dashboard);
  useEffect(() => {
    (async function() {
      await getMyCompany();
      await getRecentProducts();
      await getFavoriteProducts();
      /* await getRecentOrders(); */
    })();
  }, [getMyCompany, getRecentProducts, getFavoriteProducts]);

  return (
    <Fragment>
      <p>This is the dashboard</p>
      <Link to='/order'>Orderview</Link>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getMyCompany: PropTypes.func.isRequired,
  getRecentProducts: PropTypes.func.isRequired,
  /* getRecentOrders: PropTypes.func.isRequired, */
  dashboard: PropTypes.object.isRequired,
  getFavoriteProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = {
  getMyCompany,
  getRecentProducts,
  getFavoriteProducts,
  /* getRecentOrders */
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
