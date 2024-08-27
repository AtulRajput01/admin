import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect
} from '@coreui/react';
import '../../views/subscription/Subscription.css'

const SubscriptionPlansPage = () => {
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [plans, setPlans] = useState([
    // Sample data
    { id: 1, name: 'Basic Plan', description: 'Basic features', price: '$100', status: 'Active' },
    { id: 2, name: 'Pro Plan', description: 'Advanced features', price: '$1000', status: 'Inactive' }
  ]);

  const handleAddPlan = () => {
    // Logic to add a new plan
  };

  const handleEditPlan = (plan) => {
    // Logic to edit a plan
    setIsEditing(true);
    setShowAddPlanModal(true);
  };

  const handleDeletePlan = (id) => {
    // Logic to delete a plan
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h5>Subscription Plans</h5>
            <CButton color="primary" onClick={() => setShowAddPlanModal(true)}>Add New Plan</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Plan Name</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {plans.map(plan => (
                  <CTableRow key={plan.id}>
                    <CTableHeaderCell>{plan.name}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.description}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.price}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.status}</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CButton color="warning" onClick={() => handleEditPlan(plan)}>Edit</CButton>
                      <CButton color="danger" onClick={() => handleDeletePlan(plan.id)}>Delete</CButton>
                    </CTableHeaderCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Add/Edit Plan Modal */}
      <CModal visible={showAddPlanModal} onClose={() => setShowAddPlanModal(false)}>
        <CModalHeader>
          <CModalTitle>{isEditing ? 'Edit Plan' : 'Add New Plan'}</CModalTitle>
          <CButton className="btn-close" onClick={() => setShowAddPlanModal(false)} aria-label="Close" />
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddPlan}>
            <CFormInput label="Plan Name" placeholder="Enter plan name" required />
            <CFormInput label="Description" placeholder="Enter description" required />
            <CFormInput type="number" label="Price" placeholder="Enter price" required />
            <CFormSelect label="Status" required>
              <option>Active</option>
              <option>Inactive</option>
            </CFormSelect>
            <CButton type="submit" color="primary" className="mt-3">Save</CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  );
};

export default SubscriptionPlansPage;
