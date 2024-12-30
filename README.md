# Agriculture Weather Forecasting System

## Overview
This project integrates real-time weather forecasting and machine learning to support farmers in making informed decisions. It features weather updates, rainfall predictions, and ML-powered crop recommendations tailored to environmental and soil conditions.

## Features
- **Real-Time Weather Updates**: Retrieves live weather data for a specific city or location.
- **Rainfall Forecasting**: Predicts rainfall to optimize irrigation, reducing water wastage by up to 20%.
- **ML-Based Crop Recommendations**: Uses a Random Forest model to recommend crops based on weather, soil nutrition, and environmental conditions.
- **Trend Analysis and Alerts**: Provides insights for sustainable farming practices.

## Tech Stack
- **Backend**: Java, Spring Boot, OpenWeather API, MySQL
- **Frontend**: React.js
- **Machine Learning**: Random Forest model
- **Database**: MySQL

## Installation and Setup

### Prerequisites
- Java 17 or higher
- Node.js and npm
- MySQL
- Maven

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/agriculture-weather-forecasting.git
   cd backend
2. Configure the application.properties file in the src/main/resources directory:

```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/agricultural_weather_forecasting_system?useSSL=false
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
```
3. Build and run the backend using Maven:

```bash
mvn spring-boot:run
The backend will run on http://localhost:8080.
```
## Frontend Setup
Navigate to the frontend directory:

```bash
cd ../frontend
```
Install dependencies:


```bash
npm install
```
Start the React app:


```bash
npm start
```
The frontend will run on http://localhost:3000.


## Machine Learning API
Set up the Python environment:

```bash
pip install -r requirements.txt
```
Run the ML API:


```bash
python app.py
```
Ensure the ML API runs on http://127.0.0.1:5000.


OpenWeather API Key
Replace the placeholder API key in the backend code with your actual OpenWeather API key:

```bash
private final String apiKey = "your_openweather_api_key";
```
## Usage
Login/Register: Users must register and log in to access the features.
Current Weather: View real-time weather conditions for a city or location.
Forecast: Get weather forecasts, including rainfall predictions.
Crop Recommendations: Input soil and environmental parameters to get crop recommendations.

## API Endpoints

### Weather
GET /api/weather/city: Fetch weather data by city name.
GET /api/weather/location: Fetch weather data using latitude and longitude.

###Forecast

GET /api/forecast: Fetch 5-day weather forecasts.

###Crop

GET /crops: Retrieve all crops.
POST /crops: Add a new crop.
GET /crops/{id}: Fetch crop details by ID.

###Prediction

POST /predict: Submit data for crop recommendation.

## Project Architecture

###Backend

Controllers: Handle RESTful APIs for weather, crops, and predictions.
Services: Process business logic.
Repositories: Interact with MySQL database.

###Frontend

Components: Built with React.js for UI and interactivity.
Pages:
Current Weather
Forecast
Crop List and Details
Crop Prediction

###Machine Learning

Model: Random Forest trained on soil and weather data.
API: Flask-based API serving crop recommendations.


###Future Enhancements

Integration with IoT devices for real-time soil monitoring.
Expansion of ML models to include pest and disease prediction.

###License
This project is licensed under the MIT License.

## Contributors

Shehan Vinod - Developer
Other Contributors - 

