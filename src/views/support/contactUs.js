import React, { useEffect, useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen,faCirclePlus,faPuzzlePiece  } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';

const SpeciesExtensionList = () => {
  const [species, setSpecies] = useState([]);
  const [extensions, setExtensions] = useState([]);

  const location = useLocation();
  const { shopId } = location.state || {}
  useEffect(() => {
    fetchSpecies(shopId);
    fetchExtension(shopId);
  }, [shopId]);

  const fetchSpecies=async(shopId)=>{
    const response = await axios.get(`http://54.244.180.151:3002/api/species/getSpecies/${shopId}`);
    setSpecies(response.data.data)
  };
  const fetchExtension=async(shopId)=>{
    const response = await axios.get(`http://54.244.180.151:3002/api/Extension/getExtension/${shopId}`);
    setExtensions(response.data.data)
  };
  const deleteExtension=async(id)=>{
    const response = await axios.delete(`http://54.244.180.151:3002/api/Extension/deleteExten/${id}`);
    fetchExtension(shopId);
  }

  const deleteSpecies=async(id)=>{
    const response = await axios.delete(`http://54.244.180.151:3002/api/species/deleteSpecies/${id}`);
    fetchSpecies(shopId);
  }

  return (
    <div>
      <h3>Species and Extensions</h3>

      <div className="tables-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="table" style={{ flex: '1', marginRight: '10px' }}>
          <h5>Species</h5>
          <CTable className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Species Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Species Image</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Price</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {species.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="5" style={{ textAlign: "center" }}>No Data</CTableDataCell>
                </CTableRow>
              ) : (
                species.map((specie, index) => (
                  <CTableRow key={specie._id}>
                    <CTableDataCell style={{ textAlign: "center" }}>{index + 1}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{specie.speciesName}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {specie.speciesImage ? (
                        <img src={`http://54.244.180.151:3002/${specie.speciesImage}`} alt="Species" style={{ width: '50px', height: '50px' }} />
                      ) : "No Image"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{specie.price}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {/* <CButton style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <FontAwesomeIcon icon={faPen} style={{ color: "#74C0FC", fontSize: '20px' }} />
                      </CButton> */}
                      <button
                        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => deleteSpecies(specie._id)}
                        >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#fd2b2b", fontSize: '20px' }} />
                        </button>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </div>

        <div className="table" style={{ flex: '1', marginLeft: '10px' }}>
          <h5>Extensions</h5>
          <CTable className="table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Extension Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Extension Image</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Price</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {extensions.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="5" style={{ textAlign: "center" }}>No Data</CTableDataCell>
                </CTableRow>
              ) : (
                extensions.map((extension, index) => (
                  <CTableRow key={extension._id}>
                    <CTableDataCell style={{ textAlign: "center" }}>{index + 1}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{extension.extensionName}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {extension.image ? (
                        <img src={`http://54.244.180.151:3002/${extension.image}`} alt="Extension" style={{ width: '50px', height: '50px' }} />
                      ) : "No Image"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>{extension.price}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      <button
                        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => deleteExtension(extension._id)}
                        >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#fd2b2b", fontSize: '20px' }} />
                        </button>
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

export default SpeciesExtensionList;
