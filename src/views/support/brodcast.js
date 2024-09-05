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
  CFormSelect
} from '@coreui/react';

const initialNotifications = [
  {
    id: 1,
    title: 'New Order Received',
    message: 'You have received a new order from John Doe.',
    timestamp: '2024-07-03 10:00 AM',
    role: 'Vendor',
  },
  {
    id: 2,
    title: 'Processing Started',
    message: 'Processing of Order #1234 has started.',
    timestamp: '2024-07-03 11:00 AM',
    role: 'Admin',
  },
];

const Broadcast = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    role: '', // Changed from 'stage' to 'role'
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
    setNewNotification({ title: '', message: '', role: '' }); // Reset the form
  };

  return (
    <CContainer className="mt-4">
      <CRow>
        <CCol md="10">
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
                  <CCol>
                    <CFormSelect
                      id="role"
                      name="role" // Changed from 'stage' to 'role'
                      value={newNotification.role}
                      onChange={handleNewNotificationChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {["Vendor", "Admin"].map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </div>

                <CButton color="primary" onClick={handleSendNotification}>
                  Send Notification
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Broadcast;
