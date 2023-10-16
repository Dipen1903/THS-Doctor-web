import React, { memo, useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { ErrorMessage, Formik, useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import { Icon } from "../../../Utilities/Icons";
import { useDispatch, useSelector } from "react-redux";
import { SlotListDoctor, slotdata, toggleFee } from "../../../Store/Reducers/ProfileReducer.js";
import light from "../../../Assets/img/svg/light.svg";
import plus from "../../../Assets/img/svg/plus.svg";
import Toggle from "../SetupProfile/Shedule&Payment/Toggle";
import moment from "moment";
import {
  GetUserProfile,
} from "../../../Store/Reducers/ProfileReducer";
import FormControl from "../../Common/Forms/FormControl";
import { compareTime } from "../../../Utilities/Functions";
import { ScheduleEnum } from "../../../Utilities/Enums";
import { ScheduleSchema } from "../../../Utilities/Schema";
import { BASE_URL } from "../../../Utilities/HTTP";
import axios from "axios";
import { SESSION } from "../../../Utilities/Enums";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
function Timeslotfees() {
  const [scheduleData, setScheduleData] = useState({ ...ScheduleEnum });
  const dispatch = useDispatch();
  const { userProfile , slotlistdoctor } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [chkValue, setChkValue] = useState(false);
  const [edit, setEdit] = useState(false);
  const SessionData = JSON.parse(localStorage.getItem(SESSION));
  const initialLoad = () => {
    let tempData = { ...scheduleData };
    // if (userProfile?.availibility) {
    //   if (userProfile?.availibility?.weekdays) {
    //     tempData.weekdays.days = userProfile?.availibility?.weekdays?.days;
    //     if (userProfile?.availibility?.weekdays?.slot) {
    //       Object.keys(userProfile?.availibility?.weekdays?.slot)?.map(
    //         (item) => {
    //           let tempSlot = userProfile?.availibility?.weekdays?.slot[item];
    //           tempData.weekdays.time_period[item] = {
    //             start_time: tempSlot?.start_time,
    //             end_time: tempSlot?.end_time,
    //             slots: ScheduleEnum.weekdays.time_period[item].slots,
    //           };
    //         }
    //       );
    //     }
    //   }
    //   if (userProfile?.availibility?.weekends) {
    //     tempData.weekends.days = userProfile?.availibility?.weekends?.days;
    //     if (userProfile?.availibility?.weekends?.slot) {
    //       Object.keys(userProfile?.availibility?.weekends?.slot)?.map(
    //         (item) => {
    //           let tempSlot = userProfile?.availibility?.weekends?.slot[item];
    //           tempData.weekends.time_period[item] = {
    //             start_time: tempSlot?.start_time,
    //             end_time: tempSlot?.end_time,
    //             slots: ScheduleEnum.weekdays.time_period[item].slots,
    //           };
    //         }
    //       );
    //     }
    //   }
    // }
    tempData.emergency_call = userProfile?.is_emergency_call ? true : false;

    setScheduleData(tempData);
  };

  useEffect(() => {
    !userProfile && dispatch(GetUserProfile());
    initialLoad();
    return () => { };
  }, [userProfile]);
  const { slotlistdata } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );

  ///Time slots
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [selectedStartTimes, setSelectedStartTimes] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayoftime, SetDay] = useState("");

  const [timePickers, setTimePickers] = useState([{ id: 1 }]);
  const [newDivCount, setNewDivCount] = useState(0);
  const [addedDivs, setAddedDivs] = useState({});

  const [weekDays, setWeekDays] = useState([
    {
      id: 1,
      day: "sunday",
      checked: true
    },
    {
      id: 2,
      day: "monday",
      checked: true
    },
    {
      id: 3,
      day: "tuesday",
      checked: true
    },
    {
      id: 4,
      day: "wednesday",
      checked: true
    },
    {
      id: 5,
      day: "thursday",
      checked: true
    },
    {
      id: 6,
      day: "friday",
      checked: true
    },
    {
      id: 7,
      day: "saturday",
      checked: true
    },
  ]
  )


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
    sunday: slotlistdoctor?.sunday?.length >= 0 ? false : true,
    monday: slotlistdoctor?.monday?.length >= 0 ? false : true,
    tuesday: slotlistdoctor?.tuesday?.length >= 0 ? false : true,
    wednesday: slotlistdoctor?.wednesday?.length >= 0 ? false : true,
    thursday: slotlistdoctor?.thursday?.length >= 0 ? false : true,
    friday: slotlistdoctor?.friday?.length >= 0 ? false : true,
    saturday: slotlistdoctor?.saturday?.length >= 0 ? false : true,
  });
  useEffect(() => {
    SetChecked({
      sunday: slotlistdoctor?.sunday?.length >= 0 ? false : true,
      monday: slotlistdoctor?.monday?.length >= 0 ? false : true,
      tuesday: slotlistdoctor?.tuesday?.length >= 0 ? false : true,
      wednesday: slotlistdoctor?.wednesday?.length >= 0 ? false : true,
      thursday: slotlistdoctor?.thursday?.length >= 0 ? false : true,
      friday: slotlistdoctor?.friday?.length >= 0 ? false : true,
      saturday: slotlistdoctor?.saturday?.length >= 0 ? false : true,
    })
    setWeekDays([
      {
        id: 1,
        day: "sunday",
        checked: slotlistdoctor?.sunday?.length >= 0 ? false : true
      },
      {
        id: 2,
        day: "monday",
        checked: slotlistdoctor?.monday?.length >= 0 ? false : true,
      },
      {
        id: 3,
        day: "tuesday",
        checked: slotlistdoctor?.tuesday?.length >= 0 ? false : true,
      },
      {
        id: 4,
        day: "wednesday",
        checked: slotlistdoctor?.wednesday?.length >= 0 ? false : true
      },
      {
        id: 5,
        day: "thursday",
        checked: slotlistdoctor?.thursday?.length >= 0 ? false : true
      },
      {
        id: 6,
        day: "friday",
        checked: slotlistdoctor?.friday?.length >= 0 ? false : true,
      },
      {
        id: 7,
        day: "saturday",
        checked: slotlistdoctor?.saturday?.length >= 0 ? false : true
      },
    ])
  }, [slotlistdoctor])

  const handleToggleChange = (day, isChecked) => {
    SetChecked((prevToggleData) => ({
      ...prevToggleData,
      [day]: isChecked,
    }));

    // If the day is unchecked, clear its selected slots
    if (!isChecked) {
      setSelectedTimeSlots((prevSelectedTimeSlots) => ({
        ...prevSelectedTimeSlots,
        [day]: {},
      }));
    }
  };

  useEffect(() => {
    dispatch(SlotListDoctor())
  }, [dispatch])
  const [selectedTimeSlotsBetween, setSelectedTimeSlotsBetween] = useState([]);

  const handleSlotChange = (day, index, timeSlotType, slotValue) => {
    const updatedDaySlots = { ...(selectedTimeSlots[day] || {}) };
    SetDay(day);
    if (!updatedDaySlots[index]) {
      updatedDaySlots[index] = { start: '', end: '' };
      console.log("updatedDaySlotsupdatedDaySlotsupdatedDaySlots", updatedDaySlots);
    }
    updatedDaySlots[index][timeSlotType] = slotValue;
    setSelectedTimeSlots({
      ...selectedTimeSlots,
      [day]: updatedDaySlots,
    });

    // Update selectedDayForHidetime and calculate timeSlotsBetween regardless of the condition
    setSelectedDayForHidetime(day);

    if (timeSlotType === "start") {
      setSelectedStartTimes({
        ...selectedStartTimes,
        [`${day}_${index}`]: slotValue,
      });
    }
    const startTime = selectedStartTimes[`${day}_${index}`];
    const endTime = updatedDaySlots[index].end;
    if (startTime && endTime) {
      const timeSlotsBetween = generateTimeSlotsBetween(startTime, endTime, day);
      setSelectedTimeSlotsBetween(timeSlotsBetween);
    } else {
      setSelectedTimeSlotsBetween([]);
    }
  };

  const [hidetime, setHidetime] = useState([]);
  const [selectedDayForHidetime, setSelectedDayForHidetime] = useState("");
  const [firstClickForDay, setFirstClickForDay] = useState({});
  const [selectedDay, setSelectedDay] = useState("");

  const generateTimeSlotsBetween = (startTime, endTime, day) => {
    const data = slotlistdoctor[dayoftime]?.slots;
    const startTimeMoment = moment(startTime, 'hh:mm a');
    const endTimeMoment = moment(endTime, 'hh:mm a');

    if (!data || !startTimeMoment.isValid() || !endTimeMoment.isValid()) {
      return [];
    }
    const timeSlots = [];
    const startDate = moment(startTimeMoment);

    while (startDate.isBefore(endTimeMoment)) {
      timeSlots.push(startDate.format('hh:mm A')); // Format as desired
      startDate.add(15, 'minutes'); // Add 15 minutes
    }
    console.log('startTime', startTime);

    if (day === selectedDayForHidetime) {
      setHidetime((prevHidetime) => [...prevHidetime, ...timeSlots]);
    } else {
      setHidetime([]);
    }
    return timeSlots;
  };
  console.log("startTime....", startTime);

  const transformedData = {};
  Object.keys(selectedTimeSlots).forEach((day) => {
    const dayData = selectedTimeSlots[day];
    const dayObj = {
      days: [day],
      time_period: {},
    };

    Object.keys(dayData).forEach((slotIndex) => {
      const slot = dayData[slotIndex];
      dayObj.time_period = [{
        start_time: slot.start,
        end_time: slot.end
      }];
    });
    transformedData[day] = JSON.stringify(dayObj);
  });
  useEffect(() => {
    handleSaveSchedule();
  }, [selectedTimeSlots]);
  const handleSaveSchedule = () => {
    dispatch(slotdata(transformedData));
  };

  return (
    <>
      <Container fluid>
        <div className="row timeslots_box">
          <div className="col-md-12">
            <div className="setting_profile_card_head">
              <div className="d-flex">
                <div className="col-md-6">
                  <h3 className="setting_profile_title">Time Slot & Fees</h3>
                </div>
                <div className="col-md-6">
                  {!edit && (
                    <Button
                      onClick={() => setEdit(true)}
                      variant="primary"
                      className="setting_profile_btn float_right"
                    >
                      <img alt="myImg" src={Icon.Pencil} />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="setting_profile_card_body">
              <div className="row">
                <Formik
                  initialValues={scheduleData}
                  enableReinitialize
                  validationSchema={ScheduleSchema}
                  onSubmit={(values) => {
                    axios.post(`${BASE_URL}/availibility-create-days`, slotlistdata, {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${SessionData?.token}`,
                      },
                    })
                      .then((response) => {
                        if (response.data.message === 'Availibility updated successfully') {
                          setEdit(false);
                          dispatch(GetUserProfile());
                          dispatch(
                            setMessage({
                              text: response?.data?.message,
                              type: AlertEnum.Success,
                            })
                          );
                        } else {

                        }
                      })
                      .catch((error) => {

                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                  }) => {
                    return (
                      <form onSubmit={handleSubmit} id="myForm">
                        <div className="col-md-6">
                          <div className="row mt_20">
                            <div className="col-md-12 col-sm-12">
                              <label className="setting_form_title">
                                Consultation Fee (Rs)
                              </label>
                              <div className="input_box">
                                <div className="form_group">
                                  <input
                                    type="text"
                                    name=""
                                    placeholder=""
                                    value={
                                      userProfile?.consultation_fee
                                        ?.consulting_fee ||
                                      userProfile?.consulting_fee
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt_10">
                            <div className="col-md-12">
                              <span className="setting_consult_fee_subtext">
                                You will get net Rs. 400 after THS charge 10% +
                                GST 18% deduction.
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
                                            const selectedSlot = selectedTimeSlots[val.day] || "";
                                            return (
                                              <div className="time-pickerss" key={pickerId}>
                                                {divIndex === 0 && (
                                                  <div className="toggle-label" style={{ width: "115px" }}>
                                                    <Toggle
                                                      label={val.day}
                                                      onToggleChange={(isChecked) => handleToggleChange(val.day, isChecked)}
                                                      initialChecked={val.checked}
                                                    />
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
                                                {checked[val.day] === true ? (
                                                  <>
                                                    <div className="clock">
                                                      <select
                                                        onChange={(e) => { handleSlotChange(val.day, divIndex + 1, 'start', e.target.value); setStartTime(e.target.value); SetDay(val.day); }
                                                        }
                                                        className="time-day"
                                                        placeholder="-- -- --"
                                                        style={{
                                                          background: "none",
                                                          border: "none",
                                                          backgroundColor: "#ecf2ff",
                                                          fontSize: "15px",
                                                          padding: "10px 30px",
                                                          borderRadius: "8px",
                                                        }}
                                                      >
                                                        <option value=""> -- -- -- </option>
                                                        {
                                                          divIndex === 0 ?
                                                            slotlistdoctor[val.day]?.slots
                                                              .map((slot) => (
                                                                <option key={slot} value={slot}>
                                                                  {slot}
                                                                </option>
                                                              )) :
                                                            slotlistdoctor[val.day]?.slots
                                                              ?.filter(slot => !hidetime.includes(slot))
                                                              .map((slot) => (
                                                                <option key={slot} value={slot}>
                                                                  {slot}
                                                                </option>
                                                              ))
                                                        }
                                                      </select>
                                                    </div>
                                                    <p>-</p>
                                                    <div className="clock">
                                                      <select
                                                        onChange={(e) => { handleSlotChange(val.day, divIndex + 1, 'end', e.target.value); setEndTime(e.target.value); SetDay(val.day) }
                                                        }
                                                        className="time-day"
                                                        style={{
                                                          background: "none",
                                                          border: "none",
                                                          backgroundColor: "#ecf2ff",
                                                          fontSize: "15px",
                                                          padding: "10px 30px",
                                                          borderRadius: "8px",
                                                        }}
                                                      >
                                                        <option> -- -- --</option>
                                                        {slotlistdoctor[val.day]?.slots
                                                          ?.filter(
                                                            (slot) =>
                                                              !selectedStartTimes[`${val.day}_${divIndex + 1}`] ||
                                                              slot > selectedStartTimes[`${val.day}_${divIndex + 1}`]
                                                          )
                                                          .map((slot) => (
                                                            <option key={slot} value={slot}>
                                                              {slot}
                                                            </option>
                                                          ))}
                                                      </select>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <div>Unavailable</div>
                                                )}
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
                          <div className="row mt_20">
                            <div className="col-md-12">
                              <FormControl
                                control="checkbox"
                                name="emergency_call"
                                options={[
                                  {
                                    value: "emergency_call",
                                    key: "Emergency calls",
                                  },
                                ]}
                                value={values.emergency_call}
                                className="checkbox_icon"
                              />
                            </div>
                          </div>
                          <div className="row mt_50">
                            {edit && (
                              <div className="col-md-4">
                                <button
                                  type="submit"
                                  className="continue_btn"
                                  variant="primary"
                                >
                                  Save
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Timeslotfees;
