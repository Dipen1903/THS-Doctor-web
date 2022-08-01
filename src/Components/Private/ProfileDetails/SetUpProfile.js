import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";

import BasicInformation from "./Personal&Work/BasicInformation";
import WorkProfile from "./Personal&Work/WorkProfile";
import EducationalProfile from "./Personal&Work/EducationalProfile";
import SheduleInformation from "./Shedule&Payment/SheduleInformation";
import BankInformation from "./Shedule&Payment/BankInformation";
import { BankEnum, ProfileEnum, ScheduleEnum } from "../../../Utilities/Enums";
import ProgressBar from "../../Common/Layouts/Progress_bar";
import { BackGround } from "../../../Utilities/Icons";
import {
  EditBankDetails,
  EditSchedule,
  EditUserProfile,
  nextStep,
  prevStep,
  toggleSkip,
  toggleSuccess,
} from "../../../Store/Reducers/ProfileReducer";
import {
  CityList,
  DocumentList,
  LanguageList,
  QualificationList,
  SpecialityList,
  StateList,
  SubSpecialityList,
} from "../../../Store/Reducers/CommonReducer";
import { isEmpty } from "../../../Utilities/Functions";

export function SetUpProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(ProfileEnum);
  const { profileStep, successModal, skipModal, userProfile } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  const intialSetup = () => {
    let tempProfile = { ...profileData };
    tempProfile.dob = userProfile?.birthdate;
    tempProfile.gender = userProfile?.gender;
    tempProfile.image = userProfile?.image;
    tempProfile.city_id = userProfile?.city_id;
    tempProfile.state_id = userProfile?.state_id;
    if (
      tempProfile.dob &&
      tempProfile.gender &&
      tempProfile.image &&
      tempProfile.city_id &&
      tempProfile.state_id
    ) {
      dispatch(nextStep(2));
    }
    tempProfile.speciality = userProfile?.speciality;
    tempProfile.sub_speciality = userProfile?.sub_speciality;
    tempProfile.experience = userProfile?.experience;
    tempProfile.registration_number = userProfile?.registration_number;
    tempProfile.languages = userProfile?.languages?.split(",");
    if (
      tempProfile.speciality &&
      tempProfile.sub_speciality &&
      tempProfile.experience &&
      tempProfile.registration_number &&
      tempProfile.languages
    ) {
      dispatch(nextStep(3));
    }

    tempProfile.qualification = userProfile?.qualification;
    setProfileData(tempProfile);
  };
  const submit = (values) => {
    let tempData = { ...values };
    tempData.languages = values?.languages?.toString();
    tempData.qualification = values?.qualification.map((item) =>
      JSON.stringify(item)
    );
    dispatch(EditUserProfile(tempData)).then((res) => {
      if (res?.payload?.success) {
        if (profileStep === 3) {
          dispatch(toggleSuccess(true));
        } else {
          dispatch(nextStep());
        }
      }
    });
  };
  useEffect(() => {
    intialSetup();
    return () => {};
  }, [userProfile]);

  useEffect(() => {
    dispatch(StateList());
    dispatch(CityList());
    dispatch(SpecialityList());
    dispatch(SubSpecialityList());
    dispatch(LanguageList());
    dispatch(QualificationList());
    dispatch(DocumentList());

    return () => {
      dispatch(nextStep(1));
    };
  }, []);

  return (
    <div class="sub_section_2">
      <SkipCaution
        show={skipModal}
        onHide={() => dispatch(toggleSkip(false))}
      />
      <ProfileSubmitted
        show={successModal}
        onHide={() => {
          dispatch(toggleSuccess(false));
          navigate("/dashboard");
        }}
      />
      <div class="row">
        <div class="col-md-12">
          <div class="display_t js-fullheight">
            <div class="row">
              <div class="col-md-12">
                <div class="basic_info_box">
                  <div class="row">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                      <span
                        className="skip"
                        onClick={() => dispatch(toggleSkip(true))}
                      >
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
                      ? "Your qualification and ID Proof"
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
                    initialValues={profileData}
                    enableReinitialize
                    onSubmit={submit}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      handleSubmit,
                      validateForm,
                    }) => {
                      const isStepTwoValid = () =>
                        !isEmpty(values?.speciality) &&
                        touched?.speciality &&
                        !isEmpty(values?.sub_speciality) &&
                        touched?.sub_speciality &&
                        !isEmpty(values?.experience) &&
                        touched?.experience
                          ? true
                          : false;
                      const handleNext = (e) => {
                        let isNext = false;
                        if (profileStep == 2) {
                          isNext = true;
                        } else {
                          isNext = true;
                        }
                        if (isNext) {
                          handleSubmit(e);
                        } else {
                          validateForm();
                        }
                      };
                      return (
                        <form onSubmit={() => {}}>
                          <ProfileWizardForm />
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
                                  type="button"
                                  onClick={handleNext}
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
                                  onClick={(e) => {
                                    handleSubmit(e);
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
                      );
                    }}
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
export function SetUpSetting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(ProfileEnum);
  const { profileStep, successModal, skipModal, userProfile } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div class="sub_section_2">
      <SkipCaution
        show={skipModal}
        onHide={() => dispatch(toggleSkip(false))}
      />
      <div class="row">
        <div class="col-md-12">
          <div class="display_t js-fullheight">
            <div class="row">
              <div class="col-md-12">
                <div class="basic_info_box">
                  <div class="row">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                      <span
                        className="skip"
                        onClick={() => dispatch(toggleSkip(true))}
                      >
                        SKIP
                      </span>
                    </div>
                  </div>
                  <h5 class="steps mt_50">Steps {profileStep} of 2</h5>
                  <h3 class="doc_appointment_head">
                    {profileStep === 1
                      ? "Doctor Availbility and Fees"
                      : "Bank Details"}
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
                          Complete your profile for connect with patients
                        </h6>
                      </div>
                    </div>
                  </div>
                  <Formik
                    initialValues={{ ...ScheduleEnum, ...BankEnum }}
                    onSubmit={(values) => {
                      console.log(values);
                      navigate("/dashboard");
                      if (profileStep == 1) {
                        // dispatch(EditSchedule(values));
                      } else if (profileStep == 2) {
                        // dispatch(EditBankDetails(values));
                      }
                    }}
                  >
                    {({ handleSubmit }) => (
                      <>
                        <ScheduleWizardForm />
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
                            {profileStep < 2 ? (
                              <button
                                class="continue_btn"
                                variant="primary"
                                type="button"
                                onClick={() => dispatch(nextStep())}
                              >
                                Continue
                              </button>
                            ) : (
                              <></>
                            )}
                            {profileStep === 2 ? (
                              <button
                                class="continue_btn"
                                variant="primary"
                                onClick={(e) => {
                                  handleSubmit(e);
                                }}
                              >
                                Submit
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </>
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

function ProfileWizardForm(props) {
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

function ScheduleWizardForm(props) {
  const { profileStep } = useSelector(({ ProfileSlice }) => ProfileSlice);
  switch (profileStep) {
    case 1:
      return <SheduleInformation />;
    case 2:
      return <BankInformation />;
    default:
      return <></>;
  }
}

const SkipCaution = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileStep } = useSelector(({ ProfileSlice }) => ProfileSlice);
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
          <Button className="close_btn_1" onClick={() => props.onHide()}>
            Cancel
          </Button>
          <Button
            className="skip_btn"
            variant="primary"
            onClick={() => {
              if (profileStep < 3) {
                dispatch(nextStep());
              } else {
                navigate("/dashboard");
              }
              props.onHide();
            }}
          >
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
            onClick={() => {
              props.onHide();
            }}
          >
            Set up Schedule & Payment
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
