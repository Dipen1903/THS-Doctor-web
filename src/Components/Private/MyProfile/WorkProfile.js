import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { ErrorMessage, FieldArray, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CityList,
  SubSpecialityList,
} from "../../../Store/Reducers/CommonReducer";
import FormControl from "../../Common/Forms/FormControl";
import { Icon, BackGround } from "../../../Utilities/Icons";
import FileUpload from "../../Common/Layouts/FileUpload";
import { isEmpty } from "../../../Utilities/Functions";
import { EditUserProfile } from "../../../Store/Reducers/ProfileReducer";
import { WorkProfileSettingSchema } from "../../../Utilities/Schema";
import Signature from "../../Common/Layouts/SignaturePad";
import Media from "../../Common/Layouts/Media";
function WorkProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    speciality: "",
    tempQualification: [],
    qualification: [],
    tempProof: [],
    proof: "",
    signature: "",
    registration_number: "",
    experience: "",
    languages: [],
  });
  const dispatch = useDispatch();
  const { CommonSlice, ProfileSlice } = useSelector((state) => state);
  const {
    stateList,
    cityList,
    specialityList,
    subSpecialityList,
    languageList,
    qualification,
    documentList,
  } = CommonSlice;
  const { userProfile } = ProfileSlice;
  const initialSetup = () => {
    try {
      let tempProfile = { ...profileData };
      let tempProofs = [];
      let tempQualification = [];
      tempProfile.city_id = userProfile?.city_id;
      tempProfile.state_id = userProfile?.state_id;
      dispatch(
        SubSpecialityList({ speciality_id: userProfile?.speciality_id })
      );
      tempProfile.speciality = userProfile?.speciality_id || "";
      // tempProfile.sub_speciality = userProfile?.sub_speciality_id || "";
      tempProfile.experience = userProfile?.experience;
      tempProfile.registration_number = userProfile?.registration_number;
      tempProfile.languages = [];

      userProfile?.languages.map((item) =>
        tempProfile.languages.push(item?.id)
      );

      tempProfile.qualification = "";
      tempProfile.proof = "";

      if (userProfile?.qualifications?.length) {
        userProfile?.qualifications?.map((item) => {
          tempQualification.push({
            type: item?.qualification,
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
        if (!isEmpty(tempProofs)) {
          tempProfile.proof = tempProofs;
        }
      }
      tempProfile.signature = userProfile?.signature;
      setProfileData(tempProfile);
      // console.log("tempProfiletempProfiletempProfiletempProfiletempProfiletempProfiletempProfiletempProfile", tempProfile);
    } catch (error) { }
  };
  const handleSignature = (e, setFieldValue) => {
    let file = e?.target?.files[0];
    if (file) {
      setFieldValue(`signature`, file);
    }
  };
  useEffect(() => {
    initialSetup();
    return () => { };
  }, [userProfile]);

  return (
    <div className="col-md-12">
      <Formik
        initialValues={profileData}
        enableReinitialize
        validationSchema={WorkProfileSettingSchema}
        onSubmit={(values) => {
          let tempData = { ...values };
          if (values?.languages) {
            tempData.languages = values?.languages?.toString();
          }
          tempData["deepIntegrate"] = true;
          dispatch(EditUserProfile(tempData)).then((res) => {
            if (res?.payload?.success) {
              setIsEdit(true);
              initialSetup();
            }
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (

          <form onSubmit={handleSubmit}>
            <div className="work_profile_card_head">
              <div className="d-flex">
                <div className="col-md-6">
                  <h3 className="work_profile_title">Work Profile</h3>
                </div>
                <div className="col-md-6 ml_10">
                  {!isEdit && (
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEdit(true);
                      }}
                      className="personal_profile_btn float_right"
                    >
                      <img alt="myImg" src={Icon.Pencil} />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="work_profile_card_body">
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 mt_20">
                      <FormControl
                        control="select"
                        options={[...specialityList]}
                        isDisabled={true}
                        setFieldValue={setFieldValue}
                        value={values.speciality}
                        iconHide={true}
                        isSearchable={true}
                        defaultValue=""
                        name="speciality"
                        onChange={(value) => {
                          // setFieldValue("sub_speciality", "");
                          // dispatch(SubSpecialityList({ speciality_id: value }));
                        }}
                        label="Your Speciality"
                        outerClass="mb-3"
                      />
                      <ErrorMessage
                        component={({ children }) => (
                          <div className="error">{children}</div>
                        )}
                        name={"speciality"}
                      />
                    </div>
                    {/* <div className="col-md-12 mt_20">
                      {subSpecialityList?.length ? (
                        <div className="row">
                          <div className="col-md-12">
                            <FormControl
                              control="select"
                              options={[
                                { value: "", label: "Your sub speciality" },
                                ...subSpecialityList,
                              ]}
                              isDisabled={true}
                              setFieldValue={setFieldValue}
                              value={values.sub_speciality}
                              iconHide={true}
                              isSearchable={true}
                              name="sub_speciality"
                              onChange={() => {}}
                              label="Sub Speciality"
                              outerClass="mb-3"
                            />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt_20">
                      <FormControl
                        control="input"
                        type="number"
                        disabled={!isEdit}
                        key="experience"
                        label="Year Experience*"
                        id="experience"
                        name="experience"
                        min={0}
                        max={99}
                        onChange={(e) => {
                          let num = e.target.value;
                          if (num < 99 && num > -1)
                            setFieldValue("experience", num);
                        }}
                        onBlur={handleBlur}
                        value={values?.experience}
                      />
                    </div>
                    <div className="col-md-12 mt_20">
                      <FormControl
                        control="input"
                        type="text"
                        disabled
                        key="registration_number"
                        label="Registration Number"
                        id="registration_number"
                        name="registration_number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.registration_number}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt_20">
                      <FormControl
                        control="select"
                        options={[{ value: "", label: "Select" }, ...cityList]}
                        setFieldValue={setFieldValue}
                        value={values?.city_id}
                        isDisabled={!isEdit}
                        name="city_id"
                        iconHide={true}
                        onChange={(value) => {
                          let city = cityList.find(
                            (item) => item?.value === value
                          );
                          setFieldValue("state_id", city?.state_id);
                        }}
                        label="City"
                        outerClass="mb-3"
                      />
                    </div>
                    <div className="col-md-6 mt_20">
                      <FormControl
                        control="select"
                        options={[{ value: "", label: "Select" }, ...stateList]}
                        setFieldValue={setFieldValue}
                        name="state_id"
                        isDisabled={!isEdit}
                        onChange={(value) => {
                          setFieldValue("city_id", "");
                          dispatch(CityList({ state_id: value }));
                        }}
                        iconHide={true}
                        value={values?.state_id}
                        label="State"
                        outerClass="mb-3"
                      />
                    </div>
                  </div>
                  <div className="row mb_10 mt_20">
                    {isEdit ? (
                      <div className="col-md-12">
                        <FormControl
                          control="select"
                          label="Language"
                          options={languageList?.length ? languageList : []}
                          isMulti={true}
                          placeholder="Search"
                          isSearchable={true}
                          onChange={() => { }}
                          name="languages"
                          id="languages"
                          className="mb-4"
                          value={values.languages}
                          setFieldValue={setFieldValue}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />
                        <ErrorMessage
                          component={({ children }) => (
                            <div className="error">{children}</div>
                          )}
                          name={"languages"}
                        />
                      </div>
                    ) : (
                      <div className="col-md-12">
                        <label className="sign_title"> Language </label>
                        <div className="mt_10">
                          {values?.languages?.map((item) => (
                            <span className="work_profile_tag_box mr_10 mt_">
                              {
                                languageList?.find(
                                  (lang) =>
                                    parseInt(lang?.value) === parseInt(item)
                                )?.label
                              }
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="work_profile_card_body_1">
              <div className="row">
                <div className="col-md-7">
                  <h3 className="work_profile_title_qualification">
                    Qualification
                  </h3>
                  {isEdit ? (
                    <div className="row mt_20">
                      <FieldArray
                        name="qualification"
                        render={(arrayHelpers) => {
                          const selecteValue = (value, options) => {
                            let outerItem = value[value?.length - 1];
                            let tempObj = options?.find(
                              (item) =>
                                item.value.toString() === outerItem.toString()
                            );
                            if (tempObj) {
                              arrayHelpers.push({
                                id: tempObj?.value,
                                type: tempObj?.label,
                                file: "",
                              });
                            }
                          };
                          const handleImage = (e, i) => {
                            let file = e?.target?.files[0];
                            if (file) {
                              setFieldValue(`qualification[${i}].file`, file);
                            }
                          };
                          const removeValue = (i) => {
                            let tempValues = values?.tempQualifications;
                            tempValues?.splice(i, 1);
                          };
                          return (
                            <>
                              <div className="row mt_20">
                                <div className="col-md-12">
                                  <FormControl
                                    control="select"
                                    label="Qualification"
                                    options={
                                      qualification?.length ? qualification : []
                                    }
                                    isMulti={true}
                                    displayTag={false}
                                    onChange={(value) =>
                                      selecteValue(value, qualification)
                                    }
                                    placeholder="Search"
                                    name="tempQualifications"
                                    id="tempQualifications"
                                    className="mb-4"
                                    value={values.tempQualifications}
                                    setFieldValue={setFieldValue}
                                    onBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    isSearchable={true}
                                  />
                                </div>
                              </div>
                              {values?.qualification?.length ? (
                                <>
                                  <div className="row mt_20">
                                    <h3 className="added_qualifications">
                                      Added qualification
                                    </h3>
                                  </div>
                                  {values?.qualification &&
                                    values?.qualification?.map(
                                      (item, index) => (
                                        <div className="row mt_20">
                                          <div className="col-md-6">
                                            <h5 className="qualification_text">
                                              {item?.type}
                                            </h5>
                                            <h5
                                              className="remove_title"
                                              onClick={(e) => {
                                                arrayHelpers.remove(index);
                                                removeValue(index);
                                              }}
                                            >
                                              Remove
                                            </h5>
                                          </div>
                                          <div className="col-md-6">
                                            {values?.qualification?.length &&
                                              values?.qualification[index]
                                                ?.file ? (
                                              <div className="row col-md-12">
                                                <div className="col-md-6">
                                                  <Media
                                                    src={
                                                      values.qualification[
                                                        index
                                                      ]?.file
                                                    }
                                                  />
                                                </div>
                                                <div className="col-md-6">
                                                  <h5 className="certificate_name">
                                                    {
                                                      values.qualification[
                                                        index
                                                      ]?.file?.name
                                                    }
                                                  </h5>
                                                  <h6
                                                    className="delete_photo"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      setFieldValue(
                                                        `qualification[${index}].file`,
                                                        ""
                                                      );
                                                    }}
                                                  >
                                                    Delete Photo
                                                  </h6>
                                                </div>
                                              </div>
                                            ) : (
                                              <FileUpload
                                                label="Attach File"
                                                icon={Icon.Attach}
                                                className="attach_certificate"
                                                name={`qualification[${index}].file`}
                                                id={`qualification[${index}].file`}
                                                isPdf={true}
                                                value={
                                                  values.qualification[index]
                                                    ?.file
                                                }
                                                onChange={(e) =>
                                                  handleImage(e, index)
                                                }
                                              />
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        }}
                      />
                      <ErrorMessage
                        component={({ children }) => (
                          <div className="error">{children}</div>
                        )}
                        name="qualification"
                      />
                    </div>
                  ) : (
                    <div className="row mt_20">
                      {values?.qualification?.length ? (
                        <>
                          {values?.qualification?.map((item, index) => (
                            <div key={index} className="col-md-4">
                              {/* {console.log("values?.qualificationvalues?.qualification",values)} */}
                              <h3 className="qualification_title">
                                {item?.type}
                              </h3>
                              <a href={item?.file} target="_blank">
                                <img
                                  alt="myImg"
                                  className="qualification_file"
                                  src={
                                    item?.file.includes("pdf")
                                      ? Icon.Doc
                                      : item?.file
                                  }
                                />
                              </a>
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="work_profile_card_body_1">
              <div className="row">
                <div className="col-md-7">
                  <h3 className="work_profile_title_upload_id">
                    Upload ID Proof Document
                  </h3>
                  {isEdit ? (
                    <div className="row mt_30">
                      {" "}
                      <FieldArray
                        name="proof"
                        render={(arrayHelpers) => {
                          const selecteValue = (value, options) => {
                            let outerItem = value;
                            let tempObj = options?.find(
                              (item) =>
                                item.value.toString() === outerItem.toString()
                            );
                            if (tempObj) {
                              if (tempObj.isBackSide) {
                                arrayHelpers.push({
                                  id: tempObj?.value,
                                  type: tempObj?.label + " Front",
                                  file: "",
                                });
                                arrayHelpers.push({
                                  id: tempObj?.value,
                                  type: tempObj?.label + " Back",
                                  file: "",
                                });
                              } else {
                                arrayHelpers.push({
                                  id: tempObj?.value,
                                  type: tempObj?.label,
                                  file: "",
                                });
                              }
                            }
                          };
                          const handleImage = (e, i) => {
                            let file = e?.target?.files[0];
                            if (file) {
                              setFieldValue(`proof[${i}].file`, file);
                            }
                          };
                          const removeValue = (i) => {
                            setFieldValue("proof", "");
                            setFieldValue("tempProof", "");
                          };
                          return (
                            <>
                              <div className="row mt_20">
                                <div className="col-md-12">
                                  <FormControl
                                    control="select"
                                    label="Select Document"
                                    options={
                                      documentList?.length
                                        ? [
                                          {
                                            value: "",
                                            label: "Select document",
                                          },
                                          ...documentList,
                                        ]
                                        : []
                                    }
                                    isSearchable={true}
                                    displayTag={false}
                                    isMulti={false}
                                    onChange={(value) => {
                                      setFieldValue("proof", "");
                                      selecteValue(value, documentList);
                                    }}
                                    placeholder="Select document"
                                    name="tempProof"
                                    id="tempProof"
                                    className="mb-4"
                                    value={values.tempProof}
                                    setFieldValue={setFieldValue}
                                    onBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                  />
                                </div>
                              </div>

                              {values?.proof?.length ? (
                                <>
                                  {values?.proof?.map((item, index) => (
                                    <div className="row mt_20">
                                      <div className="col-md-6">
                                        <h5 className="qualification_text">
                                          {item?.type}
                                        </h5>
                                        <h5
                                          className="remove_title"
                                          onClick={(e) => {
                                            arrayHelpers.remove(index);
                                            removeValue(index);
                                          }}
                                        >
                                          Remove
                                        </h5>
                                      </div>
                                      <div className="col-md-6">
                                        {values?.proof.length &&
                                          values?.proof[index]?.file ? (
                                          <div className="row col-md-12">
                                            <div className="col-md-6">
                                              <Media
                                                src={values.proof[index]?.file}
                                              />
                                            </div>
                                            <div className="col-md-6">
                                              <h5 className="certificate_name" style={{textOverflow: "ellipsis"}}>
                                                {
                                                  values.proof[index]?.file
                                                    ?.name
                                                }
                                              </h5>
                                              <h6
                                                className="delete_photo"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  setFieldValue(
                                                    `proof[${index}].file`,
                                                    ""
                                                  );
                                                }}
                                              >
                                                Delete Photo
                                              </h6>
                                            </div>
                                          </div>
                                        ) : (
                                          <FileUpload
                                            label="Attach File"
                                            icon={Icon.Attach}
                                            isPdf={true}
                                            className="attach_certificate"
                                            name={`proof[${index}].file`}
                                            id={`proof[${index}].file`}
                                            value={values.proof[index]?.file}
                                            onChange={(e) =>
                                              handleImage(e, index)
                                            }
                                          />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        }}
                      />
                      <ErrorMessage
                        component={({ children }) => (
                          <div className="error">{children}</div>
                        )}
                        name="proof"
                      />
                    </div>
                  ) : (
                    <div className="row mt_30">
                      {values?.proof && (
                        <>
                          {values?.proof?.map((item, index) => (
                            <div key={index} className="col-md-4">
                              <h3 className="qualification_title">
                                {item?.type}
                              </h3>
                              <img
                                alt="myImg"
                                className="qualification_file"
                                src={item?.file}
                              />
                            </div>
                          ))}
                          <div className="col-md-4">
                            <h3 className="qualification_title">Signature</h3>
                            <img
                              alt="myImg"
                              className="qualification_file"
                              src={values?.signature}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isEdit && (
              <div className="work_profile_card_body_1">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="work_profile_title_upload_id">
                      Upload Signature
                    </h3>
                  </div>
                  <div className="col-md-6">
                    {values?.signature ? (
                      <div className="row col-md-12">
                        <div className="col-md-6">
                          {/* {console.log("values.signature", values.signature)} */}
                          <img
                            alt="myImg"
                            src={
                              typeof values.signature === "object"
                                ? URL.createObjectURL(values.signature)
                                : values.signature
                                  ? values.signature
                                  : BackGround.Profile
                            }
                            className="upload_avatar_img"
                          ></img>
                        </div>
                        <div className="col-md-6">
                          <h5 className="certificate_name">
                            {values.signature?.name}
                          </h5>
                          <h6
                            className="delete_photo"
                            onClick={(e) => {
                              e.preventDefault();
                              setFieldValue(`signature`, "");
                            }}
                          >
                            Delete Photo
                          </h6>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex gap-2">
                        <Signature
                          label="Create"
                          className="attach_certificate"
                          name="signature"
                          id="signature"
                          value={values.signature}
                          onChange={(file) => setFieldValue(`signature`, file)}
                        />
                        <FileUpload
                          label="Upload"
                          className="attach_certificate"
                          name="signature"
                          id="signature"
                          value={values.signature}
                          onChange={(e) => handleSignature(e, setFieldValue)}
                        />
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    component={({ children }) => (
                      <div className="error">{children}</div>
                    )}
                    name="signature"
                  />
                </div>
              </div>
            )}
            {isEdit && (
              <div className="work_profile_card_body_1">
                <div className="row">
                  <div className="col-md-9">
                    <button
                      type="submit"
                      className="edit_profile_save_btn"
                      variant="primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default WorkProfile;
