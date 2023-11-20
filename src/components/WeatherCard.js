import React, { useState } from 'react';
import { Card, Typography, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
// import { TypeAnimation } from 'react-type-animation';
import Typed from 'react-typed';

const WeatherCard = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({
    fashion: null,
    image: "",
    temperature: 0,
    weather: null
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleWeatherRequest = () => {
    setLoading(true);
    setButtonDisabled(true);
    setData({
      fashion: null,
      image: "",
      temperature: 0,
      weather: null
    });
    // setTimeout(() => {
    //   setData({
    //     "fashion": "For the current temperature of 4.64°C and clear sky weather, it is recommended to wear a light sweater or long-sleeve shirt as a top, paired with jeans or trousers as bottom. For shoes, a pair of closed-toe shoes or boots would be suitable. An additional outerwear such as a light jacket or coat may be needed. An accessory like a scarf or hat can also be added for extra warmth.",
    //     "image": "https://image.pollinations.ai/prompt/Hokkaido,%20geek,%20male,%20nerdy,%20casual,%20trendy,%20comfortable,%20fashion,%20maleModel",
    //     "temperature": 4.64,
    //     "weather": "Clear"
    //   });
    //   setLoading(false);
    //   setButtonDisabled(false);
    // }, 3000)
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

  const handleKeyDownLocationChange = (e) => {
    if(e.key === 'Enter') {
      handleWeatherRequest();
    }
  }

  return (
    <div className="flex w-full items-center justify-center h-screen">
      {loading && <CircularProgress color="primary" style={{zIndex: 1000,position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>}
      <Card className="w-full h-screen p-10 rounded-md shadow-lg" style={{overflow: 'auto'}}>
        <Typography variant="h4" className="flex justify-center" style={{margin: '20px'}}>
          Geek Weather
        </Typography>

        <div className='flex max-w-lg justify-center' style={{margin: 'auto'}}>
          <TextField
            label="Please enter location name"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={location}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDownLocationChange}
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
        {data.weather && 
        <Typography variant="h5" className="flex mb-2 justify-center" style={{margin: '10px'}}>
          Weather: {data.weather}
        </Typography>
        }
        {data.weather && 
        <Typography variant="h5" className="flex mb-2 justify-center" style={{margin: '10px'}}>
          Temperature: {data.temperature}°C
        </Typography>
        }
        <Typography variant="body1" className="flex-col mb-2 justify-center" paragraph>
          {data.fashion && 
            <Typed
              strings={[data.fashion]}
              typeSpeed={5}
              loop={false}
            />
          }
          {/* {data.fashion && 
            <TypeAnimation 
              splitter={(str) => str.split(/(?=)/)}
              sequence={[data.fashion, 3000, '']}
              omitDeletionAnimation={true}
              speed={{ type: 'keyStrokeDelayInMs', value: 10 }}
            />
          } */}
          {/* {data.fashion.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))} */}
        </Typography>
        
        
        <div className='w-full' style={{position: 'relative'}}>
          {!loading && data.image ?
          <img
            src={data.image}
            alt="Fashion Styles"
            className="rounded-md m-auto"
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
        
        
      </Card>
    </div>
  );
};

export default WeatherCard;
