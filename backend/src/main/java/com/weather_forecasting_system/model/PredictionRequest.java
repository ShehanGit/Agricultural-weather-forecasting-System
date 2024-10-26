package com.weather_forecasting_system.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PredictionRequest {
    @JsonProperty("N")
    private double n;

    @JsonProperty("P")
    private double p;

    @JsonProperty("K")
    private double k;

    @JsonProperty("temperature")
    private double temperature;

    @JsonProperty("humidity")
    private double humidity;

    @JsonProperty("ph")
    private double ph;

    @JsonProperty("rainfall")
    private double rainfall;

    // Getters and Setters
    public double getN() {
        return n;
    }

    public void setN(double n) {
        this.n = n;
    }

    public double getP() {
        return p;
    }

    public void setP(double p) {
        this.p = p;
    }

    public double getK() {
        return k;
    }

    public void setK(double k) {
        this.k = k;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getPh() {
        return ph;
    }

    public void setPh(double ph) {
        this.ph = ph;
    }

    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }

    @Override
    public String toString() {
        return "PredictionRequest{" +
                "N=" + n +
                ", P=" + p +
                ", K=" + k +
                ", temperature=" + temperature +
                ", humidity=" + humidity +
                ", ph=" + ph +
                ", rainfall=" + rainfall +
                '}';
    }
}
