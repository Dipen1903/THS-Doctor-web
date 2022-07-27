import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicInformation from "./BasicInformation";
import WorkProfile from "./WorkProfile";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EducationalProfile from "./EducationalProfile";
import { ProfileEnum, SignUpEnum } from "../../../Utilities/Enums";
import { ProfileSchema, SignUpSchema } from "../../../Utilities/Schema";
import { Formik } from "formik";
import ProgressBar from "../../Common/Layouts/Progress_bar";
import { BackGround } from "../../../Utilities/Icons";
import { nextStep, prevStep } from "../../../Store/Reducers/ProfileReducer";
import { CityList, StateList } from "../../../Store/Reducers/CommonReducer";

function PersonalProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const { profileStep } = useSelector(({ ProfileSlice }) => ProfileSlice);
  function submit(values) {
    console.log(values);
  }
  useEffect(() => {
    dispatch(StateList());
    dispatch(CityList());
    return () => {};
  }, []);

  return (
    <div class="sub_section_2">
      <SkipCaution show={modalShow} onHide={() => setModalShow(false)} />
      <div class="row">
        <div class="col-md-12">
          <div class="display_t js-fullheight">
            <div class="row">
              <div class="col-md-12">
                <div class="basic_info_box">
                  <div class="row">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                      <span className="skip" onClick={() => setModalShow(true)}>
                        SKIP
                      </span>
                    </div>
                  </div>
                  <h5 class="steps mt_50">Step {profileStep} of 3</h5>
                  <h3 class="info_title">
                    {profileStep == 1
                      ? "Basic Information"
                      : profileStep == 2
                      ? "Your Work Profile"
                      : profileStep == 3
                      ? "Your Qualifications and ID Proof"
                      : ""}
                  </h3>
                  <div class="progress_box">
                    <div class="row">
                      <div class="col-md-3">
                        <h5 class="profile_milestone">Profile Milestone</h5>
                      </div>
                      <div class="col-md-8">
                        <ProgressBar
                          isLoading={false}
                          percent={10}
                          size={"large"}
                          showInfo={true}
                        />
                        <h6 class="progress_bar_subtext">
                          Complete your profile for connect with patients{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <Formik
                    initialValues={ProfileEnum}
                    validationSchema={ProfileSchema}
                    onSubmit={(values) => submit(values)}
                  >
                    {({ values, errors, handleSubmit, validateField }) => (
                      <form onSubmit={handleSubmit}>
                        <WizardForm />
                        {/* {console.log(errors)} */}
                        <div class="row mt_10">
                          <div className="display_inline">
                            {profileStep > 1 ? (
                              <button
                                class="back_btn"
                                variant="primary"
                                onClick={() => {
                                  dispatch(prevStep());
                                }}
                              >
                                Back
                              </button>
                            ) : (
                              <></>
                            )}
                            {profileStep < 3 ? (
                              <button
                                class="continue_btn"
                                variant="primary"
                                onClick={(e) => {
                                  handleSubmit(e);
                                  dispatch(nextStep());
                                }}
                              >
                                Continue
                              </button>
                            ) : (
                              <></>
                            )}
                            {profileStep === 3 ? (
                              <button
                                class="continue_btn"
                                variant="primary"
                                onClick={() => {
                                  dispatch(nextStep());
                                }}
                              >
                                Submit
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WizardForm({ formData }) {
  const { profileStep } = useSelector(({ ProfileSlice }) => ProfileSlice);
  switch (profileStep) {
    case 1:
      return <BasicInformation />;
    case 2:
      return <WorkProfile />;
    case 3:
      return <EducationalProfile />;
    default:
      return <></>;
  }
}

const SkipCaution = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="display_none"></Modal.Header>
      <Modal.Body>
        <center>
          <img src={BackGround.Caution}></img>
          <h3 className="skip_registration_title">
            Are you sure you want to skip the registration?
          </h3>
          <p className="only_verified">
            Only Verified doctors are allowed to consult on THS Platform.
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div className="">
          <Button className="close_btn_1" onClick={props.onHide}>
            Cancel
          </Button>
          <Button className="skip_btn" variant="primary">
            Skip Anyway
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
const ProfileSubmitted = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header class="modal_header" closeButton></Modal.Header>
      <Modal.Body>
        <center>
          <img src={BackGround.Succcess}></img>
          <h3 className="submit_profile">Your Profile Submited Successfully</h3>
          <p className="preferred_schedule">
            Please choose your preferred Schedule and provide A/C Details to
            receive Payments from Online Consultation. Thanks!
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div className="">
          <Button
            className="set_up_btn"
            variant="primary"
            onClick={props.onHide}
          >
            Set up Schedule & Payment
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default PersonalProfile;
