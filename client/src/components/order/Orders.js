import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllOrders } from '../../actions/order';
import { format } from 'date-fns';

const Orders = ({ auth: { token, isAuthenticated }, order: { orders, loading }, getAllOrders, history }) => {
  useEffect(() => {
    (async function() {
      await getAllOrders(token);
    })();
  }, [getAllOrders, token, isAuthenticated]);


  const handleClick = id => {
    history.push(`/orders/${id}`); 
  };
  
  let procurementOrdersMarkup = [];
  let salesOrdersMarkup = [];

  if(orders && !loading) {

    procurementOrdersMarkup = orders.procurementOrders.map(order => (
      <div key={order._id}>
        <div>Dato: {format(new Date(order.orderDate), 'dd/MM/yyyy')}</div>  
        <div>Selger: {order.seller.companyName}</div>
        <h5>Produkter:</h5> 
        <div>{order.orderLine.map(orderLine => {
            return (
            <Fragment key={orderLine._id}>
              {orderLine.productName} ({orderLine.quantity})
            </Fragment>
            )
          })}
        </div>
        <button onClick={() => handleClick(order._id)}>Se ordre</button>
      </div>
    ));

    salesOrdersMarkup = orders.salesOrders.map(order => (
      <div key={order._id}>
        <div>{format(new Date(order.orderDate), 'dd/MM/yyyy')}</div> 
        <div>Kjøper: {order.buyerContact.firstName} {order.buyerContact.lastName}</div>
        <h5>Produkter:</h5> 
        <div>{order.orderLine.map(orderLine => {
            return (
              <Fragment key={orderLine._id}>
              {orderLine.productName} ({orderLine.quantity})
            </Fragment>
            )
          })}
        </div>
        <button onClick={() => handleClick(order._id)}>Se ordre</button>
      </div>
    ));
  }

  return ( orders && !loading ? ( 
    <Fragment>
    <div className='content-area'>
      <h2>Ordreoversikt</h2>
      <h4>Kjøpsordre</h4> 
      {procurementOrdersMarkup}
      <h4>Salgsordre</h4>
      {salesOrdersMarkup}
    </div>
    </Fragment>
    ) : ( <p>Loading...</p> )
  );

};

Orders.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth
});

const mapDispatchToProps = {
  getAllOrders
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Orders));
