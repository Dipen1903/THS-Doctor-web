import React, { useState } from "react";
import "./SlotTime.css";
import Toggle from "./Toggle";
import light from "../../../../Assets/img/svg/light.svg";
import plus from "../../../../Assets/img/svg/plus.svg";
import arrow from "../../../../Assets/img/png/light.svg";

const weekDays = [
  {
    id: 1,
    day: "Sun",
    available: true,
    text: "",
  },
  {
    id: 2,
    day: "Mon",
    available: true,
    text: "",
  },
  {
    id: 3,
    day: "Tue",
    available: true,
    text: "",
  },
  {
    id: 4,
    day: "Wed",
    available: false,
    text: "unavailable",
  },
  {
    id: 5,
    day: "Thur",
    available: false,
    text: "unavailable",
  },
  {
    id: 6,
    day: "Fri",
    available: false,
    text: "unavailable",
  },
  {
    id: 7,
    day: "Sat",
    available: false,
    text: "unavailable",
  },
];

const WeekSlot = () => {
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

  return (
    <div className="week-days-container">
      {weekDays.map((val) => {
        const dayDivCount = addedDivs[val.day] || 0;

        return (
          <div className="edit_time_slot_mainss" key={val.id} style={{marginLeft:"1rem"}}>
            <div className="map_main_divss">
              {Array.from(Array(dayDivCount + 1), (_, index) => index).map(
                (divIndex) => {
                  const pickerId = divIndex + 1;
                  return (
                    <div className="time-pickerss" key={pickerId}>
                      {divIndex === 0 && (
                        <div className="toggle-label">
                          <Toggle label={val.day} />
                        </div>
                      )}

                      {divIndex !== 0 && (
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

                      {val.available === true ? (
                        <>
                          <div className="clock">
                            <input type="time" className="time-day" />
                          </div>
                          <p>-</p>
                          <div className="clock">
                            <input type="time" className="time-day" />
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {val.available === true && divIndex === dayDivCount && (
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
  );
};

export default WeekSlot;
