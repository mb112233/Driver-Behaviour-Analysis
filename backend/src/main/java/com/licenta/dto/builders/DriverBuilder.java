package com.licenta.dto.builders;

import com.licenta.dto.DriverDTO;
import com.licenta.entities.DriverEntity;

import java.util.List;

public class DriverBuilder {

    private DriverBuilder() {
    }

    public static DriverDTO generateDTOFromEntityWithStatistics(DriverEntity driver, List<String> p1, List<String> p2) {
        return new DriverDTO(driver.getDriverId(),
                            driver.getFullname(),
                            driver.getAddress(),
                            driver.getEmail(),
                            driver.getYearsOfExperience(),
                            driver.getTotalDistance(),
                            driver.getTotalDuration(),
                            driver.getAverageSpeed(),
                            driver.getNoOfStops(),
                            driver.getDrivingProfile(),
                            p1,
                            p2);
    }

    public static DriverDTO generateDTOFromEntity(DriverEntity driver) {
        return new DriverDTO(driver.getDriverId(),
                driver.getFullname(),
                driver.getAddress(),
                driver.getEmail(),
                driver.getYearsOfExperience());
    }
    public static DriverEntity generateEntityFromDTO(DriverDTO dto){

        return new DriverEntity(dto.getFullname(),
                                dto.getAddress(),
                                dto.getEmail(),
                                dto.getYearsOfExperience());
    }
}
