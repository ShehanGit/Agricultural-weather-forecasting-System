import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './WeatherApp.css';

function Forecast() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = '1eceee44619179169ee5a912cc84231f'; // Replace 'YOUR_API_KEY' with your actual OpenWeather API key
      const city = 'London'; // Replace 'YOUR_CITY' with the city you want to fetch weather data for
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data could not be fetched.');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Forecast</h1>
      <div>
        {weatherData ? (
          <ul>
            {weatherData.list.slice(0, 3).map((item, index) => (
              <li key={index}>
                <h2>{new Date(item.dt * 1000).toLocaleDateString()} - {item.weather[0].main}</h2>
                <p>Temp: {item.main.temp}°C</p>
                <p>Description: {item.weather[0].description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default Forecast;
