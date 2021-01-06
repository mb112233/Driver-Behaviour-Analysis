package com.licenta.dto;

import java.util.List;

public class DriverDTO {

    private Integer driverId;
    private String fullname;
    private String address;
    private String email;
    private Integer yearsOfExperience;
    private Integer totalDistance;
    private Integer totalDuration;
    private Double averageSpeed;
    private Integer noOfStops;
    private Double drivingProfile;

    private List<String> stoppingPlaces;
    private List<String> fastDrivenPlaces;

    public DriverDTO() {
    }

    public DriverDTO(Integer driverId, String fullname, String address, String email, Integer yearsOfExperience) {
        this.driverId = driverId;
        this.fullname = fullname;
        this.address = address;
        this.email = email;
        this.yearsOfExperience = yearsOfExperience;
    }

    public DriverDTO(Integer driverId, String fullname, String address, String email, Integer yearsOfExperience, Integer totalDistance, Integer totalDuration, Double averageSpeed, Integer noOfStops,Double drivingProfile, List<String> stoppingPlaces, List<String> fastDrivenPlaces) {
        this.driverId = driverId;
        this.fullname = fullname;
        this.address = address;
        this.email = email;
        this.yearsOfExperience = yearsOfExperience;
        this.totalDistance = totalDistance;
        this.totalDuration = totalDuration;
        this.averageSpeed = averageSpeed;
        this.noOfStops = noOfStops;
        this.drivingProfile=drivingProfile;
        this.stoppingPlaces = stoppingPlaces;
        this.fastDrivenPlaces = fastDrivenPlaces;
    }

    public DriverDTO(String fullname, String address, String email, Integer yearsOfExperience) {
        this.fullname = fullname;
        this.address = address;
        this.email = email;
        this.yearsOfExperience = yearsOfExperience;
    }

    public Double getDrivingProfile() {
        return drivingProfile;
    }

    public void setDrivingProfile(Double drivingProfile) {
        this.drivingProfile = drivingProfile;
    }

    public List<String> getStoppingPlaces() {
        return stoppingPlaces;
    }

    public void setStoppingPlaces(List<String> stoppingPlaces) {
        this.stoppingPlaces = stoppingPlaces;
    }

    public List<String> getFastDrivenPlaces() {
        return fastDrivenPlaces;
    }

    public void setFastDrivenPlaces(List<String> fastDrivenPlaces) {
        this.fastDrivenPlaces = fastDrivenPlaces;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
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

    public Integer getNoOfStops() {
        return noOfStops;
    }

    public void setNoOfStops(Integer noOfStops) {
        this.noOfStops = noOfStops;
    }
}
