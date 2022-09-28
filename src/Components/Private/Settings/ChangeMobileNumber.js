import React from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { ErrorMessage, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { BackGround } from "../../../Utilities/Icons";
import FormControl from "../../Common/Forms/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOTPCurrent,
  GetOTPNew,
  GetUserProfile,
  VerifyOTPCurrent,
  VerifyOTPNew,
} from "../../../Store/Reducers/ProfileReducer";
import { PhoneNumberSchema } from "../../../Utilities/Schema";

function Changemobilenum() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [verified, setVerified] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
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
                <Formik
                  initialValues={{
                    mobile_number: verified ? "" : userProfile?.mobile_number,
                    otp: "",
                  }}
                  enableReinitialize
                  validationSchema={PhoneNumberSchema}
                  onSubmit={(values, { resetForm }) => {
                    if (!verified) {
                      dispatch(VerifyOTPCurrent({ otp: values?.otp })).then(
                        (res) => {
                          resetForm();
                          if (res?.payload?.success) {
                            setVerified(true);
                          }
                        }
                      );
                    } else {
                      dispatch(VerifyOTPNew(values)).then((res) => {
                        resetForm();
                        if (res?.payload?.success) {
                          dispatch(GetUserProfile()).then(() =>
                            setVerified(false)
                          );
                        }
                      });
                    }
                  }}
                >
                  {({ values, handleBlur, handleChange, handleSubmit }) =>
                    !verified ? (
                      <form onSubmit={handleSubmit} id="myForm">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12">
                              <label className="sign_title">
                                Current Mobile Number
                              </label>
                              <div className="input_box">
                                <div className="form_group">
                                  <input
                                    type="phone"
                                    name="mobile_number"
                                    id="mobile_number"
                                    disabled
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.mobile_number}
                                  />
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      dispatch(GetOTPCurrent());
                                    }}
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
                              <FormControl
                                control="input"
                                type="text"
                                name="otp"
                                id="otp"
                                label="Enter OTP"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.otp}
                              />
                            </div>
                          </div>
                          <div className="row mt_30">
                            <div className="col-md-4">
                              <button
                                type="submit"
                                className="continue_btn"
                                variant="primary"
                              >
                                Verify
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleSubmit} id="myForm">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-12">
                              <label className="sign_title">
                                New Mobile Number
                              </label>
                              <div className="input_box">
                                <div className="form_group">
                                  <input
                                    type="phone"
                                    name="mobile_number"
                                    id="mobile_number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.mobile_number}
                                  />
                                  {values?.mobile_number && (
                                    <span
                                      onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(
                                          GetOTPNew({
                                            mobile_number:
                                              values?.mobile_number,
                                          })
                                        );
                                      }}
                                      className="send_otp"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Send OTP
                                    </span>
                                  )}
                                </div>
                                <ErrorMessage
                                  component={({ children }) => (
                                    <div className="error">{children}</div>
                                  )}
                                  name={"mobile_number"}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt_20">
                            <div className="col-md-12">
                              <FormControl
                                control="input"
                                type="text"
                                name="otp"
                                id="otp"
                                label="Enter OTP"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.otp}
                              />
                            </div>
                          </div>
                          <div className="row mt_30">
                            <div className="col-md-4">
                              <button
                                type="submit"
                                className="continue_btn"
                                variant="primary"
                              >
                                Verify
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )
                  }
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
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
          <img alt="myImg" src={BackGround.Succcess}></img>
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
