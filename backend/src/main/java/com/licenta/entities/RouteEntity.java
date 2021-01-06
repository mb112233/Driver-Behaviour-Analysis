package com.licenta.entities;


import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
//POJO class
@Entity
@Table(name = "route")
public class RouteEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "route_id", nullable = false)
    private Integer routeId;

    @Column(name = "trip_date")
    private String tripDate;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "speed", nullable = false)
    private Double speed;

    @Column(name = "time_interval")
    private Integer timeInterval;

    @Column(name = "description")
    private String description;

    @Column(name = "in_town")
    private Integer inTown;

    @Column(name = "distance")
    private Integer distance;

    @Column(name = "driver_profile")
    private Integer driverProfile;

    public RouteEntity() {
    }

    public RouteEntity(String tripDate, Double latitude, Double longitude, Double speed, Integer timeInterval, Integer distance,String description, Integer inTown,Integer driverProfile) {
        this.tripDate = tripDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.timeInterval = timeInterval;
        this.distance = distance;
        this.description=description;
        this.inTown=inTown;
        this.driverProfile=driverProfile;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getRouteId() {
        return routeId;
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

    public Integer getTimeInterval() {
        return timeInterval;
    }

    public void setTimeInterval(Integer timeInterval) {
        this.timeInterval = timeInterval;
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

    @Override
    public String toString() {
        return "RouteEntity{" +
                "routeId=" + routeId +
                ", tripDate='" + tripDate + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", speed=" + speed +
                ", timeInterval=" + timeInterval +
                ", description='" + description + '\'' +
                ", inTown=" + inTown +
                ", driverProfile=" + driverProfile +
                '}';
    }
}
