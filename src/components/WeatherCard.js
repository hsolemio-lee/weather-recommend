import React, { useState } from 'react';
import { Card, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const WeatherCard = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({
    fashion: "",
    image: "",
    temperature: 0,
    weather: "Clear"
  });

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleWeatherRequest = () => {
    axios.get(`http://localhost:9000/recommend-weather?region=${location}`)
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        alert("There is a problem when getting data. Please try again.")
      });
  };

  return (
    <div className="flex w-1/2 items-center justify-center h-screen">
      <Card className="w-full h-[60rem] p-10 rounded-md shadow-lg">
        <Typography variant="h2" className="flex justify-center" style={{margin: '20px'}}>
          Geek Weather
        </Typography>

        <div className='flex' style={{margin: '20px'}}>
          <TextField
            label="Input location"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={location}
            onChange={handleLocationChange}
          />
          <Button
            onClick={handleWeatherRequest}
            variant="contained"
            color="primary"
            className="mb-4"
          >
            Search
          </Button>
        </div>
        <Typography variant="h4" className="flex mb-2 justify-center" style={{margin: '10px'}}>
          Weather: {data.weather}
        </Typography>

        <Typography variant="h5" className="flex mb-2 justify-center" style={{margin: '10px'}}>
          Temperature: {data.temperature}°C
        </Typography>

        <Typography variant="body1" paragraph>
          {data.fashion.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Typography>
        
        {data.image &&
          <div className='w-full' style={{position: 'relative'}}>
            <img
              src={data.image}
              alt="Fashion Styles"
              className="rounded-md m-auto"
              style={{position: 'absolute', width: '70%', top: '50%', left: '50%', transform: 'translate(-50%, 0)'}}
            />
          </div>
        }
        
      </Card>
    </div>
  );
};

export default WeatherCard;
