import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import uploadimg from '../../../Assets/img/png/Group 34282.png'
import otherImg from '../../../Assets/img/png/Group 34274.png'
import * as XLSX from 'xlsx';
import { DoctorFetachNumbers } from "../../../Store/Reducers/CommonReducer";
import { useDispatch, useSelector } from "react-redux";

const UploadModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [mobilenumber, SetMobilenumber] = useState()
    const [imageSrc, setImageSrc] = useState(uploadimg);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [fileExtension, setFileExtension] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assuming the first sheet in the Excel file is the one you want to read
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert the sheet data to JSON format
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Do something with the jsonData, like displaying it or processing it further
            // console.log('JSON data from Excel:', jsonData);
            const contactNumbers = jsonData.map((data) => data['Contact Number']);
            // console.log("contactNumbers", contactNumbers);
            SetMobilenumber(contactNumbers);

            // Set the image source to the otherImg once the file is chosen
            setImageSrc(otherImg);

            // Set isFileSelected to true when a file is selected
            setIsFileSelected(true);
        };
        reader.readAsBinaryString(selectedFile);
    };
    const isXLSXFile = fileExtension === 'xlsx';
    // console.log("mobilenumbermobilenumbermobilenumber",);
    const callApi = async () => {
        try {
            const arr = mobilenumber;
            const resultString = arr.join(",");
            const result = await dispatch(DoctorFetachNumbers({ phone_numbers: resultString }));
        } catch (error) {
     
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    <div className="mainModal">
                        <div style={{ padding: "10px 20px" }}>
                            <div className="uploadmodal" >
                                <h4 className="uploadtext">Upload Excel Sheet</h4>
                                <a class="uploadbtn" href="https://docs.google.com/spreadsheets/d/1uqX6LzOEh956GEYdr9E8uj0a4CssbXar/edit#gid=214397390" target="_blank">View Demo Sheet</a>
                            </div>
                            <div className="sheetimgdiv pt_40">
                                <label htmlFor="fileInput">
                                    <img src={imageSrc} className="sheetimg" alt="Upload Excel" />
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".xlsx, .xls"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className='uploadbtndiv pt_40'>
                                <button className='closebtn' onClick={onClose}>Close</button>
                                <button className={`sendbtn ${isFileSelected ? 'sendbtns' : ''}`} onClick={() => { callApi(); onClose() }}> Send Link</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default UploadModal;