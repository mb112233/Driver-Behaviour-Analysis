package com.licenta.dto;

import com.licenta.dto.builders.RouteBuilder;
import com.licenta.entities.DriverEntity;
import com.licenta.entities.RouteEntity;

import java.util.List;
import java.util.stream.Collectors;

public class DriverWithRoutesDTO {

    private Integer driverId;
    private String fullname;
    private List<RouteDTO> routes;

    public DriverWithRoutesDTO() {
    }

    public DriverWithRoutesDTO(Integer driverId, String fullname, List<RouteDTO> routes) {
        this.driverId = driverId;
        this.fullname = fullname;
        this.routes = routes;
    }

    public Integer getDriverId() {
        return driverId;
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public List<RouteDTO> getRoutes() {
        return routes;
    }

    public void setRoutes(List<RouteDTO> routes) {
        this.routes = routes;
    }
}
