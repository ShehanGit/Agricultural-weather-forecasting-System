import React, { useState } from 'react';
import NavBar from '../components/NavBar';


function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    const apiKey = '1eceee44619179169ee5a912cc84231f';  // Use your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }
      setWeather(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setWeather(null); // Clear previous weather data on error
      console.error("Error fetching weather:", error);
    }
  };

  const fetchWeatherByCity = async () => {
    const apiKey = '1eceee44619179169ee5a912cc84231f';  // Use your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }
      setWeather(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setWeather(null); // Clear previous weather data on error
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
      setError('Error retrieving your location: ' + err.message);
      setWeather(null); // Clear previous weather data on location error
    });
  };

  return (
    <div>
        <NavBar/>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeatherByCity}>Search Weather</button>
      </div>
      <button onClick={handleGetLocation}>Get Current Location Weather</button>
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Feels Like: {weather.main.feels_like}°C</p>
            <p>Condition: {weather.weather[0].main}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Wind Direction: {weather.wind.deg} degrees</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
            <p>Visibility: {weather.visibility / 1000} km</p>
            <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
