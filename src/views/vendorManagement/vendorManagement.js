import React, { useState, useEffect,useCallback  } from "react";
import axios from "axios";
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CCardBody,
  CCardText,
  CModal,
  CPagination,
  CPaginationItem,
  CFormLabel,
  CFormSelect,
  CSpinner
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, IconButton } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { debounce } from 'lodash';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectUser, setSelectUser] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [filter, setFilter] = useState('ALL');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (searchUser,newFilter) => {
    try {
      const response = await axios.post("http://54.244.180.151:3002/api/vendor/getVendor", {
        search:searchUser,
        status: newFilter
      });
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchUsersDebounced = useCallback(
    debounce((searchTerm, filter) => {
      fetchUsers(searchTerm, filter);
    }, 300),
    []
  );

  const handleSearchUser = (e) => {
    setSearchUser(e.target.value);
    fetchUsersDebounced(e.target.value, filter);
  };

  const handleClear = () => {
    setSearchUser('');
    setFilter('ALL');
    fetchUsers('', 'ALL');
  };

  const handleViewOrder = async (user) => {
    try {
      const response = await axios.get(`http://54.244.180.151:3002/api/ShopDetails/shop/${user._id}`);
      setSelectedVendor(response.data);
      setVisible(true);
      setSelectUser(user._id)
    } catch (error) {
      setError('Error fetching species');
      console.error('Error fetching species:', error);
    }
  };

 
  const accepetVendor = async (id, status) => {
    const response = await axios.post('http://54.244.180.151:3002/api/vendor/approveVendor', { id, status })
    fetchUsers();
  }
  const rejectVendor = async (id, status) => {
    const response = await axios.post('http://54.244.180.151:3002/api/vendor/approveVendor', { id, status })
    fetchUsers();
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchUsers(searchUser, newFilter);
  };
  const verifyShop = async (id, status) => {
    const data = {
      id,
      status
    }
    const res = await axios.post('http://54.244.180.151:3002/api/ShopDetails/verifyShop', data)
    const response = await axios.get(`http://54.244.180.151:3002/api/ShopDetails/shop/${selectUser}`);
    setSelectedVendor(response.data);
  }

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard >

        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Vendors</h3>
          <div className="d-flex" style={{ marginLeft: 'auto' }}>
          <CForm className="d-flex align-items-center" style={{ width: '10rem', marginLeft: 'auto' }}>
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
            <CDropdown style={{ width: '12rem' }}>
              <CDropdownToggle color="secondary">
                {filter === 'ALL' ? 'All' : filter}
              </CDropdownToggle>
              <CDropdownMenu style={{ width: '12rem', textAlign: 'center' }}>
                <CDropdownItem onClick={() => handleFilterChange('ALL')}>ALL</CDropdownItem>
                <CDropdownItem onClick={() => handleFilterChange('accepted')}>Accepted</CDropdownItem>
                <CDropdownItem onClick={() => handleFilterChange('rejected')}>Rejected</CDropdownItem>
                <CDropdownItem onClick={() => handleFilterChange('pending')}>Pending</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CCardHeader>

        <CCardBody>
          <CCardText>
            <CTable responsive striped hover bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>#</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Owner Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Owner Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Contact Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {loading ? (
                  <CTableRow>
                    <CSpinner color="primary" />
                  </CTableRow>
                ) : (users.map((user, index) => (
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
                      {user.status === 'accepted' ? "Approved" : user.status === 'rejected' ? "rejected" : "Pending"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {user.status !== 'accepted' && user.status !== 'rejected' ? (
                        <>
                          <CButton size="sm" color="success" className="mx-1 py-1" onClick={() => accepetVendor(user._id, 'accepted')}>Approve</CButton>
                          <CButton size="sm" color="danger" className="mx-1 py-1" onClick={() => rejectVendor(user._id, 'rejected')}>Reject</CButton>
                        </>
                      ) : (
                        <>
                          {user.status !== 'rejected' && (
                            <CButton size="sm" onClick={() => handleViewOrder(user)}>
                              <FontAwesomeIcon icon={faEye} style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }} />
                            </CButton>
                          )}
                        </>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )))}
              </CTableBody>
            </CTable>
          </CCardText>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)} size="xl">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Vendor Details</CModalTitle>
        </CModalHeader>
        <CCard >
          <CCardBody>
            <CTable responsive striped hover bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Shop Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Owner Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Owner Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Contact Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Available From</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Available To</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Subscription</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Shop Logo</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {loading ? (
                  <CTableRow>
                    <CTableDataCell colSpan="10" style={{ textAlign: "center" }}>Loading...</CTableDataCell>
                  </CTableRow>
                ) : (
                  Array.isArray(selectedVendor) && selectedVendor.length > 0 ? (
                    selectedVendor.map((vendor, index) => (
                      <CTableRow key={vendor._id}>
                        <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>{index + 1}</CTableHeaderCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.shopName || "null"}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.ownerName || "null"}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.ownerEmail || "null"}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.contactNumber || "null"}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.availableFrom ? `${vendor.availableFrom} ${vendor.availableFromPeriod}` : "null"}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.availableTo ? `${vendor.availableTo} ${vendor.availableToPeriod}` : "null"}</CTableDataCell>
                        <CTableDataCell
                          style={{
                            textAlign: "center",
                            backgroundColor: vendor.isSubscription ? "lightgreen" : "white",
                            color: vendor.isSubscription ? "black" : "gray"
                          }}
                        >
                          {vendor.isSubscription ? "Subscribed" : "Not Subscribed"}
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>{vendor.address || "null"}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          {vendor.shopLogo ? (
                            <img src={`http://54.244.180.151:3002/${vendor.shopLogo}`} alt="Shop Logo" style={{ width: '50px', height: '50px' }} />
                          ) : "null"}
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {!vendor.shopVerifyByAdmin ? (
                              <Tooltip title="Shop Verify" arrow>
                                <IconButton className="me-1 p-1" onClick={() => verifyShop(vendor._id, true)}>
                                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#0984e3" }} />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <span style={{ color: "green", fontWeight: "bold" }}>Verified</span>
                            )}
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="10" style={{ textAlign: "center" }}>No data available</CTableDataCell>
                    </CTableRow>
                  )
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard >
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
