package com.licenta.dto.builders;

import com.licenta.dto.CarDTO;
import com.licenta.entities.CarEntity;

public class CarBuilder {

    private CarBuilder(){}

    public static CarDTO generateDTOFromEntity(CarEntity carEntity){
        return new CarDTO(carEntity.getVehicleId(),
                carEntity.getCompany(),
                carEntity.getModel(),
                carEntity.getYearOfFabrication(),
                carEntity.getCarNumber(),
                carEntity.getFuelConsumption());
    }

    public static CarEntity generateEntityFromDTO(CarDTO carDTO){
        return new CarEntity(
                    carDTO.getCompany(),
                    carDTO.getModel(),
                    carDTO.getYearOfFabrication(),
                    carDTO.getCarNumber(),
                    carDTO.getFuelConsumption()
        );
    }
}
