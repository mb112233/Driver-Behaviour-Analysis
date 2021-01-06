package com.licenta.dto;

import java.util.List;

public class CarWithRoutesDTO {

    private Integer vehicleId;
    private String company;
    private String model;
    private Integer yearOfFabrication;
    private String carNumber;
    private Double fuelConsumption;
    private List<RouteDTO> routes;


    public CarWithRoutesDTO() {
    }

    public CarWithRoutesDTO(Integer vehicleId, String company, String model, Integer yearOfFabrication, String carNumber, Double fuelConsumption) {
        this.vehicleId = vehicleId;
        this.company = company;
        this.model = model;
        this.yearOfFabrication = yearOfFabrication;
        this.carNumber = carNumber;
        this.fuelConsumption = fuelConsumption;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYearOfFabrication() {
        return yearOfFabrication;
    }

    public void setYearOfFabrication(Integer yearOfFabrication) {
        this.yearOfFabrication = yearOfFabrication;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public Double getFuelConsumption() {
        return fuelConsumption;
    }

    public void setFuelConsumption(Double fuelConsumption) {
        this.fuelConsumption = fuelConsumption;
    }
}
