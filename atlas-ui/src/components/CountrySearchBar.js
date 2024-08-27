import '../Map.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CountrySearchBar = ({ onSelectCountry, selectedCountry }) => {
    const [countries, setCountries] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
  
    useEffect(() => {
      axios.get('geojson/countries.geojson')
        .then((response) => {
          // Assuming the response data has the structure { type: 'FeatureCollection', features: [...] }
          // Here, we extract the features array from the response and set it as the value of countries.
          if (Array.isArray(response.data?.features)) {
            const sortedCountries = response.data.features.sort((a, b) =>
              a.properties.ADMIN.localeCompare(b.properties.ADMIN)
            );
            setCountries(sortedCountries);
          }
        })
        .catch((error) => {
          console.error('Error fetching country data', error);
        });
    }, []);
  
    const handleCountryChange = (event) => {
      const newSelectedCountry = event;
      onSelectCountry(newSelectedCountry); // Notify the parent component (Map) about the selected country
      setSelectedOption(newSelectedCountry);
    };
  
    useEffect(() => {
      setSelectedOption(selectedCountry);
    }, [selectedCountry]);
    
    const countryOptions = countries.map((feature) => ({
      value: feature.properties.ADMIN,
      label: feature.properties.ADMIN
    }));
  
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: 'white', // Customize the background color of the control
        width: '100%',
        color: 'black',      
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black', // Customize the text color of options
      }),
      // Add more custom styles for other components as needed
    };
  
    return (
      <div className="dropdown-container">
        <Select options={countryOptions} onChange={
          (e) => {handleCountryChange(e.value);
          }}
          placeholder={selectedOption}
          value={selectedOption}
          styles={customStyles}/>
      </div>
    );
  };

  export { CountrySearchBar };