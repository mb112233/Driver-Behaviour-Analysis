package com.licenta.entities;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
//POJO class
@Entity
@Table(name = "driver")
public class DriverEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "driver_id",  nullable = false)
    private Integer driverId;

    @Column(name = "fullname", unique = true, nullable = false)
    private String fullname;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "total_distance")
    private Integer totalDistance;

    @Column(name = "total_duration")
    private Integer totalDuration;

    @Column(name = "average_speed")
    private Double averageSpeed;

    @Column(name = "no_of_stops")
    private Integer noOfStops;

    @Column(name = "driving_profile")
    private Double drivingProfile;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private List<RouteEntity> routes;

    public DriverEntity() {
    }

    public DriverEntity(String fullname, Integer totalDistance, Integer totalDuration, Double averageSpeed, Integer noOfStops, List<RouteEntity> routes) {
        this.fullname = fullname;
        this.totalDistance = totalDistance;
        this.totalDuration = totalDuration;
        this.averageSpeed = averageSpeed;
        this.noOfStops = noOfStops;
        this.routes = routes;
    }

    public DriverEntity(String fullname, String address, String email, Integer yearsOfExperience, Integer totalDistance,Integer totalDuration, Double averageSpeed, Integer noOfStops, Double drivingProfile) {
        this.fullname = fullname;
        this.address = address;
        this.email = email;
        this.yearsOfExperience = yearsOfExperience;
        this.totalDistance = totalDistance;
        this.totalDuration = totalDuration;
        this.averageSpeed = averageSpeed;
        this.noOfStops = noOfStops;
        this.drivingProfile = drivingProfile;
    }

    public Double getDrivingProfile() {
        return drivingProfile;
    }

    public void setDrivingProfile(Double drivingProfile) {
        this.drivingProfile = drivingProfile;
    }

    public DriverEntity(String fullname, String address, String email, Integer yearsOfExperience) {
        this.fullname = fullname;
        this.address = address;
        this.email = email;
        this.yearsOfExperience = yearsOfExperience;
    }

    public Integer getNoOfStops() {
        return noOfStops;
    }

    public void setNoOfStops(Integer noOfStops) {
        this.noOfStops = noOfStops;
    }

    public Integer getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(Integer totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Integer getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(Integer totalDuration) {
        this.totalDuration = totalDuration;
    }

    public Double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public DriverEntity(String fullname) {
        this.fullname = fullname;
    }

    public Integer getDriverId() {
        return driverId;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public List<RouteEntity> getRoutes() {
        return routes;
    }

    public void setRoutes(List<RouteEntity> routes) {
        this.routes = routes;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    @Override
    public String toString() {
        return "DriverEntity{" +
                "driverId=" + driverId +
                ", fullname='" + fullname + '\'' +
                ", routes=" + routes +
                '}';
    }

}
