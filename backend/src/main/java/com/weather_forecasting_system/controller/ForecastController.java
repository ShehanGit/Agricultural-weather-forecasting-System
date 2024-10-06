package com.weather_forecasting_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ForecastController {

    @Autowired
    private RestTemplate restTemplate;

    private final String apiKey = "1eceee44619179169ee5a912cc84231f";
    private final String forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

    @GetMapping("/api/forecast")
    public ResponseEntity<Object> getWeatherForecast(@RequestParam String city) {
        String url = forecastApiUrl + "?q={city}&appid={apiKey}&units=metric";
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("city", city);
        uriVariables.put("apiKey", apiKey);
        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class, uriVariables);
            if (response == null || !response.has("list")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid response from weather service");
            }

            LocalDate tomorrow = LocalDate.now().plusDays(1);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String tomorrowString = tomorrow.format(formatter);

            JsonNode nextDayForecast = response.get("list").findValues("dt_txt").stream()
                    .filter(node -> node.asText().startsWith(tomorrowString))
                    .map(node -> response.get("list").get(node.asInt()))
                    .findFirst().orElse(null);

            if (nextDayForecast == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No forecast data available for the next day");
            }

            Map<String, Object> result = new HashMap<>();
            result.put("temperature", nextDayForecast.get("main").get("temp").asDouble());
            result.put("humidity", nextDayForecast.get("main").get("humidity").asDouble());
            result.put("windSpeed", nextDayForecast.get("wind").get("speed").asDouble());
            if (nextDayForecast.has("rain") && nextDayForecast.get("rain").has("3h")) {
                result.put("rainfall", nextDayForecast.get("rain").get("3h").asDouble());
            } else {
                result.put("rainfall", 0.0);
            }

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch weather forecast data: " + e.getMessage());
        }
    }
}
