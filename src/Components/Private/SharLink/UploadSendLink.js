import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import uplaodsheet from '../../../Assets/img/png/Group 34274.png'

const UploadSendLink = ({ isOpen, onClose }) => {

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
                            <div className="sheetimgdiv pt_30">
                                <img src={uplaodsheet} className="sheetimg"></img>
                            </div>
                            <p className="text-center textcolor">contact.xlsx</p>
                            <div className='uploadbtndiv pt_20'>
                                <button className='closebtn' onClick={onClose}>Close</button>
                                <button className='okbtn' style={{width:"48%"}}> send Link</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UploadSendLink;