package com.weather_forecasting_system.controller;

import com.weather_forecasting_system.model.Crop;
import com.weather_forecasting_system.repository.CropRepository;
import com.weather_forecasting_system.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/crops")
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @GetMapping
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Crop> createCrop(@RequestBody Crop crop) {
        Crop savedCrop = cropRepository.save(crop);
        return new ResponseEntity<>(savedCrop, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Crop> getCropById(@PathVariable Long id) {
        Crop crop = cropRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Crop not found with id: " + id)
        );
        return ResponseEntity.ok(crop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Crop> updateCrop(@PathVariable Long id, @RequestBody Crop cropDetails) {
        Crop existingCrop = cropRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Crop not found with id: " + id)
        );

        existingCrop.setCropName(cropDetails.getCropName());
        existingCrop.setCropType(cropDetails.getCropType());
        existingCrop.setOptimalTemperatureMin(cropDetails.getOptimalTemperatureMin());
        existingCrop.setOptimalTemperatureMax(cropDetails.getOptimalTemperatureMax());
        existingCrop.setOptimalHumidity(cropDetails.getOptimalHumidity());
        existingCrop.setSoilType(cropDetails.getSoilType());
        existingCrop.setIrrigationRequirement(cropDetails.getIrrigationRequirement());
        existingCrop.setPlantingSeason(cropDetails.getPlantingSeason());
        existingCrop.setHarvestTime(cropDetails.getHarvestTime());
        existingCrop.setPhRequirementMin(cropDetails.getPhRequirementMin());
        existingCrop.setPhRequirementMax(cropDetails.getPhRequirementMax());
        existingCrop.setNutrientRequirements(cropDetails.getNutrientRequirements());
        existingCrop.setYieldPerHectare(cropDetails.getYieldPerHectare());
        existingCrop.setDiseaseResistance(cropDetails.getDiseaseResistance());
        existingCrop.setPestSensitivity(cropDetails.getPestSensitivity());
        existingCrop.setLastUpdated(cropDetails.getLastUpdated());

        // Set new fields: imageUrl, latitude, and longitude
        existingCrop.setImageUrl(cropDetails.getImageUrl());
        existingCrop.setLatitude(cropDetails.getLatitude());
        existingCrop.setLongitude(cropDetails.getLongitude());

        Crop updatedCrop = cropRepository.save(existingCrop);
        return ResponseEntity.ok(updatedCrop);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCrop(@PathVariable Long id) {
        Crop crop = cropRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Crop not found with id: " + id)
        );
        cropRepository.delete(crop);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
