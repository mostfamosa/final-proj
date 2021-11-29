import React from 'react';
import './Switch.css';
import './SensorsInfo.css'

const Switch = ({isOn,handleToggle}) => {
  return (
    <div>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;