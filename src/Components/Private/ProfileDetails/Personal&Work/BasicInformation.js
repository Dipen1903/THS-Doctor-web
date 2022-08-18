import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { ErrorMessage, useFormikContext } from "formik";
import { useSelector } from "react-redux";

import { BackGround, Icon } from "../../../../Utilities/Icons";
import FileUpload from "../../../Common/Layouts/FileUpload";
import FormControl from "../../../Common/Forms/FormControl";

export default function BasicInformation() {
  const { values, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const { CommonSlice } = useSelector((state) => state);
  const { stateList, cityList } = CommonSlice;

  const [localImage, setLocalImage] = useState();

  const handleImage = (e, setFieldValue) => {
    let file = e?.target?.files[0];
    if (file) {
      setFieldValue("image", file);
      setLocalImage(file);
    }
  };

  return (
    <>
      <div class="basic_info_form_box">
        <div class="row">
          <div class="col-md-3">
            <center>
              <img
                src={
                  (localImage && URL.createObjectURL(localImage)) ||
                  values?.image ||
                  BackGround.Profile
                }
                class="upload_avatar_img"
              ></img>
            </center>
          </div>
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
              Your avatar should is a friendly and inviting head shot. Clearly
              indentifiable as you.
            </p>
          </div>
          <ErrorMessage
            name="image"
            render={(error) => <div className="error">{error}</div>}
          />
        </div>
        <div class="row mt_20">
          <div class="col-md-12">
            <label className="sign_title form-label">Birthday</label>
            <FormControl
              control="input"
              type="date"
              id="dob"
              name="dob"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.dob}
            />
          </div>
        </div>
        <div class="row mt_20">
          <div class="col-md-6">
            <FormControl
              control="select"
              options={[{ value: "", label: "Select" }, ...stateList]}
              setFieldValue={setFieldValue}
              name="state_id"
              onChange={() => {}}
              iconHide={true}
              value={values.state_id}
              label="State"
              outerClass="mb-3"
            />
          </div>
          <div class="col-md-6">
            <FormControl
              control="select"
              options={[{ value: "", label: "Select" }, ...cityList]}
              setFieldValue={setFieldValue}
              value={values.city_id}
              name="city_id"
              iconHide={true}
              onChange={() => {}}
              label="City"
              outerClass="mb-3"
            />
          </div>
        </div>
        <div class="row mt_20">
          <div class="row">
            <div class="col-md-12">
              <h5 className="sign_title">Gender</h5>
              <div class="col-md-3 radio-container mt_20 mb_20">
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
              </div>
              <ErrorMessage
                name="gender"
                render={(error) => <div className="error">{error}</div>}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
