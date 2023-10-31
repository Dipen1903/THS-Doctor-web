import React, { useEffect } from "react";
import { useState } from "react";
// import Form from "react-bootstrap/Form";
import { ErrorMessage, useFormikContext } from "formik";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { SlotListDoctor, slotdata, toggleFee } from "../../../../Store/Reducers/ProfileReducer.js";
import "./SlotTime.css";
import Toggle from "./Toggle";
import light from "../../../../Assets/img/svg/light.svg";
import plus from "../../../../Assets/img/svg/plus.svg";
import arrow from "../../../../Assets/img/png/light.svg";
import close from "../../../../Assets/img/svg/circle-xmark-regular.svg"

import {
  SpecialityList,
  // SubSpecialityList,
} from "../../../../Store/Reducers/CommonReducer.js";
import FormControl from "../../../Common/Forms/FormControl.js";
import { compareTime } from "../../../../Utilities/Functions.js";
import WeekSlot from "./WeekSlot.js";


function SheduleInformation() {
  const { values, setFieldValue, handleBlur } = useFormikContext();
  const dispatch = useDispatch();
  const { feeModal, userProfile, slotlistdoctor } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [selectedStartTimes, setSelectedStartTimes] = useState({});
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

  const initialSchedule = {
    sunday: [{ start: '', end: '' }],
    monday: [{ start: '', end: '' }],
    tuesday: [{ start: '', end: '' }],
    wednesday: [{ start: '', end: '' }],
    thursday: [{ start: '', end: '' }],
    friday: [{ start: '', end: '' }],
    saturday: [{ start: '', end: '' }],
  };

  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedTimes, setSelectedTimes] = useState({});



  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleAddTime = (day) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].push({ start: '', end: '' });
    setSchedule(updatedSchedule);
  };



  const handleAddNewDiv = (day) => {
    handleAddTime(day);
    addNewDiv();

    setAddedDivs({
      ...addedDivs,
      [day]: (addedDivs[day]),
    });

  };

  // Define the handleRemoveInput function
  function handleRemoveInput(day, index) {
    // Implement the logic to remove the input for the specified 'day' and 'index'
    // For example, if you're using React, you can update your component's state to remove the input.
    // Here's a simplified example using React's useState:

    // Assuming you have state like this:
    // const [schedule, setSchedule] = useState({});

    // You can remove the input like this:
    const updatedSchedule = { ...schedule };
    if (updatedSchedule[day]) {
      updatedSchedule[day].splice(index, 1);
      // Update the state to trigger a re-render
      setSchedule({ ...updatedSchedule });
    }

    const selectedTimesCopy = { ...selectedTimes };
   var b = selectedTimesCopy[day] = updatedSchedule[day].map((slot) => ({
      start: slot.start,
      end: slot.end,
    }));

    console.log("hsidflsfsjlfjsjfsjkfkjdbfjksdfjkdkjadjkfdjksfjkfjksd", b);
    setSelectedTimes(selectedTimesCopy);
  }


  const handleInputChange = (day, index, field, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day][index][field] = value;
    setSchedule(updatedSchedule);

    const selectedTimesCopy = { ...selectedTimes};
    selectedTimesCopy[day] = updatedSchedule[day].map((slot) => ({
      start: slot.start,
      end: slot.end,
    }));
    setSelectedTimes(selectedTimesCopy);
  };




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
    setNewDivCount(newDivCount);
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
  
  // {JSON.stringify(selectedTimes, null, 2)}
  const transformedData = {};
  Object.keys(initialSchedule).forEach((day) => {
    transformedData[day] = JSON.stringify(initialSchedule[day]);
  });
  
  // Update the specific day's data if it exists in selectedTimes
  Object.keys(selectedTimes).forEach((day) => {
    transformedData[day] = JSON.stringify(selectedTimes[day]);
  });
  

  useEffect(() => {
    handleSaveSchedule();
  }, [selectedTimeSlots]);
  const handleSaveSchedule = () => {
    dispatch(slotdata(transformedData));
  };
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
                const selectedSchedule = schedule[val.day] || [];
                return (
                  <div className="edit_time_slot_mainss" key={val.id} style={{ marginLeft: "1rem" }}>
                    <div className="map_main_divss">
                      {Array.from(Array(dayDivCount + 1), (_, index) => index).map((divIndex) => {
                        const pickerId = divIndex + 1;
                        const selectedSlot = selectedTimeSlots[val.day] || "";
                        return (
                          <div className="time-pickerss" key={pickerId} style={{ display: "flex", alignItems: "start" }}>
                            {divIndex === 0 && (
                              <div className="toggle-label" style={{ width: "115px" }}>
                                <Toggle
                                  label={val.day}
                                  onToggleChange={(isChecked) => handleToggleChange(val.day, isChecked)}
                                  initialChecked={val.checked}
                                />
                              </div>
                            )}
                            {checked[val.day] === true ? (
                              <div style={{ display: "flex", alignItems: "end" }}>
                                <div className="row">
                                  {schedule[val.day] &&
                                    selectedSchedule.map((timeSlot, index) => (
                                      <div key={index} style={{ display: "flex", gap:"20px", marginBottom:"8px", alignItems: "cenetr"}}>
                                        {/* Add a close button here */}
                                        {index > 0 && (
                                           <img
                                           src={light}
                                           style={{width:"20px"}}
                                           onClick={() => handleRemoveInput(val.day, index)}
                                         ></img>
                                        )}

                                          <select
                                            value={timeSlot.start}
                                            onChange={(e) => handleInputChange(val.day, index, 'start', e.target.value)}
                                            className="time-day"
                                            placeholder="-- -- --"
                                            style={{
                                              background: "none",
                                              border: "none",
                                              backgroundColor: "#ecf2ff",
                                              fontSize: "15px",
                                              padding: "10px 30px",
                                              borderRadius: "8px",
                                              marginLeft: index === 0 ? "38px" : "0", 
                                            }}
                                          >
                                            <option> -- -- -- </option>
                                            {slotlistdoctor[val.day]?.slots.map((time, idx) => {
                                              if (
                                                schedule[val.day].every(
                                                  (slot, i) =>
                                                    i === index ||
                                                    time < slot.start ||
                                                    time >= slot.end ||
                                                    time === timeSlot.start
                                                )
                                              ) {
                                                return (
                                                  <option key={idx} value={time}>
                                                    {time}
                                                  </option>
                                                );
                                              }
                                              return null;
                                            })}
                                          </select>
                                      
                                      
                                          <select
                                            value={timeSlot.end}
                                            onChange={(e) => handleInputChange(val.day, index, 'end', e.target.value)}
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
                                            {slotlistdoctor[val.day]?.slots.map((time, idx) => {
                                              if (
                                                schedule[val.day].every(
                                                  (slot, i) =>
                                                    i === index ||
                                                    time < slot.start ||
                                                    time >= slot.end ||
                                                    time === timeSlot.end
                                                )
                                              ) {
                                                return (
                                                  <option key={idx} value={time}>
                                                    {time}
                                                  </option>
                                                );
                                              }
                                              return null;
                                            })}
                                          </select>
                                      

                                      </div>
                                    ))}
                                </div>
                                {checked[val.day] === true && divIndex === dayDivCount && (
                                  <div style={{padding: "19px"}}>
                                    <img
                                      src={plus}
                                      className="fa-solid fa-plus"
                                      style={{ color: "#3093BB", fontSize: "22px" }}
                                      onClick={() => handleAddNewDiv(val.day)}
                                    ></img>
                                  </div>
                                )}
                           
                              </div>
                            ) : (
                              <div>Unavailable</div>
                            )}
                          </div>
                        );
                      })}
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
            <>
            </>
          )}
        </table>
      </Modal.Body>
    </Modal>
  );
};
