import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyOrder } from '../../actions/order';

const Order = ({
  getMyOrder
}) => {
  useEffect(() => {
    getMyOrder();
  }, [getMyOrder]);

  return (
    <Fragment>
      <p>This is the order view</p>
      <Link to='/dashboard'>Dashboard</Link>
    </Fragment>
  );
};

Order.propTypes = {
  getMyOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  order: state.order,
});

const mapDispatchToProps = {
  getMyOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
