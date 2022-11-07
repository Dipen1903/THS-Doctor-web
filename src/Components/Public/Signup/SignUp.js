import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Formik, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";

import OTPInput from "../../Common/Layouts/OTPInput/OTPInput";
import { BackGround } from "../../../Utilities/Icons";
import { SignUpEnum } from "../../../Utilities/Enums";
import FormControl from "../../Common/Forms/FormControl";
import { OTPSchema, SignUpSchema } from "../../../Utilities/Schema";
import {
  OTPResendSignUp,
  OTPVerifySignUp,
  SignUp,
  toggleOTPverify,
  toggleSuccess,
} from "../../../Store/Reducers/RegiserSlice";
import { useTimer } from "../../../Utilities/Hooks";
import { padLeadingZeros } from "../../../Utilities/Functions";

export default function SignUpComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpVerify, success } = useSelector(
    ({ RegisterSlice }) => RegisterSlice
  );

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <SuccessModal
        show={success}
        onHide={() => {
          dispatch(toggleSuccess(false));
          navigate("/dashboard");
        }}
      />
      <div className="sub_section_2">
        <div className="row">
          <div className="col-md-12">
            <div className="display_t js-fullheight">
              <div className="row">
                <div className="col-md-12">
                  <div className="login_box">
                    <h3 className="logo_title">THS Doctor’s Sign Up</h3>
                    <h5 className="welcome_title">Welcome back to THS!</h5>
                    <div className="signin_box">
                      <Formik
                        initialValues={SignUpEnum}
                        validationSchema={SignUpSchema}
                        onSubmit={(values) => dispatch(SignUp(values))}
                      >
                        {({
                          values,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-6 mt_20">
                                <FormControl
                                  control="input"
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  label="First Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.first_name}
                                />
                              </div>
                              <div className="col-md-6 mt_20">
                                <FormControl
                                  control="input"
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  label="Last Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.last_name}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12 mt_20">
                                <FormControl
                                  control="input"
                                  type="number"
                                  name="mobile_number"
                                  id="mobile_number"
                                  label="Mobile"
                                  min={0}
                                  maxLength={10}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.mobile_number}
                                />
                              </div>
                              <div className="col-md-12 mt_20">
                                <FormControl
                                  control="input"
                                  type="email"
                                  name="email"
                                  id="email"
                                  label="Email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                />
                              </div>
                              <div className="col-md-12 mt_20">
                                <FormControl
                                  control="input"
                                  type="password"
                                  name="password"
                                  id="password"
                                  label="Password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                />
                              </div>
                              <div className="col-md-12 mt_20">
                                <FormControl
                                  control="input"
                                  type="password"
                                  name="confirm_password"
                                  id="confirm_password"
                                  label="Confirm Password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirm_password}
                                />
                              </div>
                              <div className="col-md-12">
                                <button
                                  className="login_btn"
                                  type="submit"
                                  variant="primary"
                                >
                                  Sign Up
                                </button>
                              </div>
                            </div>
                            {otpVerify && (
                              <OTPVerify
                                show={otpVerify}
                                onHide={(e) => {
                                  dispatch(toggleOTPverify(false));
                                }}
                                values={values}
                              />
                            )}
                          </Form>
                        )}
                      </Formik>
                      <div className="row mt_20">
                        <div className="col-md-12">
                          <h3 className="by_clicking">
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
                              Already have an account?
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
    </>
  );
}

const OTPVerify = (props) => {
  const { values, ...rest } = props;
  const dispatch = useDispatch();
  const { timer, resetTimer } = useTimer();
  const resendOtp = (e) => {
    e.preventDefault();
    dispatch(
      OTPResendSignUp({
        mobile_number: values?.mobile_number,
      })
    ).then((res) => {
      if (res?.payload?.success) resetTimer(60);
    });
  };
  return (
    <Modal
      {...rest}
      size="sm"
      backdrop="static"
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
      <Formik
        initialValues={{ mobile_number: values?.mobile_number, otp: "" }}
        enableReinitialize
        validationSchema={OTPSchema}
        onSubmit={(values) => {
          dispatch(OTPVerifySignUp(values)).then((res) => {
            if (res.payload.success) {
              dispatch(toggleOTPverify(false));
              dispatch(toggleSuccess(true));
            }
          });
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <p className="otp_sent">
                Enter the OTP sent on {values?.mobile_number}
              </p>
              <center>
                <div className="display_inline">
                  <OTPInput
                    autoFocus
                    length={4}
                    className="otpContainer"
                    inputClassName="otpInput"
                    onChangeOTP={(otp) => setFieldValue("otp", otp)}
                  />
                </div>
                <ErrorMessage
                  name="otp"
                  render={(error) => <div className="error">{error}</div>}
                />
                <center>
                  {parseInt(padLeadingZeros(timer, 2)) ? (
                    <p className="resend mb_10">{`0:${timer}`}</p>
                  ) : (
                    <p className="resend mb_10" onClick={resendOtp}>
                      Resend
                    </p>
                  )}
                </center>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <div className="">
                <Button
                  className="close_btn"
                  onClick={() => {
                    props.onHide();
                  }}
                >
                  Cancel
                </Button>
                <Button className="verify_btn" variant="primary" type="submit">
                  Verify
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const SuccessModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <center>
          <img alt="myImg" src={BackGround.Succcess}></img>
          <h3 className="welcome_ths">Welcome to THS</h3>
          <p className="please_fill_out_profile">
            Please fill out your personal-work profile and verify your identity
            before starting. Thanks!
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            className="my_work_profile_btn"
            onClick={() => {
              navigate("/details/personal-work");
              dispatch(toggleSuccess(false));
            }}
          >
            Fill Out My Work Profile
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
