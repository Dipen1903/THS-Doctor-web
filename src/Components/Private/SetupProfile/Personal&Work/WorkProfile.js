import React from "react";
import { ErrorMessage, useFormikContext } from "formik";
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
    <div className="basic_info_form_box">
      <div className="row mt_20">
        <div className="col-md-12">
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
            defaultValue=""
            name="speciality"
            onChange={(value) => {
              // setFieldValue("sub_speciality", "");
              // dispatch(SubSpecialityList({ speciality_id: value }));
            }}
            placeholder="Please select your speciality"
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
      </div>
      {/* {subSpecialityList?.length ? (
        <div className="row mt_20">
          <div className="col-md-12">
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
      )} */}
      <div className="row mt_20">
        <div className="col-md-12">
          <FormControl
            control="input"
            type="text"
            key="experience"
            label="Year Experience*"
            placeholder="Please enter your experience"
            id="experience"
            name="experience"
            min={0}
            max={99}
            onChange={(e) => {
              let num = e.target.value;
              if (num < 99 && num > -1) setFieldValue("experience", num);
            }}
            onBlur={handleBlur}
            value={values?.experience}
          />
        </div>
      </div>
      <div className="row mt_20">
        <div className="col-md-12">
          <FormControl
            control="input"
            type="text"
            key="registration_number"
            label="Registration Number"
            id="registration_number"
            name="registration_number"
            placeholder="Please enter your registration number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.registration_number}
          />
        </div>
      </div>
      <div className="row mt_20">
        <div className="col-md-12">
          <FormControl
            control="select"
            label="Language"
            options={languageList?.length ? languageList : []}
            isMulti={true}
            placeholder="Search languages"
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
          <ErrorMessage
            component={({ children }) => (
              <div className="error">{children}</div>
            )}
            name={"languages"}
          />
        </div>
      </div>
    </div>
  );
}
