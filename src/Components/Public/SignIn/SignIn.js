import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import FormControl from "../../Common/Forms/FormControl";
import { SignInEnum } from "../../../Utilities/Enums";
import { SignInSchema } from "../../../Utilities/Schema";
import {
  OTPResendSignIn,
  OTPSignIn,
  OTPVerifySignIn,
  SignIn,
  toggleOTPModal,
} from "../../../Store/Reducers/AuthSlice";
import OTPInput from "../../Common/Layouts/OTPInput/OTPInput";
import { isEmpty, padLeadingZeros } from "../../../Utilities/Functions";
import { useTimer } from "../../../Utilities/Hooks";

function SignInComponent() {
  const { otpModal } = useSelector(({ AuthSlice }) => AuthSlice);
  const dispatch = useDispatch();
  return (
    <>
      <div class="sub_section_2">
        <div class="row">
          <div class="col-md-12">
            <div class="display_t js-fullheight">
              <div class="row">
                <div class="col-md-12">
                  <div class="login_box">
                    <h3 class="logo_title">THS Doctor’s Sign In</h3>
                    <h5 class="welcome_title">Welcome back to THS!</h5>
                    <div class="signin_box">
                      <Formik
                        initialValues={SignInEnum}
                        validationSchema={SignInSchema}
                        onSubmit={(values) => {
                          dispatch(SignIn(values));
                        }}
                      >
                        {({
                          values,
                          errors,
                          setTouched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        }) => (
                          <>
                            <Form onSubmit={handleSubmit}>
                              <div className="row">
                                <div class="col-md-12">
                                  <FormControl
                                    control="input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    label="Mobile / Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                  />
                                </div>
                                <div class="col-md-12">
                                  <FormControl
                                    control="input"
                                    type="password"
                                    name="password"
                                    id="password"
                                    labelclass="mt_30"
                                    label="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                  />
                                </div>
                                <div class="col-md-12">
                                  <button type="submit" class="login_btn">
                                    Login
                                  </button>
                                </div>
                              </div>
                              {otpModal && (
                                <OTPLogin
                                  show={otpModal}
                                  onHide={(e) => {
                                    dispatch(toggleOTPModal(false));
                                  }}
                                  values={values}
                                />
                              )}
                            </Form>
                            <div className="row mt_30">
                              <div className="col-md-6 col-6">
                                <a
                                  href="#!"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                      !isEmpty(values.email) &&
                                      !errors?.email
                                    ) {
                                      dispatch(
                                        OTPSignIn({
                                          mobile_number: values?.email,
                                        })
                                      ).then((res) => {
                                        if (res?.payload?.success) {
                                          dispatch(toggleOTPModal(true));
                                        }
                                      });
                                    } else {
                                      setTouched({ email: true });
                                    }
                                  }}
                                  className="login_with_otp"
                                >
                                  Login with OTP
                                </a>
                              </div>
                              <div className="col-md-6 col-6">
                                <a href="#!" className="forgot_password">
                                  Forgot Password?
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </Formik>
                      <div className="row mt_50">
                        <div className="col-md-12">
                          <center>
                            <h3 className="dont_have_account">
                              Don’t have an account?{" "}
                              <Link to="/signup" className="sign_up">
                                Sign Up
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
const OTPLogin = (props) => {
  const { values, ...rest } = props;
  const { resetTimer, timer } = useTimer();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Modal
      {...rest}
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
      <Formik
        initialValues={{ mobile_number: values?.email, otp: "" }}
        enableReinitialize
        onSubmit={(values) => dispatch(OTPVerifySignIn(values))}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <p class="otp_sent">
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
                <center>
                  {parseInt(timer) ? (
                    <p className="resend mb_10">{`0:${padLeadingZeros(
                      timer,
                      2
                    )}`}</p>
                  ) : (
                    <p
                      className="resend mb_10"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          OTPResendSignIn({
                            mobile_number: values?.mobile_number,
                          })
                        ).then((res) => {
                          if (res?.payload?.success) resetTimer(60);
                        });
                      }}
                    >
                      Resend
                    </p>
                  )}
                </center>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <div className="">
                <Button className="close_btn" onClick={props.onHide}>
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

export default SignInComponent;
