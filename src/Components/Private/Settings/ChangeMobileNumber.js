import React, { Fragment } from "react";
import "../../../Assets/css/style.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { Button, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import SettingHeader from "./SettingHeaders";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
// import Header from "../Dashboard/Header";
import { Link } from "react-router-dom";
import FormControl from "../../Common/Forms/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  SendOTPOnCurrentMobileNumber,
  VerifyOTPOnCurrentMobileNumber,
  SendOTPOnNewMobileNumber,
  VerifyOTPOnNewMobileNumber,
} from "../../../Store/Reducers/ProfileReducer";



function Changemobilenum() {
  const dispatch = useDispatch();
  const [tog, setTog] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [currentNumber, setCurrentNumber] = useState({ mobile_number: "" });
  const [currentOTP, setCurrentOTP] = useState({ otp: "" });
  const [newNumber, setNewNumber] = useState({ mobile_number: "" });
  const [newOTP, setNewOTP] = useState({ otp: "" });

  const currentMobileInputHandler = (e) => {
    console.log('====================================');
    console.log("mobile_number:", e.target.value);
    console.log('====================================');
    setCurrentNumber({ ...currentNumber, mobile_number: e.target.value })
  }

  const currentOTPInputHandler = (e) => {
    setCurrentOTP({ ...currentOTP, otp: e.target.value })
  }

  const newMobileInputHandler = (e) => {
    setNewNumber({ ...newNumber, mobile_number: e.target.value })
  }

  const newOTPInputHandler = (e) => {
    setNewOTP({ ...newOTP, otp: e.target.value });
  }


  const currentOtpSend = (data) => {
    dispatch(SendOTPOnCurrentMobileNumber(data)).then(
      // (res) => {
      // }
    )
  }

  const verifyRecievedCurrentOtp = (data, e) => {
    e.preventDefault();
    dispatch(VerifyOTPOnCurrentMobileNumber(data)).then(
      (res) => {
        if (res.payload.success) {
          setCurrentNumber({ mobile_number: "" });
          setCurrentOTP({ otp: "" });
          setNewNumber({mobile_number: "" });
          setNewOTP({otp: "" });
          setTog(false);          
        }
      }
    )
  }

  const newOtpSend = (data) => {
    dispatch(SendOTPOnNewMobileNumber(data)).then(
      (res) => {
        // if (res.payload.success) {
        // }
      }
    )
  }

  const verifyRecievedNewOtp = (data, e) => {   
    e.preventDefault()    
    dispatch(VerifyOTPOnNewMobileNumber(data)).then(
      (res) => {
        if (res.payload.success) {             
          setTog(false);
        }
      }
    )
  }


useEffect(() => {
  if(!modalShow){
    setTog(true);
  }
},[modalShow]);


  return (
    <>
      {
        tog ? (
          <Container fluid>
            <div className="row settingscards">
              <div className="col-md-12">
                <div className="setting_profile_card_head">
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="setting_change_mobile">
                        Change Mobile Number
                      </h3>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
                <div className="setting_profile_card_body">
                  <div className="row">
                    <Formik>
                      {({ values, setFieldValue, handleChange, handleSubmit }) => (
                        <form
                          onSubmit={(e) => verifyRecievedCurrentOtp({ mobile_number: parseInt(currentNumber.mobile_number), otp: parseInt(currentOTP.otp) }, e)}
                          id="myForm">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-12">
                                <label className="sign_title">
                                  Current Mobile Number
                                </label>
                                <div className="input_box">
                                  <div className="form_group">
                                    {/* <input type="text" name="current_mobilenumber" placeholder="" value="9318319131" /> */}

                                    <FormControl
                                      control="input"
                                      type="text"
                                      name="mobile_number"
                                      id="mobile_number"
                                      // label="mobile_number"
                                      // disabled={!edit}
                                      // onChange={handleChange}
                                      onChange={currentMobileInputHandler}
                                      // onBlur={handleBlur}
                                      // value={values?.mobile_number}
                                      value={currentNumber.mobile_number}
                                    />
                                    <span
                                      onClick={() => currentOtpSend({ mobile_number: parseInt(currentNumber.mobile_number) })}
                                      className="send_otp"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Send OTP
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt_20">
                              <div className="col-md-12">
                                <label

                                  className="sign_title"> Enter OTP </label>
                                <div className="input_box">
                                  <div className="form_group">
                                    {/* <input type="text" name="enter_otp" placeholder="" value="" /> */}

                                    <FormControl
                                      control="input"
                                      type="text"
                                      name="otp"
                                      id="otp"

                                      // label="otp"
                                      // disabled={!edit}
                                      // onChange={handleChange}
                                      onChange={currentOTPInputHandler}
                                      // onBlur={handleBlur}
                                      // value={values?.otp}
                                      value={currentOTP.otp}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt_30">
                              <div className="col-md-4">
                                {/* <Link to="/changenewmobilenum"> */}
                                <button
                                  type="submit"
                                  className="continue_btn"
                                  variant="primary"
                                >
                                  Verify
                                </button>
                                {/* </Link> */}
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <>
            <MyModal show={modalShow} onClick={() => setTog(false)} onHide={() => setModalShow(false)} number={newNumber.mobile_number} />
            <Container fluid >
              <div className="row settingscards_box">
                <div className="col-md-12">
                  <div className="setting_profile_card_head">
                    <div className="row">
                      <div class="col-md-6">
                        <h3 className="setting_change_mobile">
                          Change Mobile Number
                        </h3>
                      </div>
                      <div class="col-md-6"></div>
                    </div>
                  </div>
                  <div className="setting_profile_card_body">
                    <div className="row">
                      <Formik
                        initialValues={{}}
                        onSubmit={(values) => {
                          console.log("values", values);
                        }}
                      >
                        {({ values, setFieldValue, handleSubmit }) => (
                          <form
                            onSubmit={(e) => verifyRecievedNewOtp({ mobile_number: parseInt(newNumber.mobile_number), otp: parseInt(newOTP.otp) }, e)}
                            id="myForm">
                            <div className="col-md-6">
                              <div class="row">
                                <div class="col-md-12">
                                  <label className="sign_title">
                                    New Mobile Number
                                  </label>
                                  <div class="input_box">
                                    <div class="form_group">
                                      <FormControl
                                        control="input"
                                        type="text"
                                        name="mobile_number"
                                        id="mobile_number"
                                        // label="mobile_number"
                                        // disabled={!edit}
                                        // onChange={handleChange}
                                        onChange={newMobileInputHandler}
                                        // onBlur={handleBlur}
                                        // value={values?.mobile_number}
                                        value={newNumber.mobile_number}
                                      />
                                      <span
                                        onClick={() => newOtpSend({ mobile_number: parseInt(newNumber.mobile_number) })}
                                        style={{ cursor: "pointer" }}
                                        className="send_otp">Send OTP</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row mt_20">
                                <div class="col-md-12">
                                  <label className="sign_title"> Enter OTP </label>
                                  <div class="input_box">
                                    <div class="form_group">
                                      <input
                                        type="text"
                                        name="enter_otp"
                                        placeholder=""
                                        onChange={newOTPInputHandler}
                                        value={newOTP.otp}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt_30">
                                <div className="col-md-4">
                                  <Button
                                    className="continue_btn"
                                    variant="primary"
                                    onClick={() => setModalShow(true)}
                                  >
                                    Verify
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </>
        )
      }
    </>
  );
}

const MyModal = (props) => {
  return (
    <Modal
      {...props}
      dialogClassName="modal_350"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
      <Modal.Body>
        <center>
          <img src={BackGround.Succcess}></img>
          <h3 className="skip_registration_title">Done</h3>
          <p className="update_number">
            Your mobile number is updated to {props.number}
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer style={{ display: "block", border: "none" }}>
        {/* <Link to="/changemobilenumber"> */}
          <Button className="ok_btn" variant="primary" onClick={props.onHide}>
            OK
          </Button>
        {/* </Link> */}
      </Modal.Footer>
    </Modal>
  );
};

export default Changemobilenum;
