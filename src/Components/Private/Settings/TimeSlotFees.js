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
import { SlotFirstList, SlotListDoctor, slotdata, toggleFee } from "../../../Store/Reducers/ProfileReducer.js";
import light from "../../../Assets/img/svg/light.svg";
import plus from "../../../Assets/img/svg/plus.svg";
import Toggle from "../SetupProfile/Shedule&Payment/Toggle";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { EditScheduleAPI } from "../../../Routes/Service.js";
function Timeslotfees() {
  const [scheduleData, setScheduleData] = useState({ ...ScheduleEnum });
  const dispatch = useDispatch();
  const { userProfile, slotlistdoctor } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [chkValue, setChkValue] = useState(false);
  const [edit, setEdit] = useState(false);
  const [start, setStart] = useState("");
  const [newDatasec, setNewDatasec] = useState();
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
  const { slotlistdata, firstlistinslot } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  console.log("firstlistinslot", firstlistinslot);
  console.log("slotlistdata", slotlistdata);
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

  // const [text, setText] = useState(false);
  const handleAddNewDiv = (day) => {
    // setText(day, "If you need add more time then you need to go mobile App");
    // addNewDiv();
    // setText({
    //   ...text,
    //   [day]: "If you need add more time then you need to go mobile App",
    // });
    toast.error("If you need add more time then you need to go mobile App")

  };

  const addNewDivEdit = (day, startTime) => {
    console.log("startTimestartTime", startTime);
    if (startTime) {
      console.log("dsxfdsse");
      addNewDiv();
      setAddedDivs({
        ...addedDivs,
        [day]: (addedDivs[day] || 0) + 1,
      });
    }
  }
  console.log("slotlistdoctor", slotlistdoctor);
  const [checked, SetChecked] = useState({
    sunday: slotlistdoctor?.saved_time_slot?.sunday === null ? false : true,
    monday: slotlistdoctor?.saved_time_slot?.monday === null ? false : true,
    tuesday: slotlistdoctor?.saved_time_slot?.tuesday === null ? false : true,
    wednesday: slotlistdoctor?.saved_time_slot?.wednesday === null ? false : true,
    thursday: slotlistdoctor?.saved_time_slot?.thursday === null ? false : true,
    friday: slotlistdoctor?.saved_time_slot?.friday === null ? false : true,
    saturday: slotlistdoctor?.saved_time_slot?.saturday === null ? false : true,
  });
  useEffect(() => {
    SetChecked({
      sunday: slotlistdoctor?.saved_time_slot?.sunday === null ? false : true,
      monday: slotlistdoctor?.saved_time_slot?.monday === null ? false : true,
      tuesday: slotlistdoctor?.saved_time_slot?.tuesday === null ? false : true,
      wednesday: slotlistdoctor?.saved_time_slot?.wednesday === null ? false : true,
      thursday: slotlistdoctor?.saved_time_slot?.thursday === null ? false : true,
      friday: slotlistdoctor?.saved_time_slot?.friday === null ? false : true,
      saturday: slotlistdoctor?.saved_time_slot?.saturday === null ? false : true,
    })
    setWeekDays([
      {
        id: 1,
        day: "sunday",
        checked: slotlistdoctor?.saved_time_slot?.sunday === null ? false : true
      },
      {
        id: 2,
        day: "monday",
        checked: slotlistdoctor?.saved_time_slot?.monday === null ? false : true,
      },
      {
        id: 3,
        day: "tuesday",
        checked: slotlistdoctor?.saved_time_slot?.tuesday === null ? false : true,
      },
      {
        id: 4,
        day: "wednesday",
        checked: slotlistdoctor?.saved_time_slot?.wednesday === null ? false : true
      },
      {
        id: 5,
        day: "thursday",
        checked: slotlistdoctor?.saved_time_slot?.thursday === null ? false : true
      },
      {
        id: 6,
        day: "friday",
        checked: slotlistdoctor?.saved_time_slot?.friday === null ? false : true,
      },
      {
        id: 7,
        day: "saturday",
        checked: slotlistdoctor?.saved_time_slot?.saturday === null ? false : true
      },
    ])
  }, [slotlistdoctor])
  console.log("checked", firstlistinslot);

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

  const [listOfData, setListOfData] = useState();
  useEffect(() => {
    callApis()
  }, [dispatch, edit])

  const callApis = async () => {
    const result = await dispatch(SlotListDoctor())
    setListOfData(result?.payload?.data?.saved_time_slot)
    dispatch(SlotFirstList())
  }


  const [selectedTimeSlotsBetween, setSelectedTimeSlotsBetween] = useState([]);
  const [selectedTimeSlotsEdit, setSelectedTimeSlotsEdit] = useState();
  const [dataddd, setDtaaaa] = useState()
  const handleSlotChange = (day, index, timeSlotType, slotValue) => {
    if (edit) {

      const newData = {};
      console.log("timeSlotType", timeSlotType);
      daysOfWeek.forEach((day) => {
        const dayData = listOfData[day];
        if (dayData) {
          newData[day] = {
            days: [day],
            time_period: JSON.parse(dayData).time_period,
          };
        }
      });
      setDtaaaa(newData)
      console.log("newData[day]newData[day]newData[day]", newData[day], newData[day].time_period[index - 1], index, slotValue, timeSlotType === "start_time");
      // if (newData[day]) {
      //   if (newData[day].time_period[index - 1]) {
      //     let existingStartTime;
      //     if (timeSlotType === "start_time") {
      //       // Update the start_time for the selected day and index
      //       let sta = newData[day].time_period[index - 1].start_time = slotValue;
      //       setStart(sta)
      //     } else if (timeSlotType === "end_time") {
      //       // Preserve the existing start_time and update the end_time for the selected day and index
      //       // const existingStartTime = newData[day].time_period[index - 1].start_time;
      //       console.log("ex", existingStartTime );
      //       newData[day].time_period[index - 1].end_time = slotValue; // Update only end_time
      //       newData[day].time_period[index - 1].start_time = start; // Preserve the existing start_time
      //     }
      //   } else {
      //     // Handle the case where the index does not exist
      //     console.error("Selected index does not exist in newData.");
      //   }
      // } else {
      //   // Handle the case where the day does not exist
      //   console.error("Selected day does not exist in newData.");
      //   // Create a new time slot for the day with the selected time
      //   newData[day] = {
      //     days: [day],
      //     time_period: [
      //       {
      //         start_time: timeSlotType === "start_time" ? slotValue : "",
      //         end_time: timeSlotType === "end_time" ? slotValue : "",
      //       },
      //     ],
      //   };
      // }
      console.log("dataddd[day]", dataddd);
      if (dataddd != undefined) {
        const updatedDaysData = { ...dataddd }; // Create a copy of the object

        if (updatedDaysData[day]) {
          const dayData = { ...updatedDaysData[day] };
          const timePeriod = [...dayData.time_period];

          if (timePeriod[index - 1]) {
            if (timeSlotType === "start_time") {
              timePeriod[index - 1].start_time = slotValue;
            } else if (timeSlotType === "end_time") {
              timePeriod[index - 1].end_time = slotValue;
            }
          } else {
            // Handle the case where the index does not exist
            console.error("Selected index does not exist in timePeriod.");
          }

          dayData.time_period = timePeriod;
          updatedDaysData[day] = dayData;
        }

        // Set the updated object as the new state
        setDtaaaa(updatedDaysData);


        // const updatedState = { ...newData };
        // const []
        // if (updatedState[day]) {
        //   const dayData = { ...updatedState[day] };
        //   const timePeriod = [...dayData.time_period];

        //   if (timePeriod[index - 1]) {
        //     if (timeSlotType === "start_time") {
        //       timePeriod[index - 1].start_time = slotValue;
        //     } else if (timeSlotType === "end_time") {
        //       timePeriod[index - 1].start_time = originalStartValue;
        //       timePeriod[index - 1].end_time = slotValue;
        //     }
        //   } else {
        //     // Handle the case where the index does not exist
        //     console.error("Selected index does not exist in timePeriod.");
        //   }

        //   dayData.time_period = timePeriod;
        //   updatedState[day] = dayData;
        //   newData(updatedState);
        // }
        // const updatedState = { ...newData };
        // console.log("updatedStateupdatedStateupdatedState", updatedState);
        // const dayData = { ...updatedState[day] };
        // const timePeriod = [...dayData.time_period];
        // console.log("slotValueslotValue", slotValue);
        // if (timePeriod[index - 1]) {
        //   if (timeSlotType === "start_time") {
        //     console.log("sttttttttt");
        //     timePeriod[index - 1].start_time = slotValue;
        //   } else if (timeSlotType === "end_time") {
        //     console.log("endddddddd");
        //     timePeriod[index - 1].end_time = slotValue;
        //   }
        // } else {
        //   // Handle the case where the index does not exist
        //   console.error("Selected index does not exist in timePeriod.");
        // }

        // dayData.time_period = timePeriod;
        // updatedState[day] = dayData;
        // console.log("updatedState", updatedState);
        // setState(updatedState); // Update the state directly
      } else {
        const updatedDaysData = { ...newData }; // Create a copy of the object

        if (updatedDaysData[day]) {
          const dayData = { ...updatedDaysData[day] };
          const timePeriod = [...dayData.time_period];

          if (timePeriod[index - 1]) {
            if (timeSlotType === "start_time") {
              timePeriod[index - 1].start_time = slotValue;
            } else if (timeSlotType === "end_time") {
              timePeriod[index - 1].end_time = slotValue;
            }
          } else {
            // Handle the case where the index does not exist
            console.error("Selected index does not exist in timePeriod.");
          }

          dayData.time_period = timePeriod;
          updatedDaysData[day] = dayData;
        }

        // Set the updated object as the new state
        setDtaaaa(updatedDaysData);
      }


      // setNewDatasec(newData)
      console.log("newDat----", dataddd);

      // const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

      // // Create a new object with the desired format
      // const newData = {};

      // daysOfWeek.forEach((day) => {
      //   const dayData = listOfData[day];
      //   if (dayData) {
      //     newData[day] = {
      //       days: [day],
      //       time_period: JSON.parse(dayData).time_period,
      //     };
      //   }
      // });


      // // Object.keys(newData).forEach((day) => {
      // //   formattedData[day] = JSON.stringify(newData[day]);
      // // });

      // const dayToUpdate = day;

      // if (newData[dayToUpdate]) {
      //   // Update the time slots for the existing day
      //   newData[dayToUpdate].time_period = timeSlots; // Replace timeSlots with the updated time slots
      // } else {
      //   // Add a new day with time slots
      //   newData[dayToUpdate] = {
      //     days: [dayToUpdate],
      //     time_period: timeSlots, // Replace timeSlots with the time slots for the new day
      //   };
      // }


      // const updatedFormattedData = {};
      // for (const day of Object.keys(newData)) {
      //   updatedFormattedData[day] = JSON.stringify(newData[day]);
      // }


      // console.log("timeSlotType", timeSlotType);
      // console.log("slotValue", slotValue);
      // console.log("day", day);

      // const updatedDaySlots = { ...(selectedTimeSlotsEdit[day] || {}) };
      // console.log("updatedDaySlots", updatedDaySlots);
      // SetDay(day);
      // if (!updatedDaySlots[index]) {
      //   updatedDaySlots[index] = {
      //     start_time: '', end_time: ''
      //   };
      // }
      // updatedDaySlots[index][timeSlotType] = slotValue;
      // setSelectedTimeSlotsEdit({
      //   ...selectedTimeSlotsEdit,
      //   [day]: updatedDaySlots,
      // });

      // // Update selectedDayForHidetime and calculate timeSlotsBetween regardless of the condition
      // setSelectedDayForHidetime(day);

      // if (timeSlotType === "start_time") {
      //   setSelectedStartTimes({
      //     ...selectedStartTimes,
      //     [`${day}_${index}`]: slotValue,
      //   });
      // }
      // const startTime = selectedStartTimes[`${day}_${index}`];
      // const endTime = updatedDaySlots[index].end_time;

      // if (startTime && endTime) {
      //   const timeSlotsBetween = generateTimeSlotsBetween(startTime, endTime, day);
      //   setSelectedTimeSlotsBetween(timeSlotsBetween);
      // } else {
      //   setSelectedTimeSlotsBetween([]);
      // }
    } else {
      console.log("timeSlotType", timeSlotType);
      console.log("slotValue", slotValue);
      console.log("day", day);

      const updatedDaySlots = { ...(selectedTimeSlots[day] || {}) };
      console.log("updatedDaySlots", updatedDaySlots);
      SetDay(day);
      if (!updatedDaySlots[index]) {
        updatedDaySlots[index] = {
          start_time: '', end_time: ''
        };
      }
      updatedDaySlots[index][timeSlotType] = slotValue;
      setSelectedTimeSlots({
        ...selectedTimeSlots,
        [day]: updatedDaySlots,
      });

      // Update selectedDayForHidetime and calculate timeSlotsBetween regardless of the condition
      setSelectedDayForHidetime(day);

      if (timeSlotType === "start_time") {
        setSelectedStartTimes({
          ...selectedStartTimes,
          [`${day}_${index}`]: slotValue,
        });
      }
      const startTime = selectedStartTimes[`${day}_${index}`];
      const endTime = updatedDaySlots[index].end_time;

      if (startTime && endTime) {
        const timeSlotsBetween = generateTimeSlotsBetween(startTime, endTime, day);
        setSelectedTimeSlotsBetween(timeSlotsBetween);
      } else {
        setSelectedTimeSlotsBetween([]);
      }
    }
  };

  const [hidetime, setHidetime] = useState([]);
  const [selectedDayForHidetime, setSelectedDayForHidetime] = useState("");
  const [firstClickForDay, setFirstClickForDay] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  console.log("hidetime", hidetime);



  const generateTimeSlotsBetween = (startTime, endTime, day) => {
    const data = firstlistinslot[dayoftime];
    console.log("data++++++", data);
    const startTimeMoment = moment(startTime, 'hh:mm a');
    const endTimeMoment = moment(endTime, 'hh:mm a');

    if (!data || !startTimeMoment.isValid() || !endTimeMoment.isValid()) {
      return [];
    }

    const timeSlots = [];
    console.log("timeSlots+++", timeSlots);

    const startDate = moment(startTimeMoment);

    while (startDate.isBefore(endTimeMoment)) {
      timeSlots.push(startDate.format('hh:mm A')); // Format as desired
      console.log("timeSlots============", timeSlots);
      startDate.add(15, 'minutes'); // Add 15 minutes
    }

    if (day === selectedDayForHidetime) {
      setHidetime((prevHidetime) => [...prevHidetime, ...timeSlots]);
    } else {
      setHidetime([]);
    }
    return timeSlots;
  };

  // const transformedData = {};
  // const [transformedData, setTransformedData] = useState({});
  // Object.keys(selectedTimeSlots).forEach((day) => {
  //   const dayData = selectedTimeSlots[day];
  //   const dayObj = {
  //     days: [day],
  //     time_period: {},
  //   };

  //   Object.keys(dayData).forEach((slotIndex) => {
  //     const slot = dayData[slotIndex];
  //     dayObj.time_period = [{
  //       start_time: slot.start,
  //       end_time: slot.end
  //     }];
  //   });
  //   transformedData[day] = JSON.stringify(dayObj);
  // });

  // const [transformedData, setTransformedData] = useState({});

  // // Create a new object for each day in selectedTimeSlots
  // const transformedDataCopy = {};

  // Object.keys(selectedTimeSlots).forEach((day) => {
  //   const dayData = selectedTimeSlots[day];
  //   const dayObj = {
  //     days: [day],
  //     time_period: {},
  //   };

  //   Object.keys(dayData).forEach((slotIndex) => {
  //     const slot = dayData[slotIndex];
  //     dayObj.time_period = [{
  //       start_time: slot.start,
  //       end_time: slot.end,
  //     }];
  //   });

  //   // Store the new object in the transformedDataCopy
  //   transformedDataCopy[day] = JSON.stringify(dayObj);
  // });

  // // Update the state with the new transformedDataCopy
  // setTransformedData(transformedDataCopy);
  // console.log("transformedData", transformedData);


  // useEffect(() => {
  //   handleSaveSchedule();
  // }, [transformedData]);
  // const handleSaveSchedule = () => {
  //   dispatch(slotdata(transformedData));
  // };
  const formattedData = {};
  // const [transformedData, setTransformedData] = useState(selectedTimeSlots);

  // useEffect(() => {
  //   // Create a new object for each day in selectedTimeSlots
  //   const transformedDataCopy = {};

  //   Object.keys(selectedTimeSlots).forEach((day) => {
  //     const dayData = selectedTimeSlots[day];
  //     const dayObj = {
  //       days: [day],
  //       time_period: {},
  //     };

  //     Object.keys(dayData).forEach((slotIndex) => {
  //       const slot = dayData[slotIndex];
  //       dayObj.time_period = [{
  //         start_time: slot.start_time,
  //         end_time: slot.end_time,
  //       }];
  //     });

  //     transformedDataCopy[day] = JSON.stringify(dayObj);
  //   });

  //   // Update the state with the new transformedDataCopy
  //   setTransformedData(transformedDataCopy);
  // }, [selectedTimeSlots]);

  // useEffect(() => {
  //   handleSaveSchedule();
  // }, [transformedData]);

  // const handleSaveSchedule = () => {
  //   dispatch(slotdata(transformedData));
  // };



  function getSelectedStartTime(day, pickerId) {
    if (listOfData && listOfData[day]) {
      const timePeriod = JSON.parse(listOfData[day]).time_period;
      if (timePeriod && timePeriod[pickerId - 1]) {
        const startTime = timePeriod[pickerId - 1].start_time;
        if (startTime && startTime !== "") {
          return startTime;
        }
      }
    }
    return ""; // Return a default value if the data is not found
  }




  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const timePeriods = {};
  if (listOfData) {
    daysOfWeek.forEach((day) => {
      const dayData = listOfData[day];
      const parsedData = JSON.parse(dayData);
      timePeriods[day] = parsedData.time_period;
    });
  }

  console.log("timePeriods", listOfData);
  function getSelectedEndTime(day, pickerId) {
    if (listOfData && listOfData[day]) {
      const timePeriod = JSON.parse(listOfData[day]).time_period;
      if (timePeriod && timePeriod[pickerId - 1]) {
        const endTime = timePeriod[pickerId - 1].end_time;
        if (endTime && endTime !== "") {
          return endTime;
        }
      }
    }
    return ""; // Return a default value if the data is not found
  }

  const callEditData = async () => {
    // console.log("transformedData---", transformedData);
    if (dataddd?.sunday) {
      const formattedData = {};

      for (const day in dataddd) {
        if (dataddd.hasOwnProperty(day)) {
          formattedData[day] = JSON.stringify(dataddd[day]);
        }
      }
      console.log("fdfdfdf", formattedData);
      setEdit(false)
      const data = await dispatch(EditScheduleAPI(formattedData));
    } else {
      console.log("dfdfdfdfdf",);

      const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

      // Create a new object with the desired format
      const newData = {};

      daysOfWeek.forEach((day) => {
        const dayData = listOfData[day];
        if (dayData) {
          newData[day] = {
            days: [day],
            time_period: JSON.parse(dayData).time_period,
          };
        }
      });


      Object.keys(newData).forEach((day) => {
        formattedData[day] = JSON.stringify(newData[day]);
      });


      // const newDataJSON = JSON.stringify(newData);
      // console.log("newData", newDataJSON);
      const data = await dispatch(EditScheduleAPI(formattedData));
    }

  }


  console.log("seee", selectedTimeSlots);
  return (
    <>
      <ToastContainer />
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
                    callEditData()
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
                                  const dayData = timePeriods[val.day];
                                  const editDayData = selectedTimeSlots[val.day];
                                  // const showText = text[val.day]
                                  return (
                                    <div className="edit_time_slot_mainss" key={val.id} style={{ marginLeft: "1rem" }}>
                                      <div className="map_main_divss">
                                        {Array.from(Array(dayDivCount + 1), (_, index) => index).map(
                                          (divIndex) => {
                                            const pickerId = divIndex + 1;
                                            const selectedData = dayData && dayData[pickerId - 1] || {};
                                            const editSelectedData = editDayData && editDayData[pickerId] || {};
                                            // { console.log("333333", showText && showText, showText && showText[pickerId - 1]); }
                                            // const showTextData = showText && showText || "";

                                            // console.log("pickerId", pickerId);
                                            // const selectedSlot = selectedTimeSlots[val.day] || ""
                                            return (
                                              <>
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
                                                          onChange={(e) => { handleSlotChange(val.day, divIndex + 1, 'start_time', e.target.value); setStartTime(e.target.value); SetDay(val.day); }
                                                          }
                                                          className="time-day"
                                                          placeholder="-- -- --"
                                                          value={!edit ? selectedData?.start_time : editSelectedData?.start_time}
                                                          disabled={!edit ? true : false}
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
                                                            firstlistinslot[val.day] &&
                                                            firstlistinslot[val.day]
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
                                                          onChange={(e) => { handleSlotChange(val.day, divIndex + 1, 'end_time', e.target.value); setEndTime(e.target.value); SetDay(val.day) }
                                                          }
                                                          value={!edit ? selectedData?.end_time : editSelectedData?.end_time}
                                                          className="time-day"
                                                          style={{
                                                            background: "none",
                                                            border: "none",
                                                            backgroundColor: "#ecf2ff",
                                                            fontSize: "15px",
                                                            padding: "10px 30px",
                                                            borderRadius: "8px",
                                                          }}
                                                          disabled={!edit ? true : false}
                                                        >
                                                          <option> -- -- --</option>
                                                          {firstlistinslot[val.day]
                                                            ?.map((slot) => (
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
                                                        onClick={() => !edit ? addNewDivEdit(val.day, selectedData?.start_time) : handleAddNewDiv(val.day)}
                                                      ></img>
                                                    </div>
                                                  )}
                                                </div>
                                                {/* {console.log("showTextData", showTextData)}
                                                <p>{showTextData}</p> */}
                                              </>
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

