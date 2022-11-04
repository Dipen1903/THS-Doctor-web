import { ErrorMessage, FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetRejectionDetails,
  ReverifyUserProfile,
} from "../../../Store/Reducers/ProfileReducer";
import { RejectedProfileEnum } from "../../../Utilities/Enums";
import { isEmpty } from "../../../Utilities/Functions";
import { BackGround, Icon } from "../../../Utilities/Icons";
import {
  ResetProfileSchema,
  validateAcccountNumber,
  validateConfirmAcccountNumber,
  validateIFSC,
} from "../../../Utilities/Schema";
import FormControl from "../../Common/Forms/FormControl";
import FileUpload from "../../Common/Layouts/FileUpload";
import {
  DocumentList,
  QualificationList,
} from "../../../Store/Reducers/CommonReducer";
import Signature from "../../Common/Layouts/SignaturePad";

function ResetProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, rejectionDetails } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  const { qualification, documentList } = useSelector(
    ({ CommonSlice }) => CommonSlice
  );
  const [profileData, setProfileData] = useState({ ...RejectedProfileEnum });
  const [rejectedFields, setRejectedFields] = useState([]);
  const [localImage, setLocalImage] = useState();

  const handleImage = (e, setFieldValue) => {
    let file = e?.target?.files[0];
    if (file) {
      setFieldValue("image", file);
      setLocalImage(file);
    }
  };

  const validateImage = (value) => {
    let errorMessage;
    if (isEmpty(value)) {
      errorMessage = "Please upload your image";
    }
    return errorMessage;
  };
  const handleSignature = (e, setFieldValue) => {
    let file = e?.target?.files[0];
    if (file) {
      setFieldValue(`signature`, file);
    }
  };
  const intialLoad = () => {
    try {
      let tempData = { ...profileData };
      let tempProofs = [];
      let tempQualification = [];
      tempData.account_holder_name =
        userProfile?.bank_details?.account_holder_name;
      tempData.account_number = userProfile?.bank_details?.account_number;
      tempData.ifsc_code = userProfile?.bank_details?.ifsc_code;
      tempData.registration_number = userProfile?.registration_number;
      tempData.qualification = "";
      tempData.proof = "";

      if (userProfile?.qualifications?.length) {
        userProfile?.qualifications?.map((item) =>
          tempQualification.push({
            type: item?.qualification,
            file: item?.document,
          })
        );
        if (!isEmpty(tempQualification))
          tempData.qualification = tempQualification;
      }

      if (userProfile?.id_proofs?.length) {
        userProfile?.id_proofs?.map((item) =>
          tempProofs.push({
            type: item?.id_proof,
            file: item?.document,
          })
        );
        if (!isEmpty(tempProofs)) {
          tempData.proof = tempProofs;
        }
      }
      tempData.signature = userProfile?.signature;
      setProfileData(tempData);
    } catch (error) {}
  };
  useEffect(() => {
    !qualification.length && dispatch(QualificationList());
    !documentList.length && dispatch(DocumentList());
    return () => {};
  }, []);
  useEffect(() => {
    userProfile && intialLoad();
    return () => {};
  }, [userProfile]);

  useEffect(() => {
    if (rejectionDetails?.type) {
      setRejectedFields(rejectionDetails?.type.split(","));
    } else {
      dispatch(GetRejectionDetails());
    }
    return () => {};
  }, [rejectionDetails]);

  return (
    <Container fluid className="reupload_details_container">
      <h2 className="reupload_details_title mb_10 mt_20">
        Reuplaod Required Details
      </h2>
      <Formik
        initialValues={profileData}
        enableReinitialize
        validationSchema={ResetProfileSchema}
        onSubmit={(values) => {
          let tempValues = { ...values };
          tempValues["deepIntegrate"] = true;
          dispatch(ReverifyUserProfile(tempValues));
          navigate("/dashboard");
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
            {rejectedFields.map((item) => (
              <div className="col-md-6">
                {item === "registration number" && (
                  <div className="col-md-12">
                    <h5 className="reupload_detals_pretitle mt-5">
                      Registration Number
                    </h5>
                    <FormControl
                      control="input"
                      type="text"
                      key="registration_number"
                      label="Registration Number"
                      id="registration_number"
                      name="registration_number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.registration_number}
                    />
                  </div>
                )}
                {item === "bank details" && (
                  <div className="col-md-12">
                    <h5 className="reupload_detals_pretitle mt-5">
                      Bank Details
                    </h5>
                    <div className="row">
                      <div className="col-md-12 mt_20">
                        <FormControl
                          control="input"
                          type="text"
                          label="Account Holder Name*"
                          name="account_holder_name"
                          id="account_holder_name"
                          value={values?.account_holder_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="row mt_20">
                      <div className="col-md-12 mt_20">
                        <FormControl
                          control="input"
                          type="password"
                          iconHide={true}
                          label="Account Number*"
                          name="account_number"
                          id="account_number"
                          value={values?.account_number}
                          onChange={handleChange}
                          validate={validateAcccountNumber}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="row mt_20">
                      <div className="col-md-12 mt_20">
                        <FormControl
                          control="input"
                          type="text"
                          label="Confirm Account Number*"
                          name="confirm_account_number"
                          id="confirm_account_number"
                          value={values?.confirm_account_number}
                          onChange={handleChange}
                          validate={validateConfirmAcccountNumber}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="row mt_20">
                      <div className="col-md-12 mt_20">
                        <FormControl
                          control="input"
                          type="text"
                          label="IFSC Code*"
                          name="ifsc_code"
                          id="ifsc_code"
                          value={values?.ifsc_code}
                          validate={validateIFSC}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {item === "profile" && (
                  <div className="col-md-12">
                    <h5 className="reupload_detals_pretitle mt-5">Profile</h5>
                    <div className="row">
                      <div className="col-md-3">
                        <center>
                          <img
                            alt="myImg"
                            src={
                              (localImage && URL.createObjectURL(localImage)) ||
                              values?.image ||
                              BackGround.Profile
                            }
                            className="upload_avatar_img"
                          ></img>
                        </center>
                      </div>
                      <div className="col-md-9">
                        <div className="wrapper">
                          <FileUpload
                            className="upload_avatar_btn"
                            label="Upload Your Avatar"
                            id="upload_avatar"
                            name="image"
                            onChange={(e) => {
                              handleImage(e, setFieldValue);
                            }}
                            validate={validateImage}
                          />
                        </div>
                        <div
                          className="custom-file-container"
                          data-upload-id="myFirstImage"
                        ></div>
                        <p className="upload_avatar_subtitle">
                          Your avatar should is a friendly and inviting head
                          shot. Clearly indentifiable as you.
                        </p>
                      </div>
                      <ErrorMessage
                        name="image"
                        render={(error) => <div className="error">{error}</div>}
                      />
                    </div>
                  </div>
                )}
                {item === "qualification" && (
                  <div className="col-md-12">
                    <h5 className="reupload_detals_pretitle mt-5">
                      Qualification
                    </h5>
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
                                {values?.qualification?.map((item, index) => (
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
                                      values?.qualification[index]?.file ? (
                                        <div className="row col-md-12">
                                          <div className="col-md-6">
                                            <img
                                              alt="myImg"
                                              src={
                                                values.qualification[index]
                                                  ?.file
                                                  ? typeof values.qualification[
                                                      index
                                                    ]?.file === "object"
                                                    ? URL.createObjectURL(
                                                        values.qualification[
                                                          index
                                                        ]?.file
                                                      )
                                                    : values.qualification[
                                                        index
                                                      ]?.file
                                                  : BackGround.Profile
                                              }
                                              className="upload_avatar_img"
                                            ></img>
                                          </div>
                                          <div className="col-md-6">
                                            <h5 className="certificate_name">
                                              {
                                                values.qualification[index]
                                                  ?.file?.name
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
                                          isPdf={true}
                                          className="attach_certificate"
                                          name={`qualification[${index}].file`}
                                          id={`qualification[${index}].file`}
                                          value={
                                            values.qualification[index]?.file
                                          }
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
                      name="qualification"
                    />
                  </div>
                )}
                {item === "signature" && (
                  <div className="col-md-12">
                    <h5 className="reupload_detals_pretitle mt-5">Signature</h5>
                    <div className="col-md-6">
                      {values?.signature ? (
                        <div className="row col-md-12">
                          <div className="col-md-6">
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
                        <Signature
                          label="Create signature"
                          className="attach_certificate"
                          name="signature"
                          id="signature"
                          value={values.signature}
                          onChange={(file) => setFieldValue(`signature`, file)}
                        />
                      )}
                    </div>
                    <ErrorMessage
                      component={({ children }) => (
                        <div className="error">{children}</div>
                      )}
                      name="signature"
                    />
                  </div>
                )}
                {item === "id proof" && (
                  <div className="col-md-12">
                    <h5 className="reupload_detals_pretitle mt-5">ID Proof</h5>
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
                                            <img
                                              alt="myImg"
                                              src={
                                                values.proof[index]?.file
                                                  ? typeof values.proof[index]
                                                      ?.file === "object"
                                                    ? URL.createObjectURL(
                                                        values.proof[index]
                                                          ?.file
                                                      )
                                                    : values.proof[index]?.file
                                                  : BackGround.Profile
                                              }
                                              className="upload_avatar_img"
                                            ></img>
                                          </div>
                                          <div className="col-md-6">
                                            <h5 className="certificate_name">
                                              {values.proof[index]?.file?.name}
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
                )}
              </div>
            ))}
            <div className="row mt_10">
              <button
                className="submit_save_btn"
                type="submit"
                variant="primary"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default ResetProfile;
