import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormikProvider, useFormik } from "formik";
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
  toggleProfileSuccess,
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
import {
  BankDetailsSchema,
  BasicInformationSchema,
  EducationalProfileSchema,
  ScheduleSchema,
  WorkProfileSchema,
} from "../../../Utilities/Schema";

// const calculatePercentage = (values) => {
//   let percent = 0;
//   try {
//     const tempObj = { ...ProfileEnum, ...ScheduleEnum, ...BankEnum };
//     const total = Object.keys(tempObj).length;
//     let currentFilled = 0;
//     Object.keys(tempObj).map((key) => {
//       if (!isEmpty(values[key])) {
//         currentFilled++;
//       }
//     });

//     percent = (100 * currentFilled) / total;
//     return parseInt(percent);
//   } catch (error) {
//     return 0;
//   }
// };
export function SetUpProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(ProfileEnum);
  const { profileStep, profileSuccessModal, skipModal, userProfile } =
    useSelector(({ ProfileSlice }) => ProfileSlice);

  const submit = (values) => {
    let tempData = { ...values };

    tempData.languages = values?.languages?.toString();
    if (values) tempData["deepIntegrate"] = true;
    if (profileStep === 1) {
      tempData["basic_information_done"] = 1;
    }
    if (profileStep === 2) {
      tempData["work_profile_done"] = 1;
    }
    if (profileStep === 3) {
      tempData["qualification_documents_done"] = 1;
    }
    dispatch(EditUserProfile(tempData)).then((res) => {
      if (res?.payload?.success) {
        if (profileStep === 3) {
          dispatch(toggleProfileSuccess(true));
        } else {
          dispatch(nextStep());
        }
      }
    });
  };
  const Form_1 = useFormik({
    initialValues: {
      image: profileData?.image,
      dob: profileData?.birthdate,
      gender: profileData?.gender,
      city_id: profileData?.city_id,
      state_id: profileData?.state_id,
    },
    enableReinitialize: true,
    validationSchema: BasicInformationSchema,
    onSubmit: submit,
  });
  const Form_2 = useFormik({
    initialValues: {
      speciality: profileData?.speciality,
      sub_speciality: profileData?.sub_speciality,
      experience: profileData?.experience,
      registration_number: profileData?.registration_number,
      languages: profileData?.languages,
    },
    enableReinitialize: true,
    validationSchema: WorkProfileSchema,
    onSubmit: submit,
  });
  const Form_3 = useFormik({
    initialValues: {
      qualification: profileData?.qualification,
      proof: profileData?.proof,
      signature: profileData?.signature,
    },
    enableReinitialize: true,
    validationSchema: EducationalProfileSchema,
    onSubmit: submit,
  });
  useEffect(() => {
    const intialSetup = () => {
      let tempProfile = { ...profileData };
      let tempProofs = [];
      let tempQualification = [];
      if (userProfile) {
        if (parseInt(userProfile?.basic_information_done)) {
          dispatch(nextStep(2));
        }
        if (parseInt(userProfile?.work_profile_done)) {
          dispatch(nextStep(3));
        }

        tempProfile.image = userProfile?.image;
        tempProfile.dob = userProfile?.birthdate;
        tempProfile.gender = userProfile?.gender;
        tempProfile.city_id = userProfile?.city_id;
        tempProfile.state_id = userProfile?.state_id;
        tempProfile.speciality = userProfile?.speciality_id;
        dispatch(
          SubSpecialityList({ speciality_id: userProfile?.speciality_id })
        );
        tempProfile.sub_speciality = userProfile?.sub_speciality_id;
        tempProfile.experience = userProfile?.experience;
        tempProfile.registration_number = userProfile?.registration_number;
        tempProfile.languages = [];
        if (typeof userProfile?.languages === "string") {
          tempProfile.languages = userProfile?.languages.split(",");
        } else {
          userProfile?.languages?.map((item) =>
            tempProfile.languages.push(item?.id)
          );
        }
        tempProfile.qualification = "";
        tempProfile.proof = "";

        if (userProfile?.qualifications?.length) {
          userProfile?.qualifications?.map((item) => {
            tempQualification.push({
              type: item?.qualification,
              file: item?.document,
            });
            return null;
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
            return null;
          });
          if (!isEmpty(tempProofs)) {
            tempProfile.proof = tempProofs;
          }
        }
        tempProfile.signature = userProfile?.signature;
        setProfileData(tempProfile);
      }
    };
    intialSetup();
    return () => {};
  }, [dispatch, userProfile]);

  useEffect(() => {
    dispatch(StateList());
    dispatch(CityList());
    dispatch(SpecialityList());
    dispatch(LanguageList());
    dispatch(QualificationList());
    dispatch(DocumentList());
    return () => {};
  }, []);

  return (
    <div class="sub_section_2">
      {skipModal && (
        <SkipCaution
          show={skipModal}
          onHide={() => dispatch(toggleSkip(false))}
        />
      )}
      {profileSuccessModal && (
        <ProfileSubmitted
          show={profileSuccessModal}
          onHide={(isCancled) => {
            dispatch(toggleProfileSuccess(false));
            dispatch(nextStep(1));
            isCancled && navigate("/dashboard");
          }}
        />
      )}
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
                    {profileStep === 1
                      ? "Basic Information"
                      : profileStep === 2
                      ? "Your Work Profile"
                      : profileStep === 3
                      ? "Your qualification and ID Proof"
                      : ""}
                  </h3>

                  {/* <Formik
                    initialValues={{ ...profileData }}
                    enableReinitialize
                    onSubmit={submit}
                  >
                    {({ values, handleSubmit }) => {
                      return (
                        <> */}
                  <div class="progress_box">
                    <div class="row">
                      <div class="col-md-3">
                        <h5 class="profile_milestone">Profile Milestone</h5>
                      </div>
                      <div class="col-md-8">
                        <ProgressBar
                          isLoading={false}
                          percent={userProfile?.profile_completed_percentage}
                          size={"large"}
                          showInfo={true}
                        />
                        <h6 class="progress_bar_subtext">
                          Complete your profile for connect with patients{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  {/* <form onSubmit={() => {}}> */}
                  {userProfile && (
                    <ProfileWizardForm
                      Form_1={Form_1}
                      Form_2={Form_2}
                      Form_3={Form_3}
                    />
                  )}

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
                          onClick={(e) => {
                            e.preventDefault();
                            if (profileStep === 1) {
                              Form_1.handleSubmit(e);
                            }
                            if (profileStep === 2) {
                              Form_2.handleSubmit(e);
                            }
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
                          onClick={Form_3.handleSubmit}
                        >
                          Submit
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {/* </form> */}
                  {/* </>
                      );
                    }}
                  </Formik> */}
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

  // const calculate = (values) => {
  //   let tempProfile = { ...ProfileEnum };
  //   tempProfile.dob = userProfile?.birthdate;
  //   tempProfile.gender = userProfile?.gender;
  //   tempProfile.image = userProfile?.image;
  //   tempProfile.city_id = userProfile?.city_id;
  //   tempProfile.state_id = userProfile?.state_id;
  //   tempProfile.speciality = userProfile?.speciality;
  //   tempProfile.sub_speciality = userProfile?.sub_speciality;
  //   tempProfile.experience = userProfile?.experience;
  //   tempProfile.registration_number = userProfile?.registration_number;
  //   tempProfile.languages = userProfile?.languages?.split(",");
  //   tempProfile.qualification = userProfile?.qualifications;
  //   tempProfile.proof = userProfile?.id_proofs;
  //   tempProfile.signature = userProfile?.signature;
  //   return calculatePercentage({ ...tempProfile, ...values });
  // };

  const submit = (values) => {
    if (profileStep == 1) {
      let tempValues = { ...values };
      tempValues.weekdays = JSON.stringify(values.weekdays);
      tempValues.weekends = JSON.stringify(values.weekends);
      tempValues.emergency_call = values?.emergency_call ? 1 : 0;
      tempValues["doctor_availablity_done"] = 1;
      dispatch(EditSchedule(tempValues)).then((res) => {
        if (res?.payload?.success) {
          dispatch(nextStep());
        }
      });
    } else if (profileStep === 2) {
      values["bank_details_done"] = 1;
      dispatch(EditBankDetails(values)).then((res) => {
        if (res?.payload?.success) {
          dispatch(toggleSubmitted(true));
        }
      });
    }
  };
  const ScheduleForm = useFormik({
    initialValues: ScheduleEnum,
    enableReinitialize: true,
    validationSchema: ScheduleSchema,
    onSubmit: submit,
  });
  const BankForm = useFormik({
    initialValues: BankEnum,
    enableReinitialize: true,
    validationSchema: BankDetailsSchema,
    onSubmit: submit,
  });

  const initialLoad = () => {
    let tempData = { ...scheduleData };
    tempData.account_holder_name =
      userProfile?.bank_details?.account_holder_name;
    tempData.account_number = userProfile?.bank_details?.account_number;
    tempData.confirm_account_number = userProfile?.bank_details?.account_number;
    tempData.ifsc_code = userProfile?.bank_details?.ifsc_code;
    tempData.upi_id = userProfile?.bank_details?.upi_id;

    if (userProfile?.availibility) {
      if (userProfile?.availibility?.weekdays) {
        tempData.weekdays.days = userProfile?.availibility?.weekdays?.days;
        if (userProfile?.availibility?.weekdays?.slot) {
          Object.keys(userProfile?.availibility?.weekdays?.slot)?.map(
            (item) => {
              let tempSlot = userProfile?.availibility?.weekdays?.slot[item];
              tempData.weekdays.time_period[item] = {
                start_time: tempSlot?.start_time,
                end_time: tempSlot?.end_time,
                slots: ScheduleEnum.weekdays.time_period[item].slots,
              };
            }
          );
        }
      }
      if (userProfile?.availibility?.weekends) {
        tempData.weekends.days = userProfile?.availibility?.weekends?.days;
        if (userProfile?.availibility?.weekends?.slot) {
          Object.keys(userProfile?.availibility?.weekends?.slot)?.map(
            (item) => {
              let tempSlot = userProfile?.availibility?.weekends?.slot[item];
              tempData.weekends.time_period[item] = {
                start_time: tempSlot?.start_time,
                end_time: tempSlot?.end_time,
                slots: ScheduleEnum.weekdays.time_period[item].slots,
              };
            }
          );
        }
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

                  {/* <Formik
                    initialValues={scheduleData}
                    validationSchema={ScheduleSchema}
                    enableReinitialize
                    onSubmit={submit}
                  > */}
                  {/* {({ values, handleSubmit }) => ( */}
                  <>
                    <div class="progress_box">
                      <div class="row">
                        <div class="col-md-3">
                          <h5 class="profile_milestone">Profile Milestone</h5>
                        </div>
                        <div class="col-md-8">
                          <ProgressBar
                            isLoading={false}
                            percent={userProfile?.profile_completed_percentage}
                            size={"large"}
                            showInfo={true}
                          />
                          <h6 class="progress_bar_subtext">
                            Complete your profile for connect with patients
                          </h6>
                        </div>
                      </div>
                    </div>
                    <ScheduleWizardForm
                      Form_1={ScheduleForm}
                      Form_2={BankForm}
                    />
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
                            type="button"
                            onClick={(e) => ScheduleForm.handleSubmit(e)}
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
                              BankForm.handleSubmit(e);
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
                  {/* )} */}
                  {/* </Formik> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileWizardForm({ Form_1, Form_2, Form_3 }) {
  const { profileStep } = useSelector(({ ProfileSlice }) => ProfileSlice);
  switch (profileStep) {
    case 1:
      return (
        <FormikProvider value={Form_1}>
          <BasicInformation />
        </FormikProvider>
      );
    case 2:
      return (
        <FormikProvider value={Form_2}>
          <WorkProfile />
        </FormikProvider>
      );
    case 3:
      return (
        <FormikProvider value={Form_3}>
          <EducationalProfile />
        </FormikProvider>
      );
    default:
      return <></>;
  }
}

function ScheduleWizardForm({ Form_1, Form_2 }) {
  const { profileStep } = useSelector(({ ProfileSlice }) => ProfileSlice);
  switch (profileStep) {
    case 1:
      return (
        <FormikProvider value={Form_1}>
          <SheduleInformation />
        </FormikProvider>
      );

    case 2:
      return (
        <FormikProvider value={Form_2}>
          <BankInformation />
        </FormikProvider>
      );

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
          <img alt="myImg" src={BackGround.Caution}></img>
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
      <Modal.Header
        class="modal_header"
        closeButton
        onClick={() => props.onHide(true)}
      ></Modal.Header>
      <Modal.Body>
        <center>
          <img alt="myImg" src={BackGround.Succcess}></img>
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
              props.onHide(false);
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
          <img alt="myImg" src={BackGround.Sent}></img>
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
            props.onHide();
          }}
        >
          Go to Home Dashboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
