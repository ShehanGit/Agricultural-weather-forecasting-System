package com.weather_forecasting_system.repository;

import com.weather_forecasting_system.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Long> {
}
