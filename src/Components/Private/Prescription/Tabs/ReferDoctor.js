import { ErrorMessage, Field, FieldArray, useFormikContext } from "formik";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpecialityList } from "../../../../Store/Reducers/CommonReducer";
import { Icon, BackGround } from "../../../../Utilities/Icons";
import FormControl from "../../../Common/Forms/FormControl";

function ReferDoctor() {
  const dispatch = useDispatch();
  const { values, setFieldValue, handleChange } = useFormikContext();
  const { specialityList } = useSelector(({ CommonSlice }) => CommonSlice);

  useEffect(() => {
    !specialityList.length && dispatch(SpecialityList());
    return () => {};
  }, []);

  return (
    <FieldArray
      name="refer_speciality"
      render={(arrayHelpers) => (
        <>
          <div className="medicine_search_box d-flex align-items-center">
            <span className="medicine_text">Add Speciality :</span>
            <div className="prescription-search w-50">
              <FormControl
                control="select"
                options={specialityList}
                setFieldValue={setFieldValue}
                value={values.tempSpeciality}
                iconHide={false}
                isSearchable={true}
                isMulti={true}
                displayTag={false}
                defaultValue=""
                name="tempSpeciality"
                onChange={(value) => {
                  let speciality = specialityList.find(
                    (item) =>
                      parseInt(item?.value) ===
                      parseInt(value[value?.length - 1])
                  );
                  arrayHelpers.push({
                    booking_id: values?.booking_id,
                    user_id: values?.user_id,
                    speciality_id: speciality?.value,
                    speciality_name: speciality?.label,
                  });
                }}
                outerClass=""
              />
            </div>
          </div>
          <div class="table-responsive">
            <table class="table prescription_table">
              <tbody>
                {values?.refer_speciality?.length ? (
                  values?.refer_speciality?.map((item, index) => (
                    <tr className="prescription_table_body_row ">
                      <td className="prescription_table_body_text">
                        {item?.speciality_name}
                      </td>
                      <td>
                        <center>
                          <img
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                            src={Icon.CrossRed}
                            alt="Avatar"
                            className="ml_15 mt_15 mb_5"
                          ></img>
                        </center>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    />
  );
}

export default ReferDoctor;
