import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import FormControl from "../../Common/Forms/FormControl";
import { SignInEnum } from "../../../Utilities/Enums";
import {
  ForgotSchema,
  MobileSignInSchema,
  ResetPasswordSchema,
  SignInSchema,
  validatePhone,
} from "../../../Utilities/Schema";
import {
  ForgotPassword,
  GetMedkartToken,
  MobileSignIn,
  OTPResendForgot,
  OTPResendSignIn,
  OTPVerifyForgot,
  OTPVerifySignIn,
  ResetPassword,
  setSession,
  SignIn,
  toggleForgotModal,
  toggleOTPModal,
  toggleResetModal,
  toggleSuccessModal,
  toggleVerifyForgotModal,
} from "../../../Store/Reducers/AuthSlice";
import OTPInput from "../../Common/Layouts/OTPInput/OTPInput";
import { padLeadingZeros } from "../../../Utilities/Functions";
import { useTimer } from "../../../Utilities/Hooks";
import { BackGround } from "../../../Utilities/Icons";

function SignInComponent() {
  const { otpModal, forgotModal, successModal } = useSelector(
    ({ AuthSlice }) => AuthSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="sub_section_2">
        <div className="row">
          <div className="col-md-12">
            <div className="display_t js-fullheight">
              <div className="row">
                <div className="col-md-12">
                  <div className="login_box">
                    <h3 className="logo_title">THS Doctor’s Sign In</h3>
                    <h5 className="welcome_title">Welcome back to THS!</h5>
                    <div className="signin_box">
                      <Formik
                        initialValues={SignInEnum}
                        validationSchema={SignInSchema}
                        onSubmit={(values) => {
                          dispatch(SignIn(values)).then((res) => {
                            if (res.payload?.success) {
                              dispatch(GetMedkartToken());
                              navigate("/dashboard");
                            }
                          });
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
                                <div className="col-md-12">
                                  <FormControl
                                    control="input"
                                    type="text"
                                    name="email"
                                    id="email"
                                    label="Mobile / Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                  />
                                </div>
                                <div className="col-md-12">
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
                                <div className="col-md-12">
                                  <button type="submit" className="login_btn">
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
                            <div className="d-flex justify-content-between align-items-center px-2 mt_30">
                              <a
                                href="#!"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(toggleOTPModal(true));
                                }}
                                className="login_with_otp"
                              >
                                Login with OTP
                              </a>

                              <a
                                href="#!"
                                className="forgot_password"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(toggleForgotModal(true));
                                }}
                              >
                                Forgot Password?
                              </a>
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
      <ForgotModal
        show={forgotModal}
        onHide={() => {
          dispatch(toggleForgotModal(false));
        }}
      />
      <SuccessModal
        show={successModal}
        onHide={() => {
          dispatch(toggleSuccessModal(false));
        }}
      />
    </>
  );
}
const OTPLogin = (props) => {
  const { values, ...rest } = props;
  const [verified, setVerified] = useState(false);
  const { resetTimer, timer } = useTimer();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Modal
      {...rest}
      className="modal-mobile"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {!verified ? (
        <>
          <Modal.Header>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="mobile_verification"
            >
              Login with OTP
            </Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={{ mobile_number: "" }}
            enableReinitialize
            validationSchema={MobileSignInSchema}
            onSubmit={(values) => {
              dispatch(MobileSignIn(values)).then((res) => {
                if (res.payload.success) {
                  setVerified(values.mobile_number);
                  resetTimer(60);
                }
              });
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <p className="otp_sent">
                    Please enter registered Mobile to receive verification code.
                  </p>

                  <FormControl
                    control="input"
                    type="number"
                    label="Mobile"
                    name="mobile_number"
                    min={0}
                    maxLength={10}
                    id="mobile_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile_number}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button className="close_btn" onClick={props.onHide}>
                    Cancel
                  </Button>
                  <Button
                    className="verify_btn"
                    variant="primary"
                    type="submit"
                  >
                    Send OTP
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="mobile_verification"
            >
              Mobile Verification
            </Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={{ mobile_number: verified, otp: "" }}
            enableReinitialize
            onSubmit={(values) => {
              dispatch(OTPVerifySignIn(values)).then((res) => {
                if (res?.payload?.success) {
                  dispatch(setSession(res?.payload?.data));
                  navigate("/dashboard");
                  props.onHide();
                }
              });
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <p className="otp_sent">Enter the OTP sent on {verified}</p>
                  <center>
                    <div className="display_inline">
                      <OTPInput
                        autoFocus
                        length={4}
                        className="otpContainer"
                        isNumberInput={true}
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
                    <Button
                      className="verify_btn"
                      variant="primary"
                      type="submit"
                    >
                      Verify
                    </Button>
                  </div>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Modal>
  );
};
const ForgotModal = (props) => {
  const dispatch = useDispatch();
  const { verifyForgot, resetModal } = useSelector(
    ({ AuthSlice }) => AuthSlice
  );
  const submit = (values) => {
    if (validatePhone(parseInt(values?.value ?? "0"))) {
      values["type"] = 0;
    } else {
      values["type"] = 1;
    }
    dispatch(ForgotPassword(values));
  };
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
          className="forgot_password_title"
        >
          Forgot Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="forgot_password_subtext">
          Please enter registered Mobile / email below to receive verification
          code.
        </p>
        <Formik
          initialValues={{ value: "", type: "" }}
          validationSchema={ForgotSchema}
          onSubmit={(values) => submit(values)}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <FormControl
                    control="input"
                    type="text"
                    name="value"
                    id="value"
                    label="Mobile / Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.value}
                  />
                </div>
              </div>
              <div className="mt_40">
                <Button className="close_btn" onClick={props.onHide}>
                  Cancel
                </Button>
                <Button className="sendotp_btn" variant="primary" type="submit">
                  Send OTP
                </Button>
              </div>
              <OTPForgot
                show={verifyForgot}
                onHide={() => {
                  dispatch(toggleVerifyForgotModal(false));
                  props.onHide();
                }}
                values={values}
              />
              <ResetPasswordModal
                show={resetModal}
                onHide={() => {
                  dispatch(toggleResetModal(false));
                  props.onHide();
                }}
                values={values}
              />
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
const OTPForgot = (props) => {
  const { values, ...rest } = props;

  const { resetTimer, timer } = useTimer();
  const dispatch = useDispatch();

  const otpResend = (e) => {
    e.preventDefault();
    dispatch(
      OTPResendForgot({ value: values?.value, type: values?.type })
    ).then((res) => {
      if (res?.payload?.success) resetTimer(60);
    });
  };

  useEffect(() => {
    return () => {};
  }, []);

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
          OTP Verification
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ value: values?.value, type: values?.type, otp: "" }}
        enableReinitialize
        onSubmit={(values) => {
          dispatch(OTPVerifyForgot(values));
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <p className="otp_sent">Enter the OTP sent on {values?.value}</p>
              <center>
                <div className="display_inline">
                  <OTPInput
                    autoFocus
                    length={4}
                    isNumberInput={true}
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
                    <p className="resend mb_10" onClick={otpResend}>
                      Resend
                    </p>
                  )}
                </center>
              </center>
            </Modal.Body>
            <Modal.Footer>
              <div className="">
                <Button className="close_btn" onClick={() => props.onHide()}>
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
const ResetPasswordModal = (props) => {
  const { values, ...rest } = props;
  const dispatch = useDispatch();
  return (
    <Modal
      {...rest}
      dialogClassName="modal_350"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="reset_password"
        >
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="reset_password_subtext">
          Create new password for your account.
        </p>
        <Formik
          initialValues={{
            ...values,
            password: "",
            confirm_password: "",
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => dispatch(ResetPassword(values))}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mt_20">
                  <FormControl
                    control="input"
                    type="password"
                    name="password"
                    id="password"
                    label="New Password"
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
                    label="Repeat New Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                  />
                </div>
              </div>
              <div className="mt_40">
                <Button className="close_btn" onClick={props.onHide}>
                  Cancel
                </Button>
                <Button className="save_btn" variant="primary" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const SuccessModal = (props) => {
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
          <h3 className="password_reset_success_title">Done</h3>
          <p className="password_reset_subtitle">
            Password reset successfully done!
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button className="go_to_login" onClick={props.onHide}>
            Go to Log In
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SignInComponent;
