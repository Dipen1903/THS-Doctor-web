import { FieldArray, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearMedicines,
  GetMedicine,
} from "../../../../Store/Reducers/CommonReducer";
import { BackGround, Icon } from "../../../../Utilities/Icons";
import FormControl from "../../../Common/Forms/FormControl";
import GridLayout from "../../../Common/Layouts/GridLayout";

function Medicine() {
  const dispatch = useDispatch();
  const { values, setFieldValue, handleChange, handleBlur } =
    useFormikContext();
  const [searchParams, setSearchParams] = useState({ q: "", page: 1 });
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(null);
  const { medicines } = useSelector(({ CommonSlice }) => CommonSlice);

  useEffect(() => {
    if (searchParams.page && searchParams.q) {
      dispatch(GetMedicine(searchParams)).then((res) => {
        setShow(true);
      });
    } else {
      setShow(false);
      dispatch(clearMedicines());
    }
    return () => { };
  }, [searchParams]);

  const onChangeText = (e) => {
    let q = e?.target?.value.toLowerCase();
    setText(q);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setSearchParams((state) => ({ ...state, q }));
    }, 500);
    setTimer(newTimer);
  };
  // Increment the value
  const handleIncrement = (index, field) => {
    const updatedMedicines = [...values.medicines];
    const currentValue = parseInt(updatedMedicines[index][field], 10); // Parse as integer
    updatedMedicines[index][field] = currentValue + 1;
    setFieldValue("medicines", updatedMedicines);
  };

  // Decrement the value
  const handleDecrement = (index, field) => {
    const updatedMedicines = [...values.medicines];
    const currentValue = parseInt(updatedMedicines[index][field], 10); // Parse as integer
    if (currentValue > 0) {
      updatedMedicines[index][field] = currentValue - 1;
      setFieldValue("medicines", updatedMedicines);
    }
  };



  return (
    <>
      <FieldArray
        name="medicines"
        render={(arrayHelpers) => {
          return (
            <>
              <div className="medicine_search_box d-flex col-md-12">
                <span className="medicine_text col-md-2">Add Medicines:</span>
                <div className="prescription-search col-md-10">
                  <form className="form-inline d-flex justify-content-start align-items-center">
                    <img
                      alt="myImg"
                      src={Icon.Search}
                      className="payout_search"
                    ></img>
                    <input
                      className="form-control mr-sm-2 border-0 pl_35 pt_10 pb_10"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={text}
                      onChange={onChangeText}
                    />
                  </form>
                  {medicines?.products?.length && show ? (
                    <div className="list">
                      <img></img>
                      <GridLayout
                        data={medicines?.products}
                        component={({ data, index }) => {
                          return (
                            <div
                              className="list-item"
                              onClick={(e) => {
                                if (
                                  values?.medicines?.find(
                                    (e) => e.medicine_id === data?.id
                                  )
                                ) {
                                  /* same result as above, but a different function return type */
                                } else {
                                  arrayHelpers.push({
                                    medicine_name: data?.name,
                                    medicine_id: data?.id,
                                    morning: 1,
                                    afternoon: 1,
                                    evening: 1,
                                    night: 1,
                                    conditions: "before_food",
                                    days: 1,
                                  });
                                }

                                setShow(false);
                                setText("");
                              }}
                              key={data?.id}
                            >
                              {data?.name}
                            </div>
                          );
                        }}
                        page={{
                          total: medicines?.meta?.total,
                          pageSize: medicines?.meta?.per_page,
                          onPageChange: (page) =>
                            setSearchParams((state) => ({ ...state, page })),
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="table-responsive">
                <table className="table prescription_table">
                  <thead>
                    <tr className="prescription_table_head">
                      <th className="prescription_table_head_text">Medicine</th>
                      <th className="prescription_table_head_text">Morning</th>
                      <th className="prescription_table_head_text">
                        Afternoon
                      </th>
                      <th className="prescription_table_head_text">Night</th>
                      <th className="prescription_table_head_text">
                        Condition
                      </th>
                      <th className="prescription_table_head_text">
                        <center>Days</center>
                      </th>
                      <th className="prescription_table_head_text">
                        <center>Action</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values?.medicines?.map((item, index) => (
                      <tr className="prescription_table_body_row">
                        <td className="prescription_table_body_text">
                          <FormControl
                            control="input"
                            type="text"
                            disabled
                            name={`medicines[${index}].medicine_name`}
                            id={`medicines[${index}].medicine_name`}
                            value={values?.medicines[index].medicine_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </td>
                        <td className="prescription_table_body_text">
                          <td className="prescription_table_body_text">
                            <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "8px" }}>
                              <button
                                type="button"
                                onClick={() => handleDecrement(index, "morning")}
                                style={{ background: "transparent", border: "none", color: "#199A8E" }}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={values?.medicines[index].morning}
                                readOnly
                                onBlur={handleBlur}
                                name={`medicines[${index}].morning`}
                                id={`medicines[${index}].morning`}
                                style={{ border: "none", width: "50px" }}
                              />
                              <button
                                type="button"
                                onClick={() => handleIncrement(index, "morning")}
                                style={{ background: "transparent", border: "none", color: "#199A8E" }}
                              >
                                +
                              </button>
                            </div>
                          </td>

                        </td>
                        <td className="prescription_table_body_text">
                          <td className="prescription_table_body_text">
                            <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "8px" }}>
                              <button
                                type="button"
                                onClick={() => handleDecrement(index, "afternoon")}
                                style={{ background: "transparent", border: "none", color: "#199A8E" }}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={values?.medicines[index].afternoon}
                                readOnly
                                onBlur={handleBlur}
                                name={`medicines[${index}].afternoon`}
                                id={`medicines[${index}].afternoon`}
                                style={{ border: "none", width: "50px" }}
                              />
                              <button
                                type="button"
                                onClick={() => handleIncrement(index, "afternoon")}
                                style={{ background: "transparent", border: "none", color: "#199A8E" }}
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </td>
                        <td className="prescription_table_body_text">
                          <td className="prescription_table_body_text">
                            <div style={{ display: "flex", border: "1px solid #ccc", borderRadius: "8px" }}>
                              <button
                                type="button"
                                onClick={() => handleDecrement(index, "night")}
                                style={{ background: "transparent", border: "none", color: "#199A8E" }}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                name={`medicines[${index}].night`}
                                id={`medicines[${index}].night`}
                                value={values?.medicines[index].night}
                                readOnly
                                onBlur={handleBlur}
                                style={{ border: "none", width: "50px" }}
                              />
                              <button
                                type="button"
                                onClick={() => handleIncrement(index, "night")}
                                style={{ background: "transparent", border: "none", color: "#199A8E" }}
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </td>
                        <td className="prescription_table_body_text">
                          <select
                            className="custom-select"
                            name={`medicines[${index}].conditions`}
                            defaultValue="before_food"
                            onChange={(e) => {
                              setFieldValue(
                                `medicines[${index}].conditions`,
                                e.target.value
                              );
                            }}
                          >
                            <option value="before_food">Before Food</option>
                            <option value="after_food">After Food</option>
                          </select>
                        </td>
                        <td className="prescription_table_body_text">
                          <FormControl
                            control="input"
                            type="number"
                            min={1}
                            name={`medicines[${index}].days`}
                            id={`medicines[${index}].days`}
                            value={values?.medicines[index].days}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </td>

                        <td>
                          <center>
                            <img
                              onClick={(e) => {
                                e.preventDefault();
                                arrayHelpers.remove(index);
                              }}
                              src={Icon.CrossRed}
                              alt="Avatar"
                              className="ml_15 mt_15 mb_5"
                            />
                          </center>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          );
        }}
      />
    </>
  );
}

export default Medicine;
