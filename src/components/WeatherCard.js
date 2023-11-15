import React, { useState } from 'react';
import { Card, Typography, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const WeatherCard = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({
    fashion: "",
    image: "",
    temperature: 0,
    weather: "Clear"
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleWeatherRequest = () => {
    setLoading(true);
    setButtonDisabled(true);
    axios.get(`http://localhost:9000/recommend-weather?region=${location}`)
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        alert("There is a problem when getting data. Please try again.")
      })
      .finally(() => {
        setLoading(false);
        setButtonDisabled(false);
      });
  };

  const handleImageOnLoad = () => {
    setLoading(false);
  }

  return (
    <div className="flex w-full items-center justify-center h-screen">
      {loading && <CircularProgress color="primary" style={{zIndex: 1000,position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>}
      <Card className="w-full h-screen p-10 rounded-md shadow-lg">
        <Typography variant="h4" className="flex justify-center" style={{margin: '20px'}}>
          Geek Weather
        </Typography>

        <div className='flex max-w-lg justify-center' style={{margin: 'auto'}}>
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
            disabled={buttonDisabled}
          >
            Search
          </Button>
        </div>
        <Typography variant="h5" className="flex mb-2 justify-center" style={{margin: '10px'}}>
          Weather: {data.weather}
        </Typography>

        <Typography variant="h5" className="flex mb-2 justify-center" style={{margin: '10px'}}>
          Temperature: {data.temperature}°C
        </Typography>

        <Typography variant="body1" className="flex-col mb-2 justify-center" paragraph>
          {data.fashion.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Typography>
        
        {data.image &&
          <div className='w-full' style={{position: 'relative'}}>
            {!loading ?
            <img
              src={data.image}
              alt="Fashion Styles"
              className="rounded-md m-auto"
              onload={handleImageOnLoad}
              style={{position: 'absolute', width: '70%', top: '50%', left: '50%', transform: 'translate(-50%, 0)'}}
            />
            :
            <img
              src="https://media.tenor.com/ykaBF7v0ivMAAAAd/춘식이-춘식.gif"
              alt="Fashion Styles"
              className="rounded-md m-auto"
              style={{position: 'absolute', width: '70%', top: '50%', left: '50%', transform: 'translate(-50%, 0)'}}
            />
            }
          </div>
        }
        
      </Card>
    </div>
  );
};

export default WeatherCard;
