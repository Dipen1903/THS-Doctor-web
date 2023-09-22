import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DoctorFetachNumbers } from "../../../Store/Reducers/CommonReducer";

const ModalComponent = ({ isOpen, onClose }) => {
    const [mobileNumber, setMobileNumber] = useState(""); // State to store the entered mobile number
    const [numbersList, setNumbersList] = useState([]); // State to store the list of numbers

    // const handleInputChange = (event) => {
    //     setMobileNumber(event.target.value);
    // };
    console.log("setNumbersList",mobileNumber);

    const handleAddNumber = () => {
        if (mobileNumber.trim() !== "") {
            setNumbersList([...numbersList, mobileNumber]);
            setMobileNumber("");
        }
    };

    const handleRemoveNumber = (numberToRemove) => {
        const updatedNumbersList = numbersList.filter((number) => number !== numberToRemove);
        setNumbersList(updatedNumbersList);
    };
    const [error, setError] = useState(""); // State to store the error message


    const handleInputChange = (event) => {
        const input = event.target.value;
        if (input.length <= 10) {
            setMobileNumber(input);
        } else {
            setError("Maximum input length is 10 characters.");
        }
    };
    

    const handleOkButtonClick = () => {
        // Do something with the numbersList, e.g., save it to a database, etc.
        // For demonstration purposes, we are just logging the numbersList.
        // console.log("Numbers List:", numbersList);
        onClose();
    };
    // console.log("numbersListnumbersListnumbersList", numbersList);
    const dispatch = useDispatch();
    const callApi = async () => {
        try {
            const arr = numbersList;
            const resultString = arr.join(",");
            console.log("resultString", resultString);
            if(mobileNumber == [] ){
                const result = await dispatch(DoctorFetachNumbers({ phone_numbers: resultString }));
            }else{
                const result = await dispatch(DoctorFetachNumbers({ phone_numbers: mobileNumber }));
            }
         
            // console.log('API call result', result);

        } catch (error) {
            // console.error('API call error', error);
        }
    };
    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    <div className="mainModal">
                        <div style={{ padding: "10px 20px" }}>
                            <div className="">
                                <Modal.Header closeButton onClick={onClose}>
                                    <Modal.Title>Share on Contact Number</Modal.Title>
                                </Modal.Header>
                                <h4 className="paycontent pt_30" style={{ fontWeight: "600" }}>
                                    Enter Mobile Number
                                </h4>
                                <div className="input-container pt_8">
                                    <input
                                        type="text"
                                        placeholder="98938383813"
                                        id="linkInput"
                                        value={mobileNumber}
                                        onChange={handleInputChange}
                                        maxLength="10"
                                    />
                                    <span id="copyLinkText" onClick={handleAddNumber}>
                                        Add
                                    </span>
                                </div>
                                {error && <div style={{ color: "red" }}>{error}</div>}

                                <div className="numberdiv">
                                    {numbersList.map((number, index) => (
                                        <div className="textnumber" key={index}>
                                            {number} &nbsp;&nbsp;
                                            <span
                                                className="clear-icon"
                                                onClick={() => handleRemoveNumber(number)}
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt_40">
                                    <button className="okbtn" onClick={() => { callApi(); handleOkButtonClick() }}>
                                        ok
                                    </button>
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
