import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/CurrentWeather.css'; 
import { useNavigate } from 'react-router-dom';


function CurrentWeather() {
    const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '9e6f3bd5805158e8a9a9469fa5eae905'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchWeather();
  }, []);
    
    return (
        <div>
            <NavBar />
            {weather ? (
        <div>
          <h1>Current Weather in {weather.name}</h1>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
        </div>
    );
}

export default CurrentWeather;
