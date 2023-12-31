import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormikContext, FieldArray, ErrorMessage } from "formik";
import { BackGround, Icon } from "../../../../Utilities/Icons";
import FormControl from "../../../Common/Forms/FormControl";
import FileUpload from "../../../Common/Layouts/FileUpload";
import Signature from "../../../Common/Layouts/SignaturePad";
import Media from "../../../Common/Layouts/Media";

export default function EducationalProfile({ formProps }) {
  const { values, errors, touched, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const { qualification, documentList } = useSelector(
    ({ CommonSlice }) => CommonSlice
  );
  const handleSignature = (e) => {
    let file = e?.target?.files[0];
    if (file) {
      setFieldValue(`signature`, file);
    }
  };

  return (
    <>
      <div className="basic_info_form_box">
        {/*//* CERTIFICATE SECTION */}
        <FieldArray
          name="qualification"
          render={(arrayHelpers) => {
            const selecteValue = (value, options) => {
              let outerItem = value[value?.length - 1];
              let tempObj = options?.find(
                (item) => item.value.toString() === outerItem.toString()
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
                      options={qualification?.length ? qualification : []}
                      isMulti={true}
                      displayTag={false}
                      onChange={(value) => selecteValue(value, qualification)}
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
                          <h5 className="qualification_text">{item?.type}</h5>
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
                                <Media
                                  src={values.qualification[index]?.file}
                                />
                              </div>
                              <div className="col-md-6">
                                <h5 className="certificate_name">
                                  {values.qualification[index]?.file?.name}
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
                              value={values.qualification[index]?.file}
                              onChange={(e) => handleImage(e, index)}
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
          component={({ children }) => <div className="error">{children}</div>}
          name="qualification"
        />

        <hr className="bottom_border mt_50 mb_50" />
        {/*//* DOCUMENT SECTION */}
        <div className="row">
          <div className="col-md-12">
            <h3 className="id_proof_doc">Upload ID Proof Document</h3>
          </div>
        </div>
        <FieldArray
          name="proof"
          render={(arrayHelpers) => {
            const selecteValue = (value, options) => {
              let outerItem = value;
              let tempObj = options?.find(
                (item) => item.value.toString() === outerItem.toString()
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
                              { value: "", label: "Select document" },
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
                          <h5 className="qualification_text">{item?.type}</h5>
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
                                <Media src={values.proof[index]?.file} />
                              </div>
                              <div className="col-md-6">
                                <h5 className="certificate_name">
                                  {values.proof[index]?.file?.name}
                                </h5>
                                <h6
                                  className="delete_photo"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setFieldValue(`proof[${index}].file`, "");
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
                              isPdf={true}
                              name={`proof[${index}].file`}
                              id={`proof[${index}].file`}
                              value={values.proof[index]?.file}
                              onChange={(e) => handleImage(e, index)}
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
          component={({ children }) => <div className="error">{children}</div>}
          name="proof"
        />
        <hr className="bottom_border mt_50 mb_50" />
        <div className="row">
          <div className="col-md-6">
            <h5 className="upload_signature">Upload Signature</h5>
          </div>
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
                  <h5 className="certificate_name">{values.signature?.name}</h5>
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
    </>
  );
}
