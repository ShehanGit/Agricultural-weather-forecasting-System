import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/CropDetails.css';

function CropDetails() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [weather, setWeather] = useState(null);
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

  const fetchWeatherByCity = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/weather/city?city=${city}`);
      const data = await response.json();
      console.log("Weather API Response:", data); // Log the response
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }
      setWeather(data);
      generateRecommendations(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
      console.error("Error fetching weather:", error);
    }
  };

  const generateRecommendations = (weatherData) => {
    if (!crop) return;
    if (weatherData.main?.temp < crop.optimalTemperatureMin) {
      setRecommendation('The current temperature is below optimal. Consider using protective measures to maintain warmth for the crop.');
    } else if (weatherData.main?.temp > crop.optimalTemperatureMax) {
      setRecommendation('The current temperature is above optimal. Consider providing shade or increasing irrigation to cool the crop.');
    } else {
      setRecommendation('The current temperature is within the optimal range for the crop.');
    }
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
            placeholder="Enter city for weather"
          />
          <button className="button" onClick={fetchWeatherByCity}>Get Weather</button>
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