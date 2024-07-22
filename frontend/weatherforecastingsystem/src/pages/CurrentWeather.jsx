import React, { useState } from 'react';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    const apiKey = '9e6f3bd5805158e8a9a9469fa5eae905'; // Replace with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }
      setWeather(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching weather:", error);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeather(position.coords.latitude, position.coords.longitude);
    }, (err) => {
      setError(err.message);
    });
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Get Current Weather</button>
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
