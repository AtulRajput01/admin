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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from 'react-icons/fa';

let debounceTimeout;

const UserManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const searchUserRef = useRef(searchUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (searchUser) => {
    try {
      const response = await axios.post("http://54.71.141.115:3002/vendor/getUser", { search: searchUser });
      setUsers(response.data.data);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://54.71.141.115:3002/vendor/deleteUser/${id}`);
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
