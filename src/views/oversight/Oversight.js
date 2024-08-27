import React from 'react';


import {
    CToaster,
    CToast,
    CToastBody,
    CTabContent,
    CToastHeader,
    CBadge,
    CCardHeader,
    CCard,
    CRow,
    CCol
} from '@coreui/react';
const Oversight = () => {
    return (
        <>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <CCol>
                                    <h5 className='px-2'>Log Activity</h5>
                                </CCol>
                            </div>
                        </div>
                    </CRow>
                </CCardHeader>

                <CToaster className="position-static p-3">
                    <CToast autohide={false} visible={true} style={{ width: '80vw' }}>
                        <CToastHeader closeButton>
                           
                            <div className="fw-bold me-auto"> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="info">User</CBadge></h5>Hello, world! This is a toast message. </div>
                            <small>7 min ago</small>
                        </CToastHeader>
                    </CToast>
                    <CToast autohide={false} visible={true} style={{ width: '80vw' }}>
                        <CToastHeader closeButton>
                        <div className="fw-bold me-auto"> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="danger">Vendor</CBadge></h5>Hello, world! This is a toast message. </div>
                            <small>7 min ago</small>
                        </CToastHeader>
                    </CToast>

                    <CToast autohide={false} visible={true} style={{ width: '80vw' }}>
                        <CToastHeader closeButton>
                        <div className="fw-bold me-auto"> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="success">Guide</CBadge></h5>Hello, world! This is a toast message. </div>
                            <small>7 min ago</small>
                        </CToastHeader>
                    </CToast>
                </CToaster>
            </CCard>


        </>
    )
}
export default Oversight;