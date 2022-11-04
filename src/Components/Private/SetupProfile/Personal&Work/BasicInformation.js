import React, { useState } from "react";

import { ErrorMessage, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { BackGround, Icon } from "../../../../Utilities/Icons";
import FileUpload from "../../../Common/Layouts/FileUpload";
import FormControl from "../../../Common/Forms/FormControl";
import { isEmpty } from "../../../../Utilities/Functions";
import { CityList } from "../../../../Store/Reducers/CommonReducer";

export default function BasicInformation() {
  const { values, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const dispatch = useDispatch();
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

  const validateImage = (value) => {
    let errorMessage;
    if (isEmpty(value)) {
      errorMessage = "Please upload your image";
    }
    return errorMessage;
  };

  return (
    <>
      <div className="basic_info_form_box">
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
              Your avatar should is a friendly and inviting head shot. Clearly
              indentifiable as you.
            </p>
          </div>
          <ErrorMessage
            name="image"
            render={(error) => <div className="error">{error}</div>}
          />
        </div>
        <div className="row mt_20">
          <div className="col-md-12">
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
        <div className="row mt_20">
          <div className="col-md-6">
            <FormControl
              control="select"
              options={[{ value: "", label: "Select" }, ...cityList]}
              setFieldValue={setFieldValue}
              value={values?.city_id}
              name="city_id"
              iconHide={true}
              onChange={(value) => {
                let city = cityList.find((item) => item?.value === value);
                setFieldValue("state_id", city?.state_id);
              }}
              label="City"
              outerClass="mb-3"
            />
          </div>
          <div className="col-md-6">
            <FormControl
              control="select"
              options={[{ value: "", label: "Select" }, ...stateList]}
              setFieldValue={setFieldValue}
              name="state_id"
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
        <div className="row mt_20">
          <div className="row">
            <div className="col-md-12">
              <h5 className="sign_title">Gender</h5>
              {/* <Field name="gender" validate={validateGender} hidden /> */}
              <div className="col-md-3 radio-container mt_20 mb_20">
                <div
                  className={`radio_box ${
                    values?.gender === "male" && "selected"
                  }`}
                >
                  <label htmlFor={"male"}>
                    <img
                      src={
                        values?.gender === "male"
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
                    values?.gender === "female" && "selected"
                  }`}
                >
                  <label htmlFor={"female"}>
                    <img
                      src={
                        values?.gender === "female"
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
