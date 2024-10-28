import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/CropPage.css';
import axios from 'axios';

function CropePrediction() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [cropDetails, setCropDetails] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8080/predict', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const recommendedCrop = response.data['Recommended Crop'];
      if (recommendedCrop) {
        // Fetch crop details from your database if it exists
        const cropResponse = await axios.get(`http://localhost:8080/crops/${recommendedCrop}`);
        setCropDetails(cropResponse.data); // Set the crop details if the crop exists
      } else {
        setCropDetails(null); // Reset if no crop found
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError('Failed to get crop prediction. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="crop-prediction-container">
        <div className="form-container">
          <h1>Crop Prediction</h1>
          <form onSubmit={handleSubmit} className="crop-form">
            <label>N (Nitrogen):
              <input type="number" name="N" value={formData.N} onChange={handleInputChange} required />
            </label>
            <label>P (Phosphorus):
              <input type="number" name="P" value={formData.P} onChange={handleInputChange} required />
            </label>
            <label>K (Potassium):
              <input type="number" name="K" value={formData.K} onChange={handleInputChange} required />
            </label>
            <label>Temperature:
              <input type="number" name="temperature" value={formData.temperature} onChange={handleInputChange} required />
            </label>
            <label>Humidity:
              <input type="number" name="humidity" value={formData.humidity} onChange={handleInputChange} required />
            </label>
            <label>pH:
              <input type="number" name="ph" value={formData.ph} onChange={handleInputChange} required />
            </label>
            <label>Rainfall:
              <input type="number" name="rainfall" value={formData.rainfall} onChange={handleInputChange} required />
            </label>
            <button type="submit">Get Crop Prediction</button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>

        {/* Crop Details Card */}
        {cropDetails && (
          <div className="crop-card">
            <h2>Recommended Crop: {cropDetails.cropName}</h2>
            <p><strong>Type:</strong> {cropDetails.cropType}</p>
            <p><strong>Optimal Temperature:</strong> {cropDetails.optimalTemperatureMin}°C - {cropDetails.optimalTemperatureMax}°C</p>
            <p><strong>Optimal Humidity:</strong> {cropDetails.optimalHumidity}%</p>
            <p><strong>Soil Type:</strong> {cropDetails.soilType}</p>
            <p><strong>Irrigation Requirement:</strong> {cropDetails.irrigationRequirement}</p>
            <p><strong>Planting Season:</strong> {cropDetails.plantingSeason}</p>
            <p><strong>Harvest Time:</strong> {cropDetails.harvestTime}</p>
            <p><strong>pH Requirement:</strong> {cropDetails.phRequirementMin} - {cropDetails.phRequirementMax}</p>
            <p><strong>Nutrient Requirements:</strong> {cropDetails.nutrientRequirements}</p>
            <p><strong>Yield Per Hectare:</strong> {cropDetails.yieldPerHectare}</p>
            <p><strong>Disease Resistance:</strong> {cropDetails.diseaseResistance}</p>
            <p><strong>Pest Sensitivity:</strong> {cropDetails.pestSensitivity}</p>
            <p><strong>Last Updated:</strong> {cropDetails.lastUpdated}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropePrediction;
