import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardText,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CPagination,
  CPaginationItem,
  CFormSelect 
} from "@coreui/react";

const Extension = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [extensions, setExtensions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]); // For species dropdown
  const [formData, setFormData] = useState({
    extensionName: "",
    extensionDescription: "",
    extensionImage: null,
    price: "",
    species:"",
    role: "admin",
    shopId: "", // Optional
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch extensions data when the component mounts
    const fetchExtensions = async () => {
      try {
        const response = await axios.get("http://54.244.180.151:3002/api/Extension/getAll");
        setExtensions(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred while fetching extensions.");
      }
    };

    fetchExtensions();
  }, []);

  useEffect(() => {
    // Fetch species data when the form becomes visible
    if (formVisible) {
      const fetchSpecies = async () => {
        try {
          const response = await axios.get("http://54.244.180.151:3002/api/species/getSpeciesCategories/");
          setSpeciesOptions(response.data.data);
        } catch (err) {
          setError(err.response ? err.response.data.message : "An error occurred while fetching species.");
        }
      };

      fetchSpecies();
    }
  }, [formVisible]);


  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({ ...formData, [id]: id === "extensionImage" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("extensionName", formData.extensionName);
    formDataToSend.append("extensionDescription", formData.description);
    formDataToSend.append("extensionImage", formData.extensionImage);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("specie", formData.species);
    formDataToSend.append("role", formData.role);
    
    // Append shopId only if the user is a vendor
    if (formData.role === "vendor") {
      formDataToSend.append("shopId", formData.shopId);
    }

    try {
      const response = await axios.post("http://54.244.180.151:3002/api/extension/addExtension", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setExtensions([...extensions, response.data]);
      setFormVisible(false);
      resetFormData();
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred while adding the extension.");
    }
  };

  const resetFormData = () => {
    setFormData({
      extensionName: "",
      extensionDescription: "",
      extensionImage: null,
      price: "",
      species:"",
      role: "admin",
      shopId: "", // Reset shopId as well
    });
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Extensions</h3>
          <CButton color="primary" onClick={() => setFormVisible(true)}>
            Add Extension
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <CTable responsive striped hover bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    S.No
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                   Species
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Price
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Image
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {extensions.map((extension, index) => (
                  <CTableRow key={extension._id}>
                    <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>
                      {index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {extension.specie || "null"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {extension.extensionName || "null"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {extension.price || "null"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {extension.image && (
                        <img
                          src={`http://54.244.180.151:3002/${extension.image}`} // Update this path according to your API
                          alt={extension.extensionName}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardText>
          <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem disabled aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
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
          <CModalTitle>Add Extension</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="extensionName"
                label="Name"
                value={formData.extensionName}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="price"
                label="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </CCol>
             <CCol md={6}>
              <CFormSelect
                id="species"
                label="Species"
                value={formData.species}
                onChange={handleChange}
                required
              >
                <option value="">Select species</option>
                {speciesOptions.map((species) => (
                  <option key={species.id} value={species.name}>
                    {species.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="file"
                id="extensionImage"
                label="Image"
                onChange={handleChange}
              />
            </CCol>
            {formData.role === "vendor" && (
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="shopId"
                  label="Shop ID"
                  value={formData.shopId}
                  onChange={handleChange}
                />
              </CCol>
            )}
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
              setFormVisible(false);
              resetFormData();
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Extension;
