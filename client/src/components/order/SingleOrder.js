import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrderById } from '../../actions/order';
import { format } from 'date-fns';

const SingleOrder = ({ auth: { token, isAuthenticated }, order: { selectedOrder, loading }, getOrderById, match  }) => {
  const orderId = match.params.orderId;

  useEffect(() => {
    (async function() {
      await getOrderById(token, orderId);
    })();
  }, [getOrderById, token, isAuthenticated, orderId]);

  let orderDateFormatted = '';
  let orderLineMarkup = [];

  if (selectedOrder && !loading) {
    const { orderDate } = selectedOrder;
    orderDateFormatted = format(new Date(orderDate), 'dd/MM/yyyy');

    orderLineMarkup = selectedOrder.orderLine.map(orderLine => {
      return (
        <div key={orderLine._id}>
          <div>Navn: {orderLine.productName}</div>
          <div>Produkt-id: {orderLine.productId}</div>
          <div>Pris: {orderLine.productPrice}</div>
          <div>Mva: {orderLine.productVat}</div>
          <div>Antall: {orderLine.quantity}</div>
          <div>Netto: {orderLine.orderLineNetTotal}</div>
        </div>
      )
    });
  };

  
  return (selectedOrder && !loading ? (
    <Fragment>
      <div className='content-area'> 
        <div>Dato opprettet: {orderDateFormatted}</div>
        <h3>Produkter</h3>
        <div>{orderLineMarkup}</div>
        <h3>Selger</h3>
        <div>Navn på selskap: {selectedOrder.seller.companyName}</div>
        <div>Org.nr: {selectedOrder.seller.orgNum}</div>
        <div>Adresse: {selectedOrder.seller.address.street}, {selectedOrder.seller.address.zipcode} {selectedOrder.seller.address.city}, {selectedOrder.seller.address.country}</div>
        <h3>Kjøper</h3>
        <h4>Kontaktinfo</h4>
        <div>Navn: {selectedOrder.buyerContact.firstName} {selectedOrder.buyerContact.lastName}</div>
        <div>Email: {selectedOrder.buyerContact.userEmail}</div>
        <div>Tlf: {selectedOrder.buyerContact.userPhone}</div>
        <h4>Selskapsinfo</h4>
        <div>Navn på selskap: {selectedOrder.buyer.companyName}</div>
        <div>Org.nr: {selectedOrder.buyer.orgNum}</div>
        <div>Adresse: {selectedOrder.buyer.address.street}, {selectedOrder.buyer.address.zipcode} {selectedOrder.buyer.address.city}, {selectedOrder.buyer.address.country}</div>
      </div>
    </Fragment>
    ) : ( <p>Loading...</p> )
  );
}

SingleOrder.propTypes = {
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

const mapDispatchToProps = {
  getOrderById
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
