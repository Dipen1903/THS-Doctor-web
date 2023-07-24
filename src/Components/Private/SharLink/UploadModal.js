import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import uploadimg from '../../../Assets/img/png/Group 34282.png'

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
                            <div className="sheetimgdiv pt_40">
                                <img src={uploadimg} className="sheetimg"></img>
                            </div>
                            <div className='uploadbtndiv pt_40'>
                                <button className='closebtn' onClick={onClose}>Close</button>
                                <button className='sendbtn'> send Link</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UploadModal;