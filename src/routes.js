import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Oversight = React.lazy(() => import('./views/oversight/Oversight'))
const UserManagement = React.lazy(() => import('./views/userManagement/UserManagement'))
const VendorManagement = React.lazy(() => import('./views/vendorManagement/vendorManagement'))

const New = React.lazy(() => import('./views/vendorManagement/new'))
const AnalyticsReporting = React.lazy(() => import('./views/analytics&Reporting/Analytics&Reporting'))
const Subscription=React.lazy(()=>import('./views/subscription/Subscription'))
const Payment=React.lazy(()=>import('./views/paymeentDetails/payments'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/oversight', name: 'Oversight', element: Oversight },
  { path: '/manage-users', name: 'Manage Users', element: UserManagement },
  { path: '/manage-vendors', name: 'Manage Vendors', element: VendorManagement },
  { path: '/new', name: 'New', element: New },
  { path: '/analytics&Reporting', name: 'Analytics&Reporting', element: AnalyticsReporting },
  { path: '/subscription', name: 'Subscription', element: Subscription },
  { path: '/payments', name: 'Payment', element: Payment },
]

export default routes
