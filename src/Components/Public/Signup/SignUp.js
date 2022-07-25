import React from "react";
import "../Assets/css/style.css";
import "../Assets/css/responsive.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Modal from "react-bootstrap/Modal";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OTPInput from "../../Common/Layouts/OTPInput/OTPInput";

export default function SignUp() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  useEffect(() => {
    setModalShow(true);
    return () => {};
  }, []);

  return (
    <>
      <MyModal
        show={modalShow}
        onHide={(e) => {
          setModalShow(false);
          e === true && setModalShow1(true);
        }}
      />

      <MyModal_1 show={modalShow1} onHide={() => setModalShow1(false)} />

      <div class="section_1_bg">
        <div class="section_1_container">
          <div class="sub_section_1 js-fullheight">
            <div class="row">
              <div class="col-md-12">
                <div class="display_t">
                  <img
                    src={require("../Assets/img/logo.png")}
                    class="logo_box"
                  ></img>
                  <div class="slider_1">
                    <OwlCarousel
                      className="owl-theme"
                      loop
                      margin={10}
                      items={1}
                    >
                      <div class="item">
                        <center>
                          <img
                            src={require("../Assets/img/slider_1.png")}
                            class="logo_box"
                          ></img>
                          <h3 class="slider_text">
                            Help millions of people everywhere,
                            <br /> everytime
                          </h3>
                        </center>
                      </div>
                      <div class="item">
                        <center>
                          <img
                            src={require("../Assets/img/slider_1.png")}
                            class="logo_box"
                          ></img>
                          <h3 class="slider_text">
                            Help millions of people everywhere,
                            <br /> everytime
                          </h3>
                        </center>
                      </div>
                      <div class="item">
                        <center>
                          <img
                            src={require("../Assets/img/slider_1.png")}
                            class="logo_box"
                          ></img>
                          <h3 class="slider_text">
                            Help millions of people everywhere,
                            <br /> everytime
                          </h3>
                        </center>
                      </div>
                    </OwlCarousel>
                    ;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub_section_2">
            <div class="row">
              <div class="col-md-12">
                <div class="display_t js-fullheight">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="login_box">
                        <h3 class="logo_title">THS Doctor’s Sign Up</h3>
                        <h5 class="welcome_title">Welcome back to THS!</h5>
                        <div class="signin_box">
                          <Form>
                            <div class="row">
                              <div class="col-md-6 mt_20">
                                <label className="sign_title">First Name</label>
                                <div class="input_box">
                                  <div class="form_group">
                                    <input
                                      type="text"
                                      name="firstname"
                                      placeholder=""
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 mt_20">
                                <label className="sign_title">Last Name</label>
                                <div class="input_box">
                                  <div class="form_group">
                                    <input
                                      type="text"
                                      name="lastname"
                                      placeholder=""
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12 mt_20">
                                <label className="sign_title"> Mobile </label>
                                <div class="input_box">
                                  <div class="form_group">
                                    <input
                                      type="text"
                                      name="mobilenum"
                                      placeholder=""
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12 mt_20">
                                <label className="sign_title"> Email </label>
                                <div class="input_box">
                                  <div class="form_group">
                                    <input
                                      type="email"
                                      name="mobilenum"
                                      placeholder=""
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12 mt_20">
                                <label className="sign_title"> Password </label>
                                <div class="input_box ">
                                  <div class="form_group">
                                    <input
                                      type="password"
                                      id="password"
                                      name="password"
                                      placeholder=""
                                      required
                                    />
                                    <i className="toggle-password fa fa-fw fa-eye-slash"></i>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12 mt_20">
                                <label className="sign_title">
                                  Confirm Password{" "}
                                </label>
                                <div class="input_box">
                                  <div class="form_group">
                                    <input
                                      type="password"
                                      id="password"
                                      name="password"
                                      placeholder=""
                                      required
                                    />
                                    <i className="toggle_password_1 fa fa-fw fa-eye-slash"></i>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <button
                                  class="login_btn"
                                  variant="primary"
                                  onClick={() => setModalShow(true)}
                                >
                                  Sign Up
                                </button>
                              </div>
                            </div>
                          </Form>
                          <div class="row mt_20">
                            <div class="col-md-12">
                              <h3 class="by_clicking">
                                By clicking sign up you are agreeing to the
                                <br /> <Link to="">Terms of use</Link> and the{" "}
                                <Link to="/">Privacy policy</Link>
                              </h3>
                            </div>
                          </div>
                          <div className="row mt_50">
                            <div className="col-md-12">
                              <center>
                                <h3 className="dont_have_account">
                                  Already have an account?{" "}
                                  <Link to="/" className="sign_up">
                                    Log In
                                  </Link>
                                </h3>
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const MyModal = (props) => {
  const [modalShow1, setModalShow1] = useState(false);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="mobile_verification"
        >
          Mobile Verification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p class="otp_sent">Enter the OTP sent on 929311211</p>
        <center>
          <div className="display_inline">
            <OTPInput
              autoFocus
              length={4}
              className="otpContainer"
              inputClassName="otpInput"
              onChangeOTP={(otp) => console.log("String OTP: ", otp)}
            />
          </div>
          <center>
            <Link to="/">
              <p className="resend mb_10">Resend</p>
            </Link>
          </center>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div className="">
          <Button className="close_btn" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            className="verify_btn"
            variant="primary"
            onClick={() => {
              props.onHide(true);
            }}
          >
            Verify
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const MyModal_1 = (props1) => {
  return (
    <Modal
      {...props1}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <center>
          <img src={require("../Assets/img/img_success.png")}></img>
          <h3 className="welcome_ths">Welcome to Doctor THS!</h3>
          <p className="please_fill_out_profile">
            Please fill out your work profile and verify your identity before
            starting. Thanks!
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button className="my_work_profile_btn" onClick={props1.onHide}>
            Fill Out My Work Profile
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
