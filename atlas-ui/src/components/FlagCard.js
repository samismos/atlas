import '../Map.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { FaFlag } from 'react-icons/fa'; // For the flag icon

function FlagCard({ selectedCountry }) {
    const [flagInfo, setFlagInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      axios.get(`${process.env.REACT_APP_BASE_URI}/get-country-flag?selectedCountry=${selectedCountry}`)
        .then((response) => {
          setFlagInfo(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching country flag:', error);
          setIsLoading(false);
        });
    }, [selectedCountry]);
  
    return (
      <div>
        {!isMinimized ? (
          <div className='button-container'>
            <button className='flag-button' onClick={() => setIsMinimized(!isMinimized)}>
            <span>{selectedCountry}</span>
    <div className="flag-icon top-right"><FaFlag /></div>
    <div className="flag-icon bottom-left"><FaFlag /></div>
            </button>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className='card-container'>
              <div className='loading-spinner'></div>
              <div>Loading...</div>
              </div>
            ) : (
              flagInfo && (
                <div className='card-container'>
                <Card bordered={true} hoverable={true} title={selectedCountry} cover={<img src={flagInfo.flagLink} alt={flagInfo.countryCode} style={{ maxWidth: 256, margin: 'auto' }} />}>
                  {flagInfo.flagAlt}
                  <div><button className='flag-button' onClick={() => setIsMinimized(!isMinimized)}>Close</button></div>
                </Card>
                </div>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  export { FlagCard };