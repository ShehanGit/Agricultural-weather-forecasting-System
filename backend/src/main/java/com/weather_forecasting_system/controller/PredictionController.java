package com.weather_forecasting_system.controller;

import com.weather_forecasting_system.model.PredictionRequest;
import com.weather_forecasting_system.model.PredictionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/predict")
public class PredictionController {

    private static final Logger logger = LoggerFactory.getLogger(PredictionController.class);

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public ResponseEntity<?> predictCrop(@RequestBody PredictionRequest predictionRequest) {
        // Log the request data
        logger.info("Sending request to ML API with data: {}", predictionRequest);

        String mlApiUrl = "http://127.0.0.1:5000/predict";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PredictionRequest> requestEntity = new HttpEntity<>(predictionRequest, headers);

        try {
            ResponseEntity<PredictionResponse> responseEntity = restTemplate.exchange(
                    mlApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    PredictionResponse.class
            );

            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception e) {
            logger.error("Error calling ML API", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error calling ML API: " + e.getMessage());
        }
    }
}
