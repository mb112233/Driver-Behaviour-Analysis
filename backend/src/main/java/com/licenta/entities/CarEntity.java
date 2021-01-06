package com.licenta.entities;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "car")
public class CarEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "vehicle_id", nullable = false)
    private Integer vehicleId;

    @Column(name = "company")
    private String company;

    @Column(name = "model")
    private String model;

    @Column(name = "year_of_fabrication")
    private Integer yearOfFabrication;

    @Column(name = "car_number")
    private String carNumber;

    @Column(name = "fuel_consumption")
    private Double fuelConsumption;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private List<RouteEntity> routes;


    public CarEntity() {
    }


    public CarEntity(String company, String model, Integer yearOfFabrication, String carNumber, Double fuelConsumption) {
        this.company = company;
        this.model = model;
        this.yearOfFabrication = yearOfFabrication;
        this.carNumber = carNumber;
        this.fuelConsumption = fuelConsumption;
    }

    public Double getFuelConsumption() {
        return fuelConsumption;
    }

    public void setFuelConsumption(Double fuelConsumption) {
        this.fuelConsumption = fuelConsumption;
    }

    public List<RouteEntity> getRoutes() {
        return routes;
    }

    public void setRoutes(List<RouteEntity> routes) {
        this.routes = routes;
    }

    public Integer getVehicleId() {
        return vehicleId;
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

    @Override
    public String toString() {
        return "CarEntity{" +
                "vehicleId=" + vehicleId +
                ", company='" + company + '\'' +
                ", model='" + model + '\'' +
                ", yearOfFabrication=" + yearOfFabrication +
                ", carNumber='" + carNumber + '\'' +
                ", fuelConsumption=" + fuelConsumption +
                ", routes=" + routes +
                '}';
    }
}
