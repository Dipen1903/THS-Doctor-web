import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
  GetUserProfile,
  nextStep,
  prevStep,
  toggleSkip,
  toggleSubmitted,
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

const calculatePercentage = (values) => {
  let percent = 0;
  try {
    const tempObj = { ...ProfileEnum, ...ScheduleEnum, ...BankEnum };
    const total = Object.keys(tempObj).length;
    let currentFilled = 0;
    Object.keys(tempObj).map((key) => {
      if (!isEmpty(values[key])) {
        currentFilled++;
      }
    });

    percent = (100 * currentFilled) / total;
    return parseInt(percent);
  } catch (error) {
    return 0;
  }
};
export function SetUpProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(ProfileEnum);
  const { profileStep, successModal, skipModal, userProfile } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );

  const intialSetup = () => {
    let tempProfile = { ...profileData };
    let tempProofs = [];
    let tempQualification = [];
    tempProfile.dob = userProfile?.birthdate;
    tempProfile.gender = userProfile?.gender;
    tempProfile.image = userProfile?.image;
    tempProfile.city_id = userProfile?.city_id;
    tempProfile.state_id = userProfile?.state_id;
    tempProfile.speciality = userProfile?.speciality_id;
    dispatch(SubSpecialityList({ speciality_id: userProfile?.speciality_id }));
    tempProfile.sub_speciality = userProfile?.sub_speciality_id;
    tempProfile.experience = userProfile?.experience;
    tempProfile.registration_number = userProfile?.registration_number;
    tempProfile.languages = userProfile?.languages?.split(",");
    tempProfile.qualification = "";
    tempProfile.id_proofs = "";

    if (userProfile?.qualifications?.length) {
      userProfile?.qualifications?.map((item) => {
        tempQualification.push({
          type: item?.id_proof,
          file: item?.document,
        });
      });
      if (!isEmpty(tempQualification))
        tempProfile.qualification = tempQualification;
    }
    if (userProfile?.id_proofs?.length) {
      userProfile?.id_proofs?.map((item) => {
        tempProofs.push({
          type: item?.id_proof,
          file: item?.document,
        });
      });
      if (!isEmpty(tempProofs)) tempProfile.proof = tempProofs;
    }

    tempProfile.signature = userProfile?.signature;
    setProfileData(tempProfile);
  };
  const submit = (values) => {
    let tempData = { ...values };
    if (values?.languages) {
      tempData.languages = values?.languages?.toString();
    }
    if (values) tempData["deepIntegrate"] = true;
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
    // dispatch(SubSpecialityList());
    dispatch(LanguageList());
    dispatch(QualificationList());
    dispatch(DocumentList());

    return () => {
      // dispatch(nextStep(1));
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
          dispatch(nextStep(1));
          // navigate("/dashboard");
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

                  <Formik
                    initialValues={{ ...profileData }}
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
                      // const isStepTwoValid = () =>
                      //   !isEmpty(values?.speciality) &&
                      //   touched?.speciality &&
                      //   !isEmpty(values?.sub_speciality) &&
                      //   touched?.sub_speciality &&
                      //   !isEmpty(values?.experience) &&
                      //   touched?.experience
                      //     ? true
                      //     : false;
                      // const handleNext = (e) => {
                      //   let isNext = false;
                      //   if (profileStep == 2) {
                      //     isNext = true;
                      //   } else {
                      //     isNext = true;
                      //   }
                      //   if (isNext) {
                      //     handleSubmit(e);
                      //   } else {
                      //     validateForm();
                      //   }
                      // };
                      return (
                        <>
                          <div class="progress_box">
                            <div class="row">
                              <div class="col-md-3">
                                <h5 class="profile_milestone">
                                  Profile Milestone
                                </h5>
                              </div>
                              <div class="col-md-8">
                                <ProgressBar
                                  isLoading={false}
                                  percent={calculatePercentage(values)}
                                  size={"large"}
                                  showInfo={true}
                                />
                                <h6 class="progress_bar_subtext">
                                  Complete your profile for connect with
                                  patients{" "}
                                </h6>
                              </div>
                            </div>
                          </div>

                          <form onSubmit={() => {}}>
                            <ProfileWizardForm />

                            <div class="row mt_10">
                              <div className="display_inline">
                                {profileStep > 1 ? (
                                  <button
                                    class="back_btn"
                                    // variant="primary"
                                    onClick={(e) => {
                                      e.preventDefault();
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
                                    onClick={handleSubmit}
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
                                    onClick={handleSubmit}
                                  >
                                    Submit
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </form>
                        </>
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
  const [scheduleData, setScheduleData] = useState({
    ...ScheduleEnum,
    ...BankEnum,
  });
  const { profileStep, skipModal, submittedModal, userProfile } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  const calculate = (values) => {
    let tempProfile = { ...ProfileEnum };
    tempProfile.dob = userProfile?.birthdate;
    tempProfile.gender = userProfile?.gender;
    tempProfile.image = userProfile?.image;
    tempProfile.city_id = userProfile?.city_id;
    tempProfile.state_id = userProfile?.state_id;
    tempProfile.speciality = userProfile?.speciality;
    tempProfile.sub_speciality = userProfile?.sub_speciality;
    tempProfile.experience = userProfile?.experience;
    tempProfile.registration_number = userProfile?.registration_number;
    tempProfile.languages = userProfile?.languages?.split(",");
    tempProfile.qualification = userProfile?.qualifications;
    tempProfile.proof = userProfile?.id_proofs;
    tempProfile.signature = userProfile?.signature;
    return calculatePercentage({ ...tempProfile, ...values });
  };

  const submit = (values) => {
    if (profileStep == 1) {
      let tempValues = { ...values };
      tempValues.weekdays = JSON.stringify(values.weekdays);
      tempValues.weekends = JSON.stringify(values.weekends);
      tempValues.emergency_call = values?.emergency_call ? 1 : 0;
      dispatch(EditSchedule(tempValues)).then((res) => {
        if (res?.payload?.success) {
          dispatch(nextStep());
        }
      });
    } else if (profileStep == 2) {
      dispatch(EditBankDetails(values)).then((res) => {
        if (res?.payload?.success) {
          dispatch(toggleSubmitted(true));
        }
      });
    }
  };
  const initialLoad = () => {
    let tempData = { ...scheduleData };
    tempData.account_holder_name =
      userProfile?.bank_details?.account_holder_name;
    tempData.account_number = userProfile?.bank_details?.account_number;
    tempData.confirm_account_number = userProfile?.bank_details?.account_number;
    tempData.ifsc_code = userProfile?.bank_details?.ifsc_code;
    tempData.upi_id = userProfile?.bank_details?.upi_id;

    if (userProfile?.availibility?.length) {
      let weekDays = Object.keys(userProfile?.availibility).filter(
        (item) =>
          item === "monday" ||
          item === "tuesday" ||
          item === "wednsday" ||
          item === "thursday" ||
          item === "friday"
      );
      if (weekDays) tempData.weekdays.days = weekDays;
      if (tempData?.weekdays?.days.length) {
        userProfile?.availibility[tempData?.weekdays?.days[0]]?.map((item) => {
          tempData.weekdays.time_period[item?.time_period] = {
            start_time: item?.start_time,
            end_time: item?.end_time,
            min: tempData.weekdays.time_period[item?.time_period].min,
            max: tempData.weekdays.time_period[item?.time_period].max,
          };
        });
      }
      let weekEnds = Object.keys(userProfile?.availibility).filter(
        (item) => item === "sunday" || item === "saturday"
      );
      if (weekEnds) tempData.weekends.days = weekEnds;
      if (tempData?.weekends?.days.length) {
        userProfile?.availibility[tempData?.weekends?.days[0]]?.map((item) => {
          tempData.weekends.time_period[item?.time_period] = {
            start_time: item?.start_time,
            end_time: item?.end_time,
            min: tempData.weekends.time_period[item?.time_period].min,
            max: tempData.weekends.time_period[item?.time_period].max,
          };
        });
      }
    }
    setScheduleData(tempData);
  };

  useEffect(() => {
    dispatch(GetUserProfile());
    initialLoad();
    return () => {};
  }, []);

  return (
    <div class="sub_section_2">
      <SkipCaution
        show={skipModal}
        onHide={() => dispatch(toggleSkip(false))}
      />
      <ScheduleSubmitted
        show={submittedModal}
        onHide={() => {
          dispatch(toggleSubmitted(false));
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
                  <h5 class="steps mt_50">Steps {profileStep} of 2</h5>
                  <h3 class="doc_appointment_head">
                    {profileStep === 1
                      ? "Doctor Availbility and Fees"
                      : "Bank Details"}
                  </h3>

                  <Formik
                    initialValues={scheduleData}
                    enableReinitialize
                    onSubmit={submit}
                  >
                    {({ values, handleSubmit }) => (
                      <>
                        <div class="progress_box">
                          <div class="row">
                            <div class="col-md-3">
                              <h5 class="profile_milestone">
                                Profile Milestone
                              </h5>
                            </div>
                            <div class="col-md-8">
                              <ProgressBar
                                isLoading={false}
                                percent={calculate(values)}
                                size={"large"}
                                showInfo={true}
                              />
                              <h6 class="progress_bar_subtext">
                                Complete your profile for connect with patients
                              </h6>
                            </div>
                          </div>
                        </div>
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
                                onClick={(e) => handleSubmit(e)}
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
  const location = useLocation();
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
              navigate("/dashboard");
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
  const navigate = useNavigate();
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
              navigate("/details/schedule-payment");
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
const ScheduleSubmitted = (props) => {
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      dialogClassName="modal_350"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header class="modal_header" closeButton></Modal.Header>
      <Modal.Body>
        <center>
          <img src={BackGround.Sent}></img>
          <h3 className="details_submitted">Detials Submitted Successfully!</h3>
          <p className="submit_successfully_text">
            Our team will analyse the details and revert back in up to 3
            business days.
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="go_to_home"
          variant="primary"
          onClick={() => {
            navigate("/dashboard");
            props.onHide();
          }}
        >
          Go to Home Dashboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
