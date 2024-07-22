import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './Forcast.css';

function Forecast() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = '1eceee44619179169ee5a912cc84231f'; 
      const city = 'London'; 
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
        <div className="Forecast-container">
    
    <h1 className="Forecast-title">Forecast</h1>
    <div>
      {weatherData ? (
        <ul className="Forecast-list">
          {weatherData.list.slice(0, 4).map((item, index) => (
            <li key={index} className="Forecast-list-item">
            <h2>{new Date(item.dt * 1000).toLocaleDateString()} - {item.weather[0].main}</h2>
            <p>Temp: {item.main.temp}°C</p>
            <p>Description: {item.weather[0].description}</p>
            <p>Wind: {item.wind.speed} m/s, Direction: {item.wind.deg}°</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Pressure: {item.main.pressure} hPa</p>
            <p>Cloudiness: {item.clouds.all}%</p>
            {item.rain && <p>Rain: {item.rain['3h']} mm</p>}
            {item.snow && <p>Snow: {item.snow['3h']} mm</p>}
          </li>
          ))}
        </ul>
      ) : (
        <p className="Loading-message">Loading weather data...</p>
      )}
    </div>
  </div>
  </div>
);

}

export default Forecast;
