import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { Link, withRouter } from 'react-router-dom';

const DashboardRecentOrders = ({
  orders, 
}) => {

  let routePath = '/orders/';

  
  const recentOrdersMarkup = orders.map(order => (order && (
    <Link to={routePath+order._id}>
      <div className="recent-order-table-row" key={order._id}>
        <div>{orders.indexOf(order) + 1}</div>
        <div>{format(new Date(order.orderDate), 'MM/dd/yyyy')}</div>
        <div>{order.buyerContact.firstName} {order.buyerContact.lastName}</div>
        <div>{order.buyerContact.userEmail}</div>
        <div>{order.buyerContact.userPhone}</div>
      </div>
    </Link>
  )));

  return (
    <Fragment>
    {orders.length > 0 ? (
      <div className="recent-orders-card">
      <h3>Siste ordre</h3>
      <div className="recent-order-table-row-headers">
        <div>Nr.
        </div>
        <div>Dato</div>
        <div>Kontaktperson</div>
        <div>Email</div>
        <div>Telefon</div>
      </div>
        {recentOrdersMarkup}
    </div>
    ) : (
      <div className='recent-orders-card'>
        <h4>Det har ikke blitt gjort noen bestillinger</h4>
      </div>
    )}
   
      
      
    </Fragment>
  );
}
export default DashboardRecentOrders;
