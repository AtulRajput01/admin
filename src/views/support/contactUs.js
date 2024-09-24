import React, { useEffect, useState ,useRef} from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,CCardHeader,CDropdownToggle,CDropdown,CDropdownItem ,CDropdownMenu} from '@coreui/react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    fetchMessages(filter);
  }, [filter]);

  const fetchMessages = async (filter) => {
    try {
      const response = await axios.post(`www.taxidermyadmin.hunt30.com/api/getContact`,{read:filter});
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleToggleRead = async (id, status) => {
    try {
      await axios.put(`www.taxidermyadmin.hunt30.com/api/updateContact/${id}`, { read: status });
      setMessages(prevMessages =>
        prevMessages.map(message =>
          message._id === id ? { ...message, read: status } : message
        )
      );
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const handleFilterChange = async (status) => {
    setFilter(status)
  };



  return (
    <div>
      <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Contact Us / Feedbacks</h3>
          <CDropdown style={{ width: '12rem' }}>
              <CDropdownToggle color="secondary">
              {filter === false ? 'Unread' : 'Read'}
              </CDropdownToggle>
              <CDropdownMenu style={{ width: '12rem', textAlign: 'center' }}>
                <CDropdownItem onClick={() => handleFilterChange(false)}>Unread</CDropdownItem>
                <CDropdownItem onClick={() => handleFilterChange(true)}>Read</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
        </CCardHeader>

      <div className="tables-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="table" style={{ flex: '1', marginRight: '10px' }}>
          <CTable className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>User Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>User Email</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Message</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {messages.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="5" style={{ textAlign: "center" }}>No Data</CTableDataCell>
                </CTableRow>
              ) : (
                messages.map((message, index) => (
                  <CTableRow key={message._id}>
                    <CTableDataCell style={{ textAlign: "center" }}>{index + 1}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{message.name}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{message.email}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{message.message}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {message.read ? (
                        <span style={{ color: '#28a745' }}>Read</span>
                      ) : (
                        <button
                          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                          onClick={() => handleToggleRead(message._id, true)}
                        >
                          <FontAwesomeIcon icon={faEyeSlash} style={{ color: "#fd2b2b", fontSize: '20px' }} />
                        </button>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </div>
      </div>
    </div>
  );
};

export default Contact;
