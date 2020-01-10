import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyCompany, getRecentProducts } from '../../actions/dashboard';

const Dashboard = ({
  company,
  getMyCompany,
  getRecentProducts
}) => {
  useEffect(() => {
    //getMyCompany();
    getRecentProducts();
  }, [/* getMyCompany */ , getRecentProducts]);

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
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = {
  getMyCompany,
  getRecentProducts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
