import React, { useState, useEffect } from 'react';
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
  CFormSelect,
  CFormTextarea
} from '@coreui/react';
import axios from 'axios';
import '../../views/subscription/Subscription.css';

const SubscriptionPlansPage = () => {
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [plans, setPlans] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    billingFrequency: 'Monthly',
    description: '',
    features: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://54.244.180.151:3002/api/subscription');
        setPlans(response.data.data);
      } catch (error) {
        console.error('Failed to fetch plans:', error.message);
      }
    };

    fetchPlans();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      billingFrequency: 'Monthly',
      description: '',
      features: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`http://54.244.180.151:3002/api/subscription/${formData._id}`, {
          ...formData,
          features: formData.features.split(',').map(feature => feature.trim())
        });
      } else {
        const response = await axios.post('http://54.244.180.151:3002/api/subscription', {
          ...formData,
          features: formData.features.split(',').map(feature => feature.trim())
        });
        setPlans([...plans, response.data.plan]);
      }

      setShowAddPlanModal(false);
      resetForm();
    } catch (error) {
      console.error('Failed to save plan:', error.message);
    }
  };

  const handleEditPlan = (plan) => {
    setIsEditing(true);
    setFormData({
      ...plan,
      features: plan.features.join(', ')
    });
    setShowAddPlanModal(true);
  };

  const handleDeletePlan = async (id) => {
    try {
      await axios.delete(`http://54.244.180.151:3002/api/subscription/${id}`);
      setPlans(plans.filter(plan => plan._id !== id));
    } catch (error) {
      console.error('Failed to delete plan:', error.message);
    }
  };

  const openAddPlanModal = () => {
    resetForm();
    setIsEditing(false); 
    setShowAddPlanModal(true);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h5>Subscription Plans</h5>
            <div className="text-right">
              <CButton color="primary" onClick={openAddPlanModal}>Add New Plan</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Plan Name</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Billing Frequency</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Features</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {plans.map(plan => (
                  <CTableRow key={plan._id}>
                    <CTableHeaderCell>{plan.name}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.price}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.billingFrequency}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.description}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.features.join(', ')}</CTableHeaderCell>
                    <CTableHeaderCell>{plan.status}</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CButton color="warning" onClick={() => handleEditPlan(plan)}>Edit</CButton>
                      <CButton color="danger" onClick={() => handleDeletePlan(plan._id)}>Delete</CButton>
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
            <CFormInput 
              label="Plan Name" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange}
              placeholder="Enter plan name" 
              required 
            />
            <CFormInput 
              type="number" 
              label="Price" 
              name="price"
              value={formData.price} 
              onChange={handleInputChange}
              placeholder="Enter price" 
              required 
            />
            <CFormSelect 
              label="Billing Frequency" 
              name="billingFrequency"
              value={formData.billingFrequency} 
              onChange={handleInputChange}
              required
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </CFormSelect>
            <CFormTextarea 
              label="Description" 
              name="description"
              value={formData.description} 
              onChange={handleInputChange}
              placeholder="Enter description" 
              required 
            />
            <CFormInput 
              label="Features" 
              name="features"
              value={formData.features} 
              onChange={handleInputChange}
              placeholder="Enter features separated by commas" 
              required 
            />
            <CFormSelect 
              label="Status" 
              name="status"
              value={formData.status} 
              onChange={handleInputChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </CFormSelect>
            <CButton type="submit" color="primary" className="mt-3">Save</CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  );
};

export default SubscriptionPlansPage;
