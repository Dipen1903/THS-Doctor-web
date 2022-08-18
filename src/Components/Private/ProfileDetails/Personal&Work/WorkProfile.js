import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";

import { SubSpecialityList } from "../../../../Store/Reducers/CommonReducer";
import FormControl from "../../../Common/Forms/FormControl";
import { isEmpty } from "../../../../Utilities/Functions";

export default function WorkProfile() {
  const { values, errors, touched, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const dispatch = useDispatch();
  const { specialityList, subSpecialityList, languageList } = useSelector(
    ({ CommonSlice }) => CommonSlice
  );

  const validateExperience = (value) => {
    let errorMessage;
    if (isEmpty(value)) {
      errorMessage = "Please enter experience";
    }
  };
  const validateRegistrationNumber = (value) => {
    let errorMessage;
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,32}$/i.test(
        value
      )
    ) {
      errorMessage = "Please enter valid registration number";
    }
    return errorMessage;
  };
  return (
    <div class="basic_info_form_box">
      <div class="row mt_20">
        <div class="col-md-12">
          <FormControl
            control="select"
            options={[
              { value: "", label: "Your speciality" },
              ...specialityList,
            ]}
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
      {subSpecialityList?.length ? (
        <div class="row mt_20">
          <div class="col-md-12">
            <FormControl
              control="select"
              options={[
                { value: "", label: "Your sub speciality" },
                ...subSpecialityList,
              ]}
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
      <div class="row mt_20">
        <div class="col-md-12">
          <FormControl
            control="input"
            type="number"
            label="Year Experience*"
            id="experience"
            name="experience"
            validate={validateExperience}
            min={0}
            max={99}
            onChange={(e) => {
              let num = e.target.value;
              if (num < 99 && num > 0) setFieldValue("experience", num);
            }}
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
            validate={validateRegistrationNumber}
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
