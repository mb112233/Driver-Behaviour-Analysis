package com.licenta.dto.builders;

import com.licenta.dto.RouteDTO;
import com.licenta.entities.RouteEntity;

public class RouteBuilder {

    private RouteBuilder(){}

    public static RouteDTO generateDTOFromEntity(RouteEntity routeEntity){
        return new RouteDTO(routeEntity.getRouteId(),routeEntity.getTripDate(),
                            routeEntity.getLatitude(),routeEntity.getLongitude(),
                            routeEntity.getSpeed(),routeEntity.getTimeInterval(),
                            routeEntity.getDescription(),routeEntity.getInTown(),
                            routeEntity.getDriverProfile());
    }

    public static RouteEntity generateEntityFromDTO(RouteDTO routeDTO){
        return new RouteEntity(routeDTO.getTripDate(),
                                routeDTO.getLatitude(),
                                routeDTO.getLongitude(),
                                routeDTO.getSpeed(),
                                routeDTO.getTripDuration(),
                                routeDTO.getDistance(),
                                routeDTO.getDescription(),
                                routeDTO.getInTown(),
                                routeDTO.getDriverProfile());
    }
}
