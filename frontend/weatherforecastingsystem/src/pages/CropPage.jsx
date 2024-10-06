import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import '../css/CropPage.css';

function CropApp() {
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState(null);

  const fetchCrops = async () => {
    const url = 'http://localhost:8080/crops';
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch crop data");
      }
      setCrops(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setCrops([]);
      console.error("Error fetching crops:", error);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="crop-container">
        <h1>Crop List</h1>
        {error && <p className="error">Error: {error}</p>}
        <div className="crop-list">
          {crops.length === 0 && !error && <p>No crops available.</p>}
          {crops.map((crop) => (
            <div key={crop.id} className="crop-card">
              <h2>{crop.cropName}</h2>
              <p>Type: {crop.cropType}</p>
              <p>Optimal Temperature: {crop.optimalTemperatureMin}°C - {crop.optimalTemperatureMax}°C</p>
              <p>Optimal Humidity: {crop.optimalHumidity}%</p>
              <p>Soil Type: {crop.soilType}</p>
              <p>Irrigation Requirement: {crop.irrigationRequirement}</p>
              <p>Planting Season: {crop.plantingSeason}</p>
              <p>Harvest Time: {crop.harvestTime}</p>
              <p>pH Requirement: {crop.phRequirementMin} - {crop.phRequirementMax}</p>
              <p>Nutrient Requirements: {crop.nutrientRequirements}</p>
              <p>Yield per Hectare: {crop.yieldPerHectare} kg</p>
              <p>Disease Resistance: {crop.diseaseResistance}</p>
              <p>Pest Sensitivity: {crop.pestSensitivity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CropApp;