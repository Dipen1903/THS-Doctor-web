import { useFormikContext } from "formik";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { SubSpecialityList } from "../../../Store/Reducers/CommonReducer";
import { Icon } from "../../../Utilities/Icons";
import FormControl from "../../Common/Forms/FormControl";

export default function WorkProfile() {
  const { values, errors, touched, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const dispatch = useDispatch();
  const { specialityList, subSpecialityList, languageList } = useSelector(
    ({ CommonSlice }) => CommonSlice
  );
  return (
    <div class="basic_info_form_box">
      <div class="row mt_20">
        <div class="col-md-12">
          <Form.Group className="mb-3">
            <Form.Label className="sign_title">Your Speciality*</Form.Label>
            <Form.Select
              name="speciality"
              value={values?.speciality}
              onChange={(e) => {
                handleChange(e);
                dispatch(
                  SubSpecialityList({ speciality_id: e?.target?.value })
                );
              }}
            >
              <option>Select</option>
              {specialityList?.length &&
                specialityList?.map((item) => (
                  <option key={item?.value} value={item?.value}>
                    {item?.label}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12">
          <Form.Group className="mb-3">
            <Form.Label className="sign_title">Sub Speciality*</Form.Label>
            <Form.Select
              name="sub_speciality"
              value={values?.sub_speciality}
              onChange={handleChange}
            >
              <option>Select</option>
              {subSpecialityList?.length &&
                subSpecialityList?.map((item) => (
                  <option key={item?.value} value={item?.value}>
                    {item?.label}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12">
          <FormControl
            control="input"
            type="number"
            label="Year Experience*"
            id="experience"
            name="experience"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.experience}
          />
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12">
          <FormControl
            control="input"
            type="text"
            label="Registration Number"
            id="registration_number"
            name="registration_number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.registration_number}
          />
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12">
          <FormControl
            control="select"
            label="Language"
            options={languageList?.length ? languageList : []}
            isMulti={true}
            placeholder="Search"
            // onChange={(value) => console.log(value)}
            name="languages"
            id="languages"
            className="mb-4"
            value={values.languages}
            setFieldValue={setFieldValue}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        </div>
      </div>
    </div>
  );
}
