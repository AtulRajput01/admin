import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CCardText,
  CPagination,
  CPaginationItem,
  CSpinner
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from 'react-icons/fa';

let debounceTimeout;

const UserManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const searchUserRef = useRef(searchUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://54.244.180.151:3002/api/vendor/getUser", { search: searchUser });
      setUsers(response.data.data);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://54.244.180.151:3002/api/vendor/deleteUser/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchUser = (e) => {
    const value = e.target.value;
    setSearchUser(value);
    searchUserRef.current = value;

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchUsers(searchUserRef.current);
    }, 2000);
  };

  const handleClear = () => {
    setSearchUser('');
    fetchUsers('');
  };

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Users</h3>
          <CForm className="d-flex align-items-center" style={{ width: '12rem', marginLeft: 'auto' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <CFormInput
                type="text"
                placeholder="Search by Name"
                value={searchUser}
                onChange={handleSearchUser}
              />
              {searchUser && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '0.5rem',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                  onClick={handleClear}
                >
                  <FaTimes size={16} />
                </div>
              )}
            </div>
          </CForm>
        </CCardHeader>

        <CCardBody>
          <CTable responsive striped hover bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Email</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Contact Number</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((user, index) => (
                <CTableRow key={user._id}>
                  <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>{index + 1}</CTableHeaderCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.name || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.email || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    {user.contactNumber || "null"}
                  </CTableDataCell>
                  <CTableDataCell style={{ textAlign: "center" }}>
                    <CButton size="sm" onClick={() => { setSelectedUser(user); setVisible(true); }}>
                      <FontAwesomeIcon icon={faEye} style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }} />
                    </CButton>
                    <CButton size="sm" onClick={() => handleDelete(user._id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#fd2b2b" }}
                      />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          resetFormData();
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddUser}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="email"
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="contactNumber"
                label="contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="password"
                id="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CButton
                type="submit"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}
                className="px-4"
                disabled={loading} // Disable button while loading
              >
                {loading ? <CSpinner size="sm" /> : 'Submit'} {/* Show loader in button */}
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setFormVisible(false);
              resetFormData();
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={editVisible}
        onClose={() => {
          setEditVisible(false);
          resetFormData();
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditUser}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="email"
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="contactNumber"
                label="contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="password"
                id="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setEditVisible(false);
              resetFormData();
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)} closeButton>
          <CModalTitle>User Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            <CListGroupItem><strong>Name: </strong> {selectedUser?.name}</CListGroupItem>
            <CListGroupItem><strong>Email: </strong> {selectedUser?.email}</CListGroupItem>
            <CListGroupItem>
              <strong>Contact Number: </strong> {selectedUser?.contactNumber}
            </CListGroupItem>
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default UserManagement;
