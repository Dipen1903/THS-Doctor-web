import React, { useEffect } from "react";
import { useState } from "react";
// import Form from "react-bootstrap/Form";
import { ErrorMessage, useFormikContext } from "formik";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
// import { Icon } from "../../../../Utilities/Icons.js";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { toggleFee } from "../../../../Store/Reducers/ProfileReducer.js";
import "./SlotTime.css";
import Toggle from "./Toggle";
import light from "../../../../Assets/img/svg/light.svg";
import plus from "../../../../Assets/img/svg/plus.svg";
import arrow from "../../../../Assets/img/png/light.svg";
import {
  SpecialityList,
  // SubSpecialityList,
} from "../../../../Store/Reducers/CommonReducer.js";
import FormControl from "../../../Common/Forms/FormControl.js";
import { compareTime } from "../../../../Utilities/Functions.js";
import WeekSlot from "./WeekSlot.js";
const weekDays = [
  {
    id: 1,
    day: "Sun",
  },
  {
    id: 2,
    day: "Mon",
  },
  {
    id: 3,
    day: "Tue",
  },
  {
    id: 4,
    day: "Wed",
  },
  {
    id: 5,
    day: "Thur"
  },
  {
    id: 6,
    day: "Fri"
  },
  {
    id: 7,
    day: "Sat",
  },
];

function SheduleInformation() {
  const { values, setFieldValue, handleBlur } = useFormikContext();
  const dispatch = useDispatch();
  const { feeModal, userProfile } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  // const { subSpecialityList } = useSelector(({ CommonSlice }) => CommonSlice);

  // const getFee = () => {
  //   return (
  //     subSpecialityList?.length &&
  //     subSpecialityList?.find(
  //       (item) => item?.id === userProfile?.sub_speciality_id
  //     )?.consulting_fee
  //   );
  // };
  const [timePickers, setTimePickers] = useState([{ id: 1 }]);
  const [newDivCount, setNewDivCount] = useState(0);
  const [addedDivs, setAddedDivs] = useState({});

  const addTimePicker = () => {
    setTimePickers([...timePickers, { id: timePickers.length + 1 }]);
  };

  const removeTimePicker = (day, id) => {
    const dayDivCount = addedDivs[day] || 0;
    setAddedDivs({
      ...addedDivs,
      [day]: dayDivCount - 1,
    });
    setTimePickers(timePickers.filter((picker) => picker.id !== id));
  };

  const addNewDiv = () => {
    setNewDivCount(newDivCount + 1);
  };

  const handleAddNewDiv = (day) => {
    addNewDiv();
    setAddedDivs({
      ...addedDivs,
      [day]: (addedDivs[day] || 0) + 1,
    });
  };
  const [checked, SetChecked] = useState({
    Sun: true,
    Mon: true,
    Tue: true,
  });
  const handleToggleChange = (day, isChecked) => {

    SetChecked((prevToggleData) => ({
      ...prevToggleData,
      [day]: isChecked,
    }));
    console.log(`Day: ${day}, isChecked: ${isChecked}`);
  };
  console.log("checked", checked);

  return (
    <>
      <FeeCardModal show={feeModal} onHide={() => dispatch(toggleFee(false))} />
      <div className="basic_info_form_box">
        <div className="row mt_20">
          <div className="col-md-9 col-sm-8">
            <label className="sign_title">Consultation Fee (Rs)</label>
            <div className="input_box">
              <div className="form_group">
                <input
                  type="text"
                  disabled
                  name=""
                  placeholder=""
                  value={userProfile?.consultation_fee?.consulting_fee}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-4">
            <button
              className="fee_card"
              onClick={() => dispatch(toggleFee(true))}
            >
              Fee Card
            </button>
          </div>
        </div>
        <div className="row mt_10">
          <div className="col-md-12">
            <span className="consult_fee_subtext">
              You will get 70% of the consultation fees and 30% is THS Platform
              Fees.{" "}
            </span>
          </div>
        </div>
        <hr className="bottom_border mt_30 mb_30" />
        <div className="row">
          <div className="col-md-12">
            <h3 className="time_slot">Online Time Slot Managment</h3>
          </div>
        </div>
        <div className="row mt_20">
          <div className="col-md-12">
            {/* <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Weekdays" className="tab_inner_box">
                <div className="weekdays_box">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="day_box">
                        <FormControl
                          control="checkbox"
                          name="weekdays.days"
                          options={[
                            { value: "sudisable", key: "S", disabled: true },
                            { value: "monday", key: "M" },
                            { value: "tuesday", key: "T" },
                            { value: "wednesday", key: "W" },
                            { value: "thursday", key: "T" },
                            { value: "friday", key: "F" },
                            { value: "sadisable", key: "S", disabled: true },
                          ]}
                          values={values.weekdays.days}
                        />
                      </div>
                      <Accordion defaultActiveKey={["1"]} alwaysOpen>
                        {Object.keys(values.weekdays.time_period).map(
                          (item, index) => (
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>{item}</Accordion.Header>
                              <Accordion.Body>
                                <div className="row">
                                  <div className=" col-md-6">
                                    <h5 className="start_at">Start at</h5>
                                    <FormControl
                                      control="select"
                                      options={
                                        values.weekdays.time_period[item].slots
                                      }
                                      name={`weekdays.time_period.${item}.start_time`}
                                      id={`weekdays.time_period.${item}.start_time`}
                                      value={
                                        values.weekdays.time_period[item]
                                          .start_time
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      setFieldValue={setFieldValue}
                                      onChange={() => { }}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                  <div className=" col-md-6">
                                    <h5 className="end_at">End at</h5>
                                    <FormControl
                                      control="select"
                                      options={[
                                        {
                                          label: "None",
                                          value: "",
                                        },
                                        ...values.weekdays.time_period[
                                          item
                                        ].slots?.filter((s) =>
                                          compareTime(
                                            s.value,
                                            values.weekdays.time_period[item]
                                              .start_time
                                          )
                                        ),
                                      ]}
                                      name={`weekdays.time_period.${item}.end_time`}
                                      id={`weekdays.time_period.${item}.end_time`}
                                      value={
                                        values.weekdays.time_period[item]
                                          .end_time
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      setFieldValue={setFieldValue}
                                      onChange={() => { }}
                                      onBlur={handleBlur}
                                    />
                                    <div className="error">
                                      <ErrorMessage
                                        name={`weekdays.time_period.${item}.end_time`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="second" title="Weekends" className="tab_inner_box">
                <div className="weekends_box">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="day_box">
                        <FormControl
                          control="checkbox"
                          name="weekends.days"
                          options={[
                            { value: "sunday", key: "S" },
                            { value: "mondisable", key: "M", disabled: true },
                            { value: "tuesdisable", key: "T", disabled: true },
                            { value: "wednsdisable", key: "W", disabled: true },
                            { value: "thursdisable", key: "T", disabled: true },
                            { value: "fridisable", key: "F", disabled: true },
                            { value: "saturday", key: "S" },
                          ]}
                          values={values.weekends.days}
                        />
                      </div>
                      <Accordion defaultActiveKey={["1"]} alwaysOpen>
                        {Object.keys(values.weekends.time_period).map(
                          (item, index) => (
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>{item}</Accordion.Header>
                              <Accordion.Body>
                                <div className="row">
                                  <div className="col-md-6">
                                    <h5 className="start_at">Start at</h5>
                                    <FormControl
                                      control="select"
                                      options={
                                        values.weekends.time_period[item].slots
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      name={`weekends.time_period.${item}.start_time`}
                                      id={`weekends.time_period.${item}.start_time`}
                                      value={
                                        values.weekends.time_period[item]
                                          .start_time
                                      }
                                      setFieldValue={setFieldValue}
                                      onChange={() => { }}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="end_at">End at</h5>
                                    <FormControl
                                      control="select"
                                      options={[
                                        {
                                          label: "None",
                                          value: "",
                                        },
                                        ...values.weekends.time_period[
                                          item
                                        ].slots?.filter((s) =>
                                          compareTime(
                                            s.value,
                                            values.weekends.time_period[item]
                                              .start_time
                                          )
                                        ),
                                      ]}
                                      name={`weekends.time_period.${item}.end_time`}
                                      id={`weekends.time_period.${item}.end_time`}
                                      value={
                                        values.weekends.time_period[item]
                                          .end_time
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      setFieldValue={setFieldValue}
                                      onChange={() => { }}
                                      onBlur={handleBlur}
                                    />
                                    <div className="error">
                                      <ErrorMessage
                                        name={`weekends.time_period.${item}.end_time`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs> */}

            <div className="row mt_10">
              <div className="col-md-12">
                <FormControl
                  control="checkbox"
                  name="emergency_call"
                  options={[
                    { value: "emergency_call", key: "Emergency calls" },
                  ]}
                  value={values.emergency_call}
                  className="checkbox_icon"
                />
              </div>
            </div>
            <div className="week-days-container">
              {weekDays.map((val) => {
                const dayDivCount = addedDivs[val.day] || 0;

                return (
                  <div className="edit_time_slot_mainss" key={val.id} style={{ marginLeft: "1rem" }}>
                    <div className="map_main_divss">
                      {Array.from(Array(dayDivCount + 1), (_, index) => index).map(
                        (divIndex) => {
                          const pickerId = divIndex + 1;
                          return (
                            <div className="time-pickerss" key={pickerId}>
                              {divIndex === 0 && (
                                <div className="toggle-label">
                                  {/* Pass initialChecked prop */}
                                  <Toggle label={val.day} onToggleChange={(isChecked) => handleToggleChange(val.day, isChecked)} initialChecked={val.day === "Sun" || val.day === "Mon" || val.day === "Tue"} />
                                </div>
                              )}

                              {checked[val.day] === true && divIndex !== 0 && (
                                <>
                                  <div style={{ paddingLeft: "20%" }}>
                                    <img
                                      src={light}
                                      className="fa-regular fa-circle-xmark"
                                      onClick={() => removeTimePicker(val.day, pickerId)}
                                    ></img>
                                  </div>
                                </>
                              )}
                              {
                                checked[val.day] === true ? (
                                  <>
                                    <div className="clock">
                                      <input type="time" className="time-day" />
                                    </div>
                                    <p>-</p>
                                    <div className="clock">
                                      <input type="time" className="time-day" />
                                    </div>
                                  </>
                                ) : (<> unavailable</>)
                              }

                              {checked[val.day] === true && divIndex === dayDivCount && (
                                <div className="">
                                  <img
                                    src={plus}
                                    className="fa-solid fa-plus"
                                    style={{ color: "#3093BB", fontSize: "22px" }}
                                    onClick={() => handleAddNewDiv(val.day)}
                                  ></img>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SheduleInformation;

const FeeCardModal = (props) => {
  const { specialityList } = useSelector(({ CommonSlice }) => CommonSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SpecialityList({ isFeeCard: true }));
    return () => { };
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="" closeButton>
        <h5 className="fee_card_title">Fee Card</h5>
      </Modal.Header>
      <Modal.Body>
        <table className="width_100">
          <tr>
            <td className="fee_card_table_head">Speciality</td>
            <td className="fee_card_table_head">Consultation Fee (Rs)</td>
            <td className="fee_card_table_head">Follow up Fee (Rs)</td>
          </tr>
          {specialityList?.length ? (
            specialityList.map((item) => (
              <tr key={item?.id}>
                <td className="table_text">{item?.speciality}</td>
                <td className="table_text">{item?.consulting_fee}</td>
                <td className="table_text">{item?.follow_up_fee}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </table>
      </Modal.Body>
    </Modal>
  );
};
