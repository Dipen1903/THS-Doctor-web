import React from "react";
import "./Toggle.css";

const Toggle = ({ label }) => {
  return (
    <div className="main_toggle_div">
      <div className="toggle-switch">
      <input type="checkbox" className="checkbox" name={label} id={label}  value={label}/>
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
