import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyOrderById } from '../../actions/order';

const Order = ({ getMyOrderById}) => {
  useEffect(() => {
    getMyOrderById();
  }, [getMyOrderById]);

  return (
    <Fragment>
    <div className='content-area'>
      <p>This is the order view</p>
      <Link to='/dashboard'>Dashboard</Link>
    </div>
    </Fragment>
  );
};

Order.propTypes = {
  getMyOrderById: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  order: state.order,
});

const mapDispatchToProps = {
  getMyOrderById
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);