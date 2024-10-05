package com.weather_forecasting_system.repository;

import com.weather_forecasting_system.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Long> {
//    List<Booking> findByUserId(Long userId);
//    List<Booking> findByRoomId(Long roomId);
//    List<Booking> findByCheckInDateBetween(Date start, Date end);
}
