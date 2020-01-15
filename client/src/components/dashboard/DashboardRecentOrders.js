import React, { Fragment } from 'react';

const DashboardRecentOrders = ({
  orders, 
}) => {

  

  const recentOrdersMarkup = orders.map(order => (order && (
    <div className="recent-order-table-row" key={order._id}>
      <div>{order._id}</div>
      <div>{order.orderDate}</div>
      <div>{order.buyerContact.firstName} {order.buyerContact.lastName}</div>
      <div>{order.buyerContact.userEmail}</div>
      <div>{order.buyerContact.userPhone}</div>
    </div>
  )));

  return (
    
    <Fragment>
      <div className="recent-orders-card">
        <h3>Recent orders</h3>
        <div className="recent-order-table-row-headers">
          <div>Id</div>
          <div>Date</div>
          <div>Contact</div>
          <div>Email</div>
          <div>Phone</div>
        </div>
          {recentOrdersMarkup}
        
        

      </div>
      
    </Fragment>
  );
}
export default DashboardRecentOrders;
