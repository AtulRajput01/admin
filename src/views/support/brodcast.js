import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CContainer,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react';

const initialNotifications = [
  {
    id: 1,
    title: 'New Order Received',
    message: 'You have received a new order from John Doe.',
    timestamp: '2024-07-03 10:00 AM',
    stage: 'Order Received',
  },
  {
    id: 2,
    title: 'Processing Started',
    message: 'Processing of Order #1234 has started.',
    timestamp: '2024-07-03 11:00 AM',
    stage: 'Processing Started',
  },
  {
    id: 3,
    title: 'Order Shipped',
    message: 'Order #1234 has been shipped.',
    timestamp: '2024-07-03 04:00 PM',
    stage: 'Order Shipped',
  },
];

const Broadcast = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    stage: '',
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    orderReceived: true,
    processingStarted: true,
    orderShipped: true,
    completion: true,
  });

  const handleDelete = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const handleNewNotificationChange = (e) => {
    const { name, value } = e.target;
    setNewNotification({ ...newNotification, [name]: value });
  };

  const handleSendNotification = () => {
    const newNotif = {
      id: notifications.length + 1,
      ...newNotification,
      timestamp: new Date().toLocaleString(),
    };
    setNotifications([newNotif, ...notifications]);
    setNewNotification({ title: '', message: '', stage: '' });
  };

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences({ ...notificationPreferences, [name]: checked });
  };

  return (
    <CContainer className="mt-4">
      <CRow>
        <CCol md="4">
          <h4>Send Manual Update</h4>
          <CCard className="bg-light text-dark mb-4">
            <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    value={newNotification.title}
                    onChange={handleNewNotificationChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="message">Message</CFormLabel>
                  <CFormTextarea
                    id="message"
                    name="message"
                    value={newNotification.message}
                    onChange={handleNewNotificationChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="stage">Stage</CFormLabel>
                  <CFormInput
                    type="text"
                    id="stage"
                    name="stage"
                    value={newNotification.stage}
                    onChange={handleNewNotificationChange}
                  />
                </div>
                <CButton color="primary" onClick={handleSendNotification}>Send Notification</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="8">
          <h5>Broadcast</h5>
          <CTable className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Extension Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Extension Image</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Price</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Broadcast;
