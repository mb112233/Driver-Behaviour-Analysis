package com.licenta.services;

import com.licenta.dto.*;
import com.licenta.dto.builders.CarBuilder;
import com.licenta.dto.builders.DriverBuilder;
import com.licenta.dto.builders.DriverWithRoutesBuilder;
import com.licenta.dto.builders.RouteBuilder;
import com.licenta.entities.CarEntity;
import com.licenta.entities.DriverEntity;
import com.licenta.entities.RouteEntity;
import com.licenta.repositories.CarRepository;
import com.licenta.repositories.DriverRepository;
import com.licenta.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DriverService {
    public final DriverRepository driverRepository;
    public final RouteRepository routeRepository;
    public final CarRepository carRepository;

    @Autowired
    public DriverService(DriverRepository driverRepository, RouteRepository routeRepository, CarRepository carRepository) {
        this.driverRepository = driverRepository;
        this.routeRepository = routeRepository;
        this.carRepository = carRepository;
    }

    public List<RouteDTO> getAllRoutesFromDriver(Integer driverId) {
        List<RouteEntity> routes = routeRepository.findAllRoutes(driverId);
        return routes.stream()
                .map(RouteBuilder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public List<DriverDTO> getAllDrivers() {
        List<DriverEntity> drivers = driverRepository.findAllDrivers();
        return drivers.stream()
                .map(DriverBuilder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public DriverDTO getDriverByID(Integer driverId) {
        Optional<DriverEntity> driver = driverRepository.findById(driverId);
        if (!driver.isPresent()) {
            System.out.println("No  driver id with this value in getDriverByID");
        }
        return DriverBuilder.generateDTOFromEntity(driver.get());
    }

    public DriverWithRoutesDTO getDriverWithRoutes(Integer driverId) {
        Optional<DriverEntity> driver = driverRepository.findById(driverId);
        if (!driver.isPresent()) {
            System.out.println("No  driver id with this value in findDriverWithRoutes");
        }
        List<RouteEntity> routes = driver.get().getRoutes();
        if (routes.isEmpty()) {
            System.out.println("This driver hasn't made any route in findDriverWithRoutes ");
        }
        return DriverWithRoutesBuilder.generateDTOFromEntity(driver.get(), routes);
    }

    public DriverDTO getDriverWithStatistics(Integer driverId) {
        Optional<DriverEntity> driver = driverRepository.findById(driverId);
        if (!driver.isPresent()) {
            System.out.println("No  driver id with this value in getStatistics");
        }
        return null;
    }


    public List<RouteDTO> getAllRoutes() {
        List<RouteEntity> routes = routeRepository.findAll();
        return routes.stream()
                .map(RouteBuilder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public List<CarDTO> getAllVehicles() {
        List<CarEntity> vehicles = carRepository.findAll();
        return vehicles.stream()
                .map(CarBuilder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }


    public Integer insertDriver(DriverDTO driverDTO) {
        DriverEntity driverEntity = DriverBuilder.generateEntityFromDTO(driverDTO);
        return driverRepository.save(driverEntity).getDriverId();
    }

    public Integer insertCar(CarDTO carDTO) {
        CarEntity carEntity = CarBuilder.generateEntityFromDTO(carDTO);
        return carRepository.save(carEntity).getVehicleId();
    }

    public void insertRoute(Integer driverId, Integer vehicleId, RouteDTO routeDTO) {

        DriverEntity driver = driverRepository.findById(driverId).get();
        CarEntity car = carRepository.findById(vehicleId).get();

        RouteEntity routeToBeInserted = RouteBuilder.generateEntityFromDTO(routeDTO);
        routeToBeInserted.setDescription("no description available");
        Integer inT = routeToBeInserted.getDriverProfile() == 0 ? 0 : 1;
        routeToBeInserted.setInTown(inT);

        List<RouteEntity> routes1 = driver.getRoutes();
        List<RouteEntity> routes2 = car.getRoutes();
        routes1.add(routeToBeInserted);
        routes2.add(routeToBeInserted);

        driver.setRoutes(routes1);
        car.setRoutes(routes2);
        driverRepository.save(driver);
        carRepository.save(car);

    }

    public List<Float> compareDrivers(Integer driverId1, Integer driverId2){

        DriverEntity driver1 = driverRepository.findById(driverId1).get();
        DriverEntity driver2 = driverRepository.findById(driverId2).get();
        int sum1=0,sum2=0;
        List<RouteEntity> routes1=driver1.getRoutes();
        Integer total1=routes1.size();
        List<RouteEntity> routes2=driver2.getRoutes();
        Integer total2=routes2.size();

        for (RouteEntity r:routes1) {
            if (r.getDriverProfile()==1){
                sum1++;
            }
        }

        for (RouteEntity r:routes2) {
            if (r.getDriverProfile()==1){
                sum2++;
            }
        }
        Float result1=((float)sum1/total1);
        Float result2=((float)sum2/total2);
        List<Float> results=new ArrayList<Float>();
        results.add(result1);
        results.add(result2);
        return results;
    }

    public List<String> getNoOfRecordsPerDriver() {
        List<DriverEntity> drivers=driverRepository.findAll();
        List<String> results=new ArrayList<String>();

        for (DriverEntity d:drivers) {
            List<RouteEntity> driverRoutes=d.getRoutes();
            String r=d.getFullname()+'-'+driverRoutes.size();
            results.add(r);
        }
        return results;
    }
    public List<String> getNoOfRecordsPerVehicle() {
        List<CarEntity> cars=carRepository.findAll();
        List<String> results=new ArrayList<String>();

        for (CarEntity c:cars) {
            List<RouteEntity> driverRoutes=c.getRoutes();
            String r=c.getCompany()+c.getModel()+'-'+driverRoutes.size();
            results.add(r);
        }
        return results;
    }

    public DriverDTO getOverallDriverStatistics(Integer driverId) {
        DriverEntity driver=driverRepository.findById(driverId).get();
        List<RouteEntity> driverRoutes=driver.getRoutes();
        List<String> placesWhereTheDriverStopped= new ArrayList<>();
        List<String> placesWhereTheDriverDriveTooFast= new ArrayList<>();
        int total=driverRoutes.size();
        int sum=0,totalDistance=0,totalDuration=0,noOfStops=0;
        double speed=0.0;

        if (!driverRoutes.isEmpty()){
            for (RouteEntity r:driverRoutes) {
                if(r.getDriverProfile()==1){
                    sum++;
                    placesWhereTheDriverDriveTooFast.add(r.getDescription());
                }
                totalDistance+=r.getDistance();
                totalDuration+=r.getTimeInterval();
                speed+=r.getSpeed();
                if(r.getSpeed()==0.0){
                    noOfStops++;
                    placesWhereTheDriverStopped.add(r.getDescription());
                }
            }
        }
        Double result=((double)sum/total);
        Double averageSpeed=(speed /total);

        driver.setDrivingProfile(result);
        driver.setTotalDistance(totalDistance);
        driver.setTotalDuration(totalDuration);
        driver.setAverageSpeed(averageSpeed);
        driver.setNoOfStops(noOfStops);

        DriverDTO driverDTO=DriverBuilder.generateDTOFromEntityWithStatistics(driver,placesWhereTheDriverDriveTooFast,placesWhereTheDriverStopped);

        return driverDTO;
    }

    public List<String> getOverallTripStatistics(Integer driverId, String date){

        String[] arr1=date.split("-");
        String newDateSent=arr1[1]+'/'+arr1[2]+'/'+arr1[0];

        DriverEntity driver = driverRepository.findById(driverId).get();
        List<RouteEntity> driverRoutes=driver.getRoutes();
        int totalDistance=0, totalDuration=0,noOfTripsPerSubject=0;
        double speed=  0.0,sum=0.0;
        for (RouteEntity r:driverRoutes) {
            String[] arr=r.getTripDate().split(" ");
            String day=arr[0];
            if (day.equals(newDateSent)){
                totalDistance+=r.getDistance();
                totalDuration+=r.getTimeInterval();
                sum++;
                noOfTripsPerSubject++;
                speed+=r.getSpeed();
            }
        }
        double avg_Speed=speed/sum;
        List<String> results=new ArrayList<>();
        results.add("Total distance="+ totalDistance);
        results.add("Total duration="+ totalDuration);
        results.add("Average speed="+ avg_Speed);
        results.add("Number of trips per subject="+ noOfTripsPerSubject);


        return results;
    }

    public List<String> getTripsPerSubject(String date) {
        String[] arr1=date.split("-");
        String newDateSent=arr1[1]+'/'+arr1[2]+'/'+arr1[0];

        List<String> results=new ArrayList<>();
        List<DriverEntity> drivers=driverRepository.findAll();

        for (DriverEntity d:drivers) {
            List<RouteEntity> driverRoutes=d.getRoutes();
            int noOfTripPerDay=0;
            for (RouteEntity r:driverRoutes) {
                String[] arr=r.getTripDate().split(" ");
                String day=arr[0];
                if (day.equals(newDateSent)){
                    noOfTripPerDay++;
                }
            }
            String res=d.getFullname()+'='+noOfTripPerDay;
            results.add(res);
        }
        return results;
    }
}
