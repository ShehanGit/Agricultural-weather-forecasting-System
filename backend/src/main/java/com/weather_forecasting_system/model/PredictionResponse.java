package com.weather_forecasting_system.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PredictionResponse {

    @JsonProperty("Recommended Crop")
    private String recommendedCrop;

    // Getter and Setter
    public String getRecommendedCrop() {
        return recommendedCrop;
    }

    public void setRecommendedCrop(String recommendedCrop) {
        this.recommendedCrop = recommendedCrop;
    }

    @Override
    public String toString() {
        return "PredictionResponse{" +
                "recommendedCrop='" + recommendedCrop + '\'' +
                '}';
    }
}
