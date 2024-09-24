import React from 'react';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import {
  cilStar,
  cilCreditCard,
  cilLockLocked,
  cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import avatar8 from './../../../public/logo/tlogo.png';

const API_URL = 'https://www.taxidermyadmin.hunt30.com/api/';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found in localStorage');
        return;
      }
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };
  
  // const subscription = async () => {
  //   try {
  //     navigate('/subscription');
  //   } catch (error) {
  //     console.error('Logout Error:', error);
  //   }
  // };

  // const payments = async () => {
  //   try {
  //     navigate('/payments');
  //   } catch (error) {
  //     console.error('Logout Error:', error);
  //   }
  // };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem onClick={handleLogout} role="button" style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
