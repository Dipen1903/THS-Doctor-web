import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";

import { SubSpecialityList } from "../../../../Store/Reducers/CommonReducer";
import FormControl from "../../../Common/Forms/FormControl";

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
          <FormControl
            control="select"
            options={[{ value: "", label: "Select" }, ...specialityList]}
            setFieldValue={setFieldValue}
            value={values.speciality}
            iconHide={true}
            isSearchable={true}
            name="speciality"
            onChange={(value) => {
              setFieldValue("sub_speciality", "");
              dispatch(SubSpecialityList({ speciality_id: value }));
            }}
            label="Your Speciality"
            outerClass="mb-3"
          />
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12">
          <FormControl
            control="select"
            options={[{ value: "", label: "Select" }, ...subSpecialityList]}
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
            isSearchable={true}
            onChange={() => {}}
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
