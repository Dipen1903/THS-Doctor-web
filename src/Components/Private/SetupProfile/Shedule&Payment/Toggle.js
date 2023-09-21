import React, { useState, useEffect } from "react";
import "./Toggle.css";

const Toggle = ({ label, onToggleChange, initialChecked }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onToggleChange(newCheckedState);
  };

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  return (
    <div className="main_toggle_div">
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          value={label}
          checked={isChecked}
          onChange={handleToggleChange}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
      <p className="toggle_label">{label}</p>
    </div>
  );
};

export default Toggle;
