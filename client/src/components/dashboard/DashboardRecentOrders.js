import React, { Fragment } from 'react';

const DashboardRecentOrders = ({
  orders, 
}) => {

  

  const recentOrdersMarkup = orders.map(order => (order && (
    <div 
      key={order._id}
    >
  
  <li>{order.orderDate} - Buyer contact: {order.buyerContact.firstName} {order.buyerContact.lastName} / email: {order.buyerContact.userEmail}, tlf: {order.buyerContact.userPhone}</li>


    </div>
  )));

  return (
    
    <Fragment>
      <h3>Recent orders:</h3>
      <ul>
      {recentOrdersMarkup}
      </ul>
    </Fragment>
  );
}
export default DashboardRecentOrders;
