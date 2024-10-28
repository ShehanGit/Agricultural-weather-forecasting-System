import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/CropPrediction.css';
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
  const [result, setResult] = useState(null);
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
      setResult(response.data['Recommended Crop']); // Assuming response contains { "Recommended Crop": "crop_name" }
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError('Failed to get crop prediction. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="crop-prediction-container">
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

        {result && <p className="result">Recommended Crop: {result}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default CropePrediction;
