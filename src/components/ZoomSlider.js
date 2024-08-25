import '../Map.css';
import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';


const ZoomSlider = ({ onZoomChange, currentZoom, isZooming }) => {
    const [sliderValue, setSliderValue] = useState(currentZoom);
  
    const handleSliderChange = (value) => {
      if (!isZooming) {
        setSliderValue(value);
        onZoomChange(value);
      }
    };
  
    useEffect(() => {
      handleSliderChange(currentZoom);
    }, [currentZoom])
  
    return (
      <div className="slider-container">
        <label>
          <Slider min={2} max={18} value={sliderValue} onAfterChange={handleSliderChange} />
        </label>
      </div>
    );
  };

  export { ZoomSlider };