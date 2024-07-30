import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    CFormSelect,
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
    CAlert
} from '@coreui/react';

const OutfitterManagement = () => {
    const [visible, setVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedOutfitter, setSelectedOutfitter] = useState(null);
    const [outfitters, setOutfitters] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        description: '',
        area: '',
        location: '',
        animalCategory: '',
        outfitterName: '',
        password: '',
        image: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOutfitters();
    }, []);
    // const token = localStorage.getItem('token');
    const fetchOutfitters = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/outfitter/getAll'
            );
            setOutfitters(response.data.data);
        } catch (error) {
            setError('Error fetching outfitters');
            console.error('Error fetching outfitters:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/api/outfitter/deleteOutfitter/${id}`);
            setOutfitters(outfitters.filter(outfitter => outfitter._id !== id));
        } catch (error) {
            setError('Error deleting outfitter');
            console.error('Error deleting outfitter:', error);
        }
    };

    const handleAddOutfitter = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/api/outfitter/create', formData);
            const newOutfitter = response.data.outfitter;
            setOutfitters([...outfitters, newOutfitter]);
            setFormVisible(false);
            resetFormData();
        } catch (error) {
            setError('Error adding outfitter');
            console.error('Error adding outfitter:', error);
        }
    };

    const handleEdit = (outfitter) => {
        setSelectedOutfitter(outfitter);
        setFormData({
            name: outfitter.name || '',
            email: outfitter.email || '',
            mobileNumber: outfitter.mobileNumber || '',
            description: outfitter.description || '',
            area: outfitter.area || '',
            location: outfitter.location || '',
            animalCategory: outfitter.animalCategory || '',
            outfitterName: outfitter.outfitterName || '',
            password: outfitter.password || '',
            image: outfitter.image || ''
        });
        setEditVisible(true);
    };

    const handleEditOutfitter = async (event) => {
        event.preventDefault();
        const { _id } = selectedOutfitter;
        try {
            await axios.put(`http://localhost:3002/api/outfitter/updateOutfitter/${_id}`, formData);
            setEditVisible(false);
            resetFormData();
            await fetchOutfitters(); // Fetch the latest data after updating
        } catch (error) {
            setError('Error updating outfitter');
            console.error('Error updating outfitter:', error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'mobileNumber') {
            // Ensure mobile number contains only digits and is prefixed with +1
            const cleanedValue = value.replace(/\D/g, ''); // Remove all non-digit characters
            const prefixedValue = cleanedValue.startsWith('1') ? `+${cleanedValue}` : `+1${cleanedValue}`;
            setFormData({ ...formData, [id]: prefixedValue });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            email: '',
            mobileNumber: '',
            description: '',
            area: '',
            location: '',
            animalCategory: '',
            outfitterName: '',
            password: '',
            image: ''
        });
    };

    return (
        <>
            {error && <CAlert color="danger">{error}</CAlert>}
            <CCard>
                <CCardHeader>
                    <CRow className="align-items-center">
                        <CCol>
                            <div style={{ fontSize: '1rem' }}>
                                Outfitter Management
                            </div>
                        </CCol>
                        <CCol xs="auto" className="px-4">
                            <CButton color="primary" className="px-4" onClick={() => setFormVisible(true)}>Add Outfitters</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>

                <CTable responsive striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Outfitter Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Area</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Animal Category</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {outfitters.map((outfitter, index) => (
                            <CTableRow key={outfitter._id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.name || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.outfitterName || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.email || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.mobileNumber || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.area || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.location || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.animalCategory || 'null'}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem onClick={() => handleEdit(outfitter)}>✏ Edit</CDropdownItem>
                                            <CDropdownItem onClick={() => handleDelete(outfitter._id)}>🗑 Delete</CDropdownItem>
                                            <CDropdownItem onClick={() => { setSelectedOutfitter(outfitter); setVisible(true); }}>👁‍🗨 View</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCard>

            <CModal visible={formVisible} onClose={() => { setFormVisible(false); resetFormData(); }}>
                <CModalHeader closeButton>
                    <CModalTitle>Add Outfitter</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleAddOutfitter}>
                        <CCol md={6}>
                            <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="area" label="Area" value={formData.area} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="location" label="Location" value={formData.location} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="animalCategory" label="Animal Category" value={formData.animalCategory} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="outfitterName" label="Outfitter Name" value={formData.outfitterName} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="file" id="image" label="Image" value={formData.image} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CButton type="submit">Submit</CButton>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => { setFormVisible(false); resetFormData(); }}>Close</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={editVisible} onClose={() => { setEditVisible(false); resetFormData(); }}>
                <CModalHeader closeButton>
                    <CModalTitle>Edit Outfitter</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleEditOutfitter}>
                        <CCol md={6}>
                            <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="area" label="Area" value={formData.area} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="location" label="Location" value={formData.location} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="animalCategory" label="Animal Category" value={formData.animalCategory} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="outfitterName" label="Outfitter Name" value={formData.outfitterName} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="file" id="image" label="Image" value={formData.image} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CButton type="submit">Submit</CButton>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => { setEditVisible(false); resetFormData(); }}>Close</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
                <CModalHeader closeButton>
                    <CModalTitle>Outfitter Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedOutfitter && (
                        <CListGroup flush>
                            <CListGroupItem><strong>Name:</strong> {selectedOutfitter.name || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Email:</strong> {selectedOutfitter.email || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Mobile Number:</strong> {selectedOutfitter.mobileNumber || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Description:</strong> {selectedOutfitter.description || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Area:</strong> {selectedOutfitter.area || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Location:</strong> {selectedOutfitter.location || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Animal Category:</strong> {selectedOutfitter.animalCategory || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Outfitter Name:</strong> {selectedOutfitter.outfitterName || 'null'}</CListGroupItem>
                            <CListGroupItem><strong>Image:</strong> {selectedOutfitter.image || 'null'}</CListGroupItem>
                        </CListGroup>
                    )}
                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>

        </>
    );
};

export default OutfitterManagement;
