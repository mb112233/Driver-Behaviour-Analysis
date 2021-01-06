package com.licenta.dto.builders;

import com.licenta.dto.DriverWithRoutesDTO;
import com.licenta.dto.RouteDTO;
import com.licenta.entities.DriverEntity;
import com.licenta.entities.RouteEntity;

import java.util.List;
import java.util.stream.Collectors;

public class DriverWithRoutesBuilder {

    private DriverWithRoutesBuilder(){}
    public static DriverWithRoutesDTO generateDTOFromEntity(DriverEntity driverEntity, List<RouteEntity> routes) {
        List<RouteDTO> dtos = routes.stream().map(RouteBuilder::generateDTOFromEntity).collect(Collectors.toList());
        return new DriverWithRoutesDTO(driverEntity.getDriverId(),driverEntity.getFullname(), dtos);
    }
}
