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

const Broadcast = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    body: '',
    role: '',
  });

  const handleNewNotificationChange = (e) => {
    const { name, value } = e.target;
    // Map the dropdown value to the desired value
    let mappedValue = value;
    if (name === "role") {
      mappedValue = value === "Users" ? "user" : "vendor";
    }
    setNewNotification((prevState) => ({
      ...prevState,
      [name]: mappedValue,
    }));
  };

  const handleSendNotification = async () => {
    const newNotif = {
      ...newNotification,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('http://54.244.180.151:3002/api/admin/sendN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotif),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      const result = await response.json();
      setNotifications([result, ...notifications]);
      setNewNotification({ title: '', body: '', role: '' });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
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
                    name="body"
                    value={newNotification.body}
                    onChange={handleNewNotificationChange}
                  />
                </div>
                <div className="mb-3">
                  <CCol>
                    <CFormSelect
                      id="role"
                      name="role"
                      value={newNotification.role === 'user' ? 'Users' : 'Vendors'}
                      onChange={handleNewNotificationChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Users">Users</option>
                      <option value="Vendors">Vendors</option>
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
