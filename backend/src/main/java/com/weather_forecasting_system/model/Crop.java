package com.weather_forecasting_system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "crop_data")
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cropId;

    @Column(name = "crop_name", nullable = false)
    private String cropName;

    @Column(name = "crop_type", nullable = false)
    private String cropType;

    @Column(name = "optimal_temperature_min")
    private Float optimalTemperatureMin; // Consider using Float if null is possible

    @Column(name = "optimal_temperature_max")
    private Float optimalTemperatureMax; // Consider using Float if null is possible

    @Column(name = "optimal_humidity")
    private Float optimalHumidity; // Consider using Float if null is possible

    @Column(name = "soil_type")
    private String soilType;

    @Column(name = "irrigation_requirement")
    private String irrigationRequirement;

    @Column(name = "planting_season")
    private String plantingSeason;

    @Column(name = "harvest_time")
    private Integer harvestTime; // Consider using Integer if null is possible

    @Column(name = "ph_requirement_min")
    private Float phRequirementMin; // Consider using Float if null is possible

    @Column(name = "ph_requirement_max")
    private Float phRequirementMax; // Consider using Float if null is possible

    @Column(name = "nutrient_requirements")
    private String nutrientRequirements;

    @Column(name = "yield_per_hectare")
    private Float yieldPerHectare; // Consider using Float if null is possible

    @Column(name = "disease_resistance")
    private String diseaseResistance;

    @Column(name = "pest_sensitivity")
    private String pestSensitivity;

    @Column(name = "last_updated")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdated;

    // Change these fields to `Double` to allow null values
    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;
}
