package com.weather_forecasting_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {

    @Autowired
    private RestTemplate restTemplate;

    private final String apiKey = "1eceee44619179169ee5a912cc84231f";
    private final String weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

    @GetMapping("/api/weather/city")
    public ResponseEntity<Object> getWeatherByCity(@RequestParam String city) {
        String url = weatherApiUrl + "?q={city}&appid={apiKey}&units=metric";
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("city", city);
        uriVariables.put("apiKey", apiKey);
        try {
            Object response = restTemplate.getForObject(url, Object.class, uriVariables);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch weather data: " + e.getMessage());
        }
    }

    @GetMapping("/api/weather/location")
    public ResponseEntity<Object> getWeatherByLocation(@RequestParam Double lat, @RequestParam Double lon) {
        String url = weatherApiUrl + "?lat={lat}&lon={lon}&appid={apiKey}&units=metric";
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("lat", lat.toString());
        uriVariables.put("lon", lon.toString());
        uriVariables.put("apiKey", apiKey);
        try {
            Object response = restTemplate.getForObject(url, Object.class, uriVariables);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch weather data: " + e.getMessage());
        }
    }
}

