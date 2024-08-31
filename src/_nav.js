import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCheck,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Species / Extentions',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Species',
        to: '/Species',
      },
      {
        component: CNavItem,
        name: 'Extension',
        to: '/Extension',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Manage Users',
    to: '/manage-users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Vendors',
    to: '/manage-vendors',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Subscription',
    to: '/Subscription',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage payments',
    to: '/payments',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Support',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Contact Us',
        to: '/contactUs',
      },
      {
        component: CNavItem,
        name: 'Broadcast',
        to: '/broadcast',
      }
    ],
  },
]

export default _nav
