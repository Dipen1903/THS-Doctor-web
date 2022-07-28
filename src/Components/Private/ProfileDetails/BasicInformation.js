import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage, useFormikContext } from "formik";
import ProgressBar from "../../Common/Layouts/Progress_bar";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import FileUpload from "../../Common/Layouts/FileUpload";
import FormControl from "../../Common/Forms/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { CityList } from "../../../Store/Reducers/CommonReducer";

export default function BasicInformation() {
  const { values, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const { CommonSlice, ProfileSlice } = useSelector((state) => state);
  const { stateList, cityList } = CommonSlice;
  const { userProfile } = ProfileSlice;
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
            <Form.Group className="mb-3">
              <Form.Label className="sign_title">State</Form.Label>
              <Form.Select
                name="state_id"
                value={values.state_id}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Select</option>

                {stateList?.length &&
                  stateList?.map((item) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
              </Form.Select>
              <ErrorMessage
                name="state_id"
                render={(error) => <div className="error">{error}</div>}
              />
            </Form.Group>
          </div>
          <div class="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="sign_title">City</Form.Label>
              <Form.Select
                name="city_id"
                value={values.city_id}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Select</option>
                {cityList?.length &&
                  cityList?.map((item) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
              </Form.Select>
              <ErrorMessage
                name="city_id"
                render={(error) => <div className="error">{error}</div>}
              />
            </Form.Group>
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
