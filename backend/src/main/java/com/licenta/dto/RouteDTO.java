package com.licenta.dto;

public class RouteDTO {

    private Integer routeID;
    private String tripDate;
    private Double latitude;
    private Double longitude;
    private Double speed;
    private Integer distance;
    private Integer tripDuration;
    private String description;
    private Integer inTown;
    private Integer driverProfile;

    public RouteDTO() {
    }

    public RouteDTO(Integer routeID, String tripDate, Double latitude, Double longitude, Double speed, Integer tripDuration, String description, Integer inTown, Integer driverProfile) {
        this.routeID = routeID;
        this.tripDate = tripDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.tripDuration = tripDuration;
        this.description = description;
        this.inTown = inTown;
        this.driverProfile = driverProfile;
    }

    public RouteDTO(String tripDate, Double latitude, Double longitude, Double speed, Integer tripDuration, Integer distance) {
        this.tripDate = tripDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.tripDuration = tripDuration;
        this.distance=distance;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getRouteID() {
        return routeID;
    }

    public void setRouteID(Integer routeID) {
        this.routeID = routeID;
    }

    public String getTripDate() {
        return tripDate;
    }

    public void setTripDate(String tripDate) {
        this.tripDate = tripDate;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }

    public Integer getTripDuration() {
        return tripDuration;
    }

    public void setTripDuration(Integer tripDuration) {
        this.tripDuration = tripDuration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getInTown() {
        return inTown;
    }

    public void setInTown(Integer inTown) {
        this.inTown = inTown;
    }

    public Integer getDriverProfile() {
        return driverProfile;
    }

    public void setDriverProfile(Integer driverProfile) {
        this.driverProfile = driverProfile;
    }
}
