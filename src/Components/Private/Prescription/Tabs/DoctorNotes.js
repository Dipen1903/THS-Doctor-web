import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { ArrayRange } from "../../../../Utilities/Functions";
import FormControl from "../../../Common/Forms/FormControl";

function DoctorNotes() {
  const { values, handleChange, handleBlur, setFieldValue } =
    useFormikContext();

  useEffect(() => {
    if (values?.medicines) {
      let medicines = values?.medicines?.map(function (i) {
        return i?.medicine_name;
      });
      setFieldValue("doctor_notes.medicines", medicines?.toString());
    }
  }, [values?.medicines]);

  let lab_tests = values?.lab_test?.map(function (i) {
    return i?.test_name;
  });

  let radiology_test = values?.radiological_test?.map(function (i) {
    return i?.test_name;
  });
  return (
    <>
      <FormControl
        control="textArea"
        label="Chef complaints"
        name="doctor_notes.chef_complaints"
        id="doctor_notes.chef_complaints"
        value={values.doctor_notes.chef_complaints}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=""
        className="Textarea"
      />

      <FormControl
        control="textArea"
        label="Diagnosis"
        name="doctor_notes.diagnosis"
        id="doctor_notes.diagnosis"
        value={values.doctor_notes.diagnosis}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=""
        className="Textarea"
      />

      <FormControl
        control="textArea"
        label="Medical history"
        name="doctor_notes.medical_history"
        id="doctor_notes.medical_history"
        value={values.doctor_notes.medical_history}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=""
        className="Textarea"
      />

      <FormControl
        control="textArea"
        label="Recommended medicines for patient"
        name="doctor_notes.medicines"
        id="doctor_notes.medicines"
        value={values.doctor_notes.medicines}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=""
        className="Textarea"
      />

      {values?.lab_test?.length > 0 && (
        <FormControl
          control="textArea"
          label="Recommended Leb Test for patient"
          name="lab_test"
          id="lab_test"
          value={lab_tests?.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=""
          className="Textarea"
          disabled
        />
      )}

      {values?.radiological_test?.length > 0 && (
        <FormControl
          control="textArea"
          label="Recommended Radiology for patient"
          name="radiology_test"
          id="radiology_test"
          value={radiology_test?.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=""
          className="Textarea"
          disabled
        />
      )}

      <FormControl
        control="textArea"
        label="Wrtire a instructions for patient"
        name="doctor_notes.instruction"
        id="doctor_notes.instruction"
        value={values.doctor_notes.instruction}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=""
        className="Textarea"
      />

      <label for="followafter" className="referdoctor_label mt-2">
        Follow up after
      </label>
      <br />
      <select
        className="follow_up"
        name="doctor_notes.follow_up_days"
        onChange={handleChange}
        value={values.doctor_notes.follow_up_days}
      >
        {ArrayRange(0, 30).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

export default DoctorNotes;
