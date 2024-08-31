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
  CAlert,
  CCol,
  CPagination,
  CPaginationItem,
} from "@coreui/react";

const Species = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [species, setSpecies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch species data when the component mounts
    const fetchSpecies = async () => {
      try {
        const response = await axios.get("http://54.244.180.151:3002/api/species/getSpeciesCategories");
        setSpecies(response.data.data); // Assuming the API response contains the species data
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred while fetching species.");
      }
    };

    fetchSpecies();
  }, []);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({ ...formData, [id]: id === "image" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("http://54.244.180.151:3002/api/species/SpeciesCategories", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSpecies([...species, response.data]);
      setFormVisible(false);
      resetFormData();
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred while adding species.");
    }
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      image: null,
    });
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Species</h3>
          <CButton color="primary" onClick={() => setFormVisible(true)}>
            Add Species
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
                    Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Image
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {species.map((specie, index) => (
                  <CTableRow key={specie._id}>
                    <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>
                      {index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {specie.name || "null"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {specie.image && (
                        <img
                          src={`http://54.244.180.151:3002/${specie.image}`} // Update this path according to your API
                          alt={specie.name}
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
          <CModalTitle>Add Species</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="file"
                id="image"
                label="Image"
                onChange={handleChange}
              />
            </CCol>
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

export default Species;
