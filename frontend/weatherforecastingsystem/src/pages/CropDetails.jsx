import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/CropDetails.css';

function CropDetails() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/crops/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch crop data");
      }
      setCrop(data);
    } catch (error) {
      setError(error.message);
      setCrop(null);
      console.error("Error fetching crop details:", error);
    }
  };

  const fetchWeatherAndForecast = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }
    try {
      const weatherResponse = await fetch(`http://localhost:8080/api/weather/city?city=${city}`);
      const weatherData = await weatherResponse.json();
      console.log("Weather API Response:", weatherData);
      if (!weatherResponse.ok) {
        throw new Error(weatherData.message || "Failed to fetch weather data");
      }
      setWeather(weatherData);

      const forecastResponse = await fetch(`http://localhost:8080/api/forecast?city=${city}`);
      const forecastData = await forecastResponse.json();
      console.log("Forecast API Response:", forecastData);
      if (!forecastResponse.ok) {
        throw new Error(forecastData.message || "Failed to fetch forecast data");
      }
      setForecast(forecastData);

      generateRecommendations(weatherData, forecastData);
    } catch (error) {
      setError(error.message);
      setWeather(null);
      setForecast(null);
      console.error("Error fetching weather or forecast:", error);
    }
  };

  const generateRecommendations = (weatherData, forecastData) => {
    if (!crop) return;
    let recommendations = '';

    // Temperature-based recommendations
    if (weatherData.main?.temp < crop.optimalTemperatureMin) {
      recommendations += 'The current temperature is below optimal. Consider using protective measures to maintain warmth for the crop.\n';
    } else if (weatherData.main?.temp > crop.optimalTemperatureMax) {
      recommendations += 'The current temperature is above optimal. Consider providing shade or increasing irrigation to cool the crop.\n';
    } else {
      recommendations += 'The current temperature is within the optimal range for the crop.\n';
    }

    // Rainfall-based recommendations
    if (forecastData && forecastData.rainfall > 1) {
      recommendations += 'The rainfall is expected to be more than 1mm. Consider reducing the irrigation amount to prevent overwatering.\n';
    } else if (forecastData && forecastData.rainfall <= 1) {
      recommendations += 'The expected rainfall is less than 1mm. Consider supplying additional irrigation to the crops if needed.\n';
    }

    setRecommendation(recommendations);
  };

  return (
    <div>
      <NavBar />
      <div className="crop-details-container">
        {error && <p className="error">Error: {error}</p>}
        {crop && (
          <div className="crop-details">
            <h1>{crop.cropName}</h1>
            <p>Type: {crop.cropType}</p>
            <p>Optimal Temperature: {crop.optimalTemperatureMin}°C - {crop.optimalTemperatureMax}°C</p>
            <p>Optimal Humidity: {crop.optimalHumidity}%</p>
            <p>Soil Type: {crop.soilType}</p>
            <p>Planting Season: {crop.plantingSeason}</p>
            <p>Harvest Time: {crop.harvestTime}</p>
            <p>pH Requirement: {crop.phRequirementMin} - {crop.phRequirementMax}</p>
            <p>Nutrient Requirements: {crop.nutrientRequirements}</p>
            <p>Yield per Hectare: {crop.yieldPerHectare} kg</p>
            <p>Disease Resistance: {crop.diseaseResistance}</p>
            <p>Pest Sensitivity: {crop.pestSensitivity}</p>
          </div>
        )}
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError(null);
            }}
            placeholder="Enter city for weather and forecast"
          />
          <button className="button" onClick={fetchWeatherAndForecast}>Search</button>
        </div>
        {weather && (
          <div className="weather-details">
            <h2>Weather in {weather.name}</h2>
            <p>Temperature: {weather.main?.temp}°C</p>
            <p>Condition: {weather.weather?.[0]?.main}</p>
            <p>Humidity: {weather.main?.humidity}%</p>
            <p>Wind Speed: {weather.wind?.speed} m/s</p>
          </div>
        )}
        {forecast && (
          <div className="forecast-details">
            <h2>Forecast for {city}</h2>
            <p>Temperature: {forecast.temperature}°C</p>
            <p>Humidity: {forecast.humidity}%</p>
            <p>Wind Speed: {forecast.windSpeed} m/s</p>
            <p>Rainfall: {forecast.rainfall} mm</p>
          </div>
        )}
        {recommendation && (
          <div className="recommendation">
            <h3>Recommendation</h3>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropDetails;