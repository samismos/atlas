import '../Map.css';
import React, { useState } from 'react';
import { Switch } from 'antd';


const OpenStationSwitch = ({ onSwitchChange, showOpenStations, }) => {
    const [switchValue, setSwitchValue] = useState(showOpenStations);
  
    const handleSwitchChange = (value) => {
      setSwitchValue(value);
      onSwitchChange(value);
    }
  
    return (
      <div className='switch-container'>
        <label>
          <Switch defaultChecked={false} checked={switchValue} onChange={handleSwitchChange} />
          &nbsp;Show only open stations
        </label>
      </div>
    );
  }

  export { OpenStationSwitch };