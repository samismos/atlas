const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(express.json());


const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [process.env.ALLOWED_ORIGIN_1, "http://localhost"]; 
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

// const corsOptions = {
//   origin: '*',
// }

app.use(cors(corsOptions));

app.get('/api/get-country-flag', async (req, res) => {
  try {
    let { selectedCountry } = req.query;
    if(selectedCountry == 'United States') {
      selectedCountry = 'USA';
    }
    // Step 1: Get the 2-letter code based on selected country
    const countryCodeResponse = await axios.get(`https://restcountries.com/v3.1/name/${selectedCountry}?fields=name,cca2,population,flags`);
    // console.log(countryCodeResponse.data);  
    const countryCode = countryCodeResponse.data[0]?.cca2;
    const flagLink = countryCodeResponse.data[0]?.flags.svg;
    const flagAlt = countryCodeResponse.data[0]?.flags.alt;
    const population = countryCodeResponse.data[0]?.population;

    // Send the country data to the client
    const response = {countryCode, flagLink, flagAlt, population};
    res.send(response);

    //res.send(flagResponse.data);

  } catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).json({ error: 'Failed to fetch country data for : ',selectedCountry });
  }
});



app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
