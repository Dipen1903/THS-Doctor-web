import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const UploadModal = ({ isOpen, onClose }) => {
    
    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    <div className="mainModal">
                        <div style={{ padding: "10px 20px" }}>
                            <div className="uploadmodal" >
                                <h4 className="uploadtext">Upload Excel Sheet</h4>
                                <button className="uploadbtn">View Demo Sheet</button>
                               
                               
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UploadModal;