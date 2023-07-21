import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const ModalComponent = ({ isOpen, onClose }) => {
    
    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    <div className="mainModal">
                        <div style={{ padding: "10px 20px" }}>
                            <div className="" >
                                <Modal.Header closeButton onClick={onClose}>
                                    <Modal.Title>Share on Contact Number</Modal.Title>
                                </Modal.Header>
                                <h4 className='paycontent pt_30' style={{ fontWeight: "600" }}>Enter Mobile Number</h4>
                                <div class="input-container pt_8">
                                    <input type="text" placeholder="98938383813" id="linkInput" />
                                    <span id="copyLinkText">
                                        Add</span>
                                </div>
                                <div className="numberdiv">
                                    <div className="textnumber">
                                        9558818590 &nbsp;&nbsp;
                                        <span className="clear-icon">&times;</span>
                                    </div>
                                    <div className="textnumber">
                                        9558818590 &nbsp;&nbsp;
                                        <span className="clear-icon">&times;</span>
                                    </div>
                                </div>
                                <div className="pt_40">
                                    <button className="okbtn"> ok </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default ModalComponent;