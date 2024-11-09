import React, { useEffect, useState } from 'react';
import './Weather.css';
import searchicon from '../assets/search.png';
import clearicon from '../assets/clear.png';
import cloudicon from '../assets/cloud.png';
import humidityicon from '../assets/humidity.png';
import drizzleicon from '../assets/drizzle.png';
import windicon from '../assets/wind.png';
import snowicon from '../assets/snow.png';
import rainicon from '../assets/rain.png';

const Weather = () => {
  const [weatherdata, setweatherdata] = useState(null);
  const [city, setCity] = useState("Lahore");

  const allicon = {
    "01d": clearicon,
    "01n": clearicon,
    "02d": cloudicon,
    "02n": cloudicon,
    "03d": cloudicon,
    "03n": cloudicon,
    "04d": drizzleicon,
    "04n": drizzleicon,
    "09d": rainicon,
    "09n": rainicon,
    "10d": rainicon,
    "10n": rainicon,
    "13d": snowicon,
    "13n": snowicon,
  };

  const search = async (city) => {
    if(city===""){
        alert("enter city name");
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allicon[data.weather[0].icon] || clearicon;
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(error)
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className='Weather'>
      <div className="search-bar">
        <input
          type='search'
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search(city)}
        />
        <img src={searchicon} alt='search icon' onClick={() => search(city)} />
      </div>

      {weatherdata && (
        <>
          <img src={weatherdata.icon} alt="weather icon" className='weather-icon' />
          <p className='temperature'>{weatherdata.temperature}°C</p>
          <p className='location'>{weatherdata.location}</p>

          <div className="weatherdata">
            <div className="col">
              <img src={humidityicon} alt="humidity icon" />
              <div>
                <p>{weatherdata.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={windicon} alt="wind icon" />
              <div>
                <p>{weatherdata.windspeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
