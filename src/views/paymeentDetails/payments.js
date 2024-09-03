import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch payments data from API
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://54.244.180.151:3002/api/payments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPayments(data.payments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const viewDetails = (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPayment(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Payments</CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Payment ID</CTableHeaderCell>
                    <CTableHeaderCell>Vendor Name</CTableHeaderCell>
                    <CTableHeaderCell>Shop Name</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell>Payment Date</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Card Holder</CTableHeaderCell>
                    <CTableHeaderCell>Card Number</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {payments.map((payment) => (
                    <CTableRow key={payment.paymentId}>
                      <CTableDataCell>{payment.paymentId}</CTableDataCell>
                      <CTableDataCell>{payment.vendorName}</CTableDataCell>
                      <CTableDataCell>{payment.shopName}</CTableDataCell>
                      <CTableDataCell>${payment.amount}</CTableDataCell>
                      <CTableDataCell>{payment.paymentDate}</CTableDataCell>
                      <CTableDataCell>{payment.status}</CTableDataCell>
                      <CTableDataCell>{payment.email}</CTableDataCell>
                      <CTableDataCell>**** **** **** {payment.cardNumber.slice(-4)}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => viewDetails(payment)}>
                          View Details
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader closeButton>Payment Details</CModalHeader>
        <CModalBody>
          {selectedPayment && (
            <>
              <p><strong>Payment ID:</strong> {selectedPayment.paymentId}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
              <p><strong>Card Holder:</strong> {selectedPayment.email}</p>
              <p><strong>Card Number:</strong> {selectedPayment.cardNumber}</p>
              <p><strong>Card Type:</strong> {selectedPayment.cardType}</p>
              <p><strong>Status:</strong> {selectedPayment.status}</p>
              <p><strong>Payment Date:</strong> {selectedPayment.paymentDate}</p>
              <p><strong>Shop Name:</strong> {selectedPayment.shopName}</p>
              <p><strong>Owner Name:</strong> {selectedPayment.ownerName}</p>
              <p><strong>Contact Number:</strong> {selectedPayment.contactNumber}</p>
              <p><strong>Subscription Plan:</strong> {selectedPayment.subscriptionPlan}</p>
              <p><strong>Vendor Name:</strong> {selectedPayment.vendorName}</p>
              <p><strong>Vendor Contact:</strong> {selectedPayment.vendorContact}</p>
              <p><strong>Vendor Email:</strong> {selectedPayment.vendorEmail}</p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PaymentList;
