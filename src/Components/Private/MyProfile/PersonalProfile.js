import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import { BackGround, Icon } from "../../../Utilities/Icons";
import { useDispatch, useSelector } from "react-redux";
import { ProfileEnum } from "../../../Utilities/Enums";
import { PersonalProfileSchema } from "../../../Utilities/Schema";
import FileUpload from "../../Common/Layouts/FileUpload";
import FormControl from "../../Common/Forms/FormControl";
import { EditUserProfile } from "../../../Store/Reducers/ProfileReducer";

function PersonalProfile() {
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    gender: "",
    image: "",
  });
  const [localImage, setLocalImage] = useState();

  const handleImage = (e, setFieldValue) => {
    let file = e?.target?.files[0];
    if (file) {
      setFieldValue("image", file);
      setLocalImage(file);
    }
  };
  const intialSetup = () => {
    try {
      let tempData = { ...profileData };
      tempData.first_name = userProfile?.first_name;
      tempData.last_name = userProfile?.last_name;
      tempData.dob = userProfile?.birthdate;
      tempData.gender = userProfile?.gender;
      tempData.email = userProfile?.email;
      tempData.image = userProfile?.image;
      setProfileData(tempData);
    } catch (error) {}
  };
  useEffect(() => {
    intialSetup();
    return () => {};
  }, [userProfile]);

  return (
    <>
      <div className="personal_profile_card_head">
        <div className="d-flex justify-content-between">
          <div className="col-md-6">
            <h3 className="personal_profile_title">Personal Profile</h3>
          </div>
          <div className="col-md-6 ml_10 ">
            {!isEdit && (
              <Button
                variant="primary"
                className="personal_profile_btn float_right"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit(true);
                }}
              >
                <img src={Icon.Pencil} />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
      <Formik
        initialValues={profileData}
        validationSchema={PersonalProfileSchema}
        enableReinitialize
        onSubmit={(values) =>
          dispatch(EditUserProfile(values)).then((res) => {
            if (res.payload.success) {
              setIsEdit(false);
            }
          })
        }
      >
        {({
          values,
          setFieldValue,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="personal_profile_card_body">
              <div className="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-3">
                          <center>
                            <img
                              src={
                                (localImage &&
                                  URL.createObjectURL(localImage)) ||
                                values?.image ||
                                BackGround.Profile
                              }
                              class="upload_avatar_img"
                            ></img>
                          </center>
                        </div>
                        {isEdit && (
                          <>
                            <div class="col-md-9">
                              <div class="wrapper">
                                <FileUpload
                                  className="upload_avatar_btn"
                                  label="Upload Your Avatar"
                                  id="upload_avatar"
                                  name="image"
                                  onChange={(e) => {
                                    handleImage(e, setFieldValue);
                                  }}
                                />
                              </div>
                              <div
                                class="custom-file-container"
                                data-upload-id="myFirstImage"
                              ></div>
                              <p className="upload_avatar_subtitle">
                                Your avatar should is a friendly and inviting
                                head shot. Clearly indentifiable as you.
                              </p>
                            </div>
                            <ErrorMessage
                              name="image"
                              render={(error) => (
                                <div className="error">{error}</div>
                              )}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div class="col-md-6 mt_20">
                      <FormControl
                        control="input"
                        type="text"
                        name="first_name"
                        id="first_name"
                        label="First Name"
                        disabled={!isEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                      />
                    </div>
                    <div class="col-md-6 mt_20">
                      <FormControl
                        control="input"
                        type="text"
                        name="last_name"
                        id="last_name"
                        label="Last Name"
                        disabled={!isEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 mt_20">
                      <FormControl
                        control="input"
                        type="email"
                        name="email"
                        id="email"
                        label="Email"
                        disabled={!isEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </div>
                    <div class="col-md-12 mt_20">
                      <label className="sign_title form-label">Birthday</label>
                      <FormControl
                        control="input"
                        type="date"
                        id="dob"
                        name="dob"
                        disabled={!isEdit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.dob}
                      />
                    </div>
                    <div class="col-md-12 mt_20 ">
                      <h5 className="sign_title">Gender</h5>
                      {/* <Field name="gender" validate={validateGender} hidden /> */}
                      <div class="col-md-3 radio-container mt_20 mb_20">
                        {(isEdit || values?.gender == "male") && (
                          <div
                            className={`radio_box ${
                              values?.gender == "male" && "selected"
                            }`}
                          >
                            <label htmlFor={"male"}>
                              <img
                                src={
                                  values?.gender == "male"
                                    ? Icon.MaleWhite
                                    : Icon.MaleGrey
                                }
                                alt="male"
                              />
                            </label>
                            <span className={"gender_title"}>Male</span>
                            <input
                              hidden
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              onChange={handleChange}
                            />
                          </div>
                        )}
                        {(isEdit || values?.gender == "female") && (
                          <div
                            className={`radio_box ${
                              values?.gender == "female" && "selected"
                            }`}
                          >
                            <label htmlFor={"female"}>
                              <img
                                src={
                                  values?.gender == "female"
                                    ? Icon.FemaleWhite
                                    : Icon.FemaleGray
                                }
                                alt="male"
                              />
                            </label>
                            <span className={"gender_title"}>Female</span>
                            <input
                              hidden
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              onChange={handleChange}
                            />
                          </div>
                        )}
                      </div>
                      <ErrorMessage
                        name="gender"
                        render={(error) => <div className="error">{error}</div>}
                      />
                    </div>
                  </div>
                  {isEdit && (
                    <button
                      type="submit"
                      class="edit_profile_save_btn"
                      variant="primary"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default PersonalProfile;
