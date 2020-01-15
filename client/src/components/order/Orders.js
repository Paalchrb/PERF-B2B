import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllMyOrders } from '../../actions/order';

const Orders = ({ auth: { token, isAuthenticated }, order: { orders, currentOrder }, getAllMyOrders }) => {
  useEffect(() => {
    (async function() {
      await getAllMyOrders(token);
    })();
  }, [getAllMyOrders, token, isAuthenticated]);
  
  console.log(orders.salesOrders)
  console.log(orders.procurementOrders)
  // console.log(orders.salesOrders[0]._id)

    // const allOrdersMarkup = orders.map(order => (
    //   <div key={order.salesOrders._id || order.procurementOrders._id}>
    //     <li>
    //       {order.orderDate} - Buyer contact: {order.buyerContact.firstName} {order.buyerContact.lastName},  email: {order.buyerContact.userEmail}, tlf: {order.buyerContact.userPhone}
    //     </li>
    //   </div>
    // ));

    // const currentOrderMarkup = orders.filter(order => (order.salesOrders._id || order.procurementOrders._id) === currentOrder)
    // .map(order => {
    //   <div key={order.salesOrders._id || order.procurementOrders._id}>
    //     <li>
    //       {order.orderDate} - Buyer contact: {order.buyerContact.firstName} {order.buyerContact.lastName},  email: {order.buyerContact.userEmail}, tlf: {order.buyerContact.userPhone}
    //     </li>
    //   </div>
    // });
  

  return (
    <Fragment>
    <div className='content-area'>
      Test
        {/* <Fragment>{ currentOrder ? currentOrderMarkup: allOrdersMarkup }</Fragment> */}
    </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getAllMyOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth
});

const mapDispatchToProps = {
  getAllMyOrders
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
