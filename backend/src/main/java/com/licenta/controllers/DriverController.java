package com.licenta.controllers;

import com.licenta.dto.*;

import com.licenta.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/DriverTelematicsPlatform")
public class DriverController {

    private final DriverService driverService;

    @Autowired
    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping(value = "/{driverId}")
    public List<RouteDTO> getAllRoutesFromDriverById(@PathVariable("driverId") Integer driverId) {
        return driverService.getAllRoutesFromDriver(driverId);
    }

    @GetMapping(value = "/allDrivers")
    public List<DriverDTO> getAllDrivers() {

        return driverService.getAllDrivers();
    }

    @GetMapping(value = "/driverById/{driverId}")
    public DriverDTO getDriverById(@PathVariable("driverId") Integer driverId) {
        return driverService.getDriverByID(driverId);
    }

    @GetMapping(value="/getOverallDriverStatistics/{driverId}")
    public DriverDTO getDriverStatistics(@PathVariable("driverId") Integer driverId) {

        return driverService.getOverallDriverStatistics(driverId);
    }

    @GetMapping(value="/getOverallTripStatistics/{driverId}/{date}")
    public List<String> getTripStatistics(@PathVariable("driverId") Integer driverId,
                                       @PathVariable("date") String date) {
        return driverService.getOverallTripStatistics(driverId,date);
    }

    @GetMapping(value = "/allRoutes")
    public List<RouteDTO> getAllRoutes(){
        return driverService.getAllRoutes();
    }

    @GetMapping(value = "/allVehicles")
    public List<CarDTO> getAllVehicles(){
        return driverService.getAllVehicles();
    }

    @PostMapping(value = "/registerDriver",consumes= MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Integer insertDriver(@RequestParam (name="fullname") String fullname, @RequestParam (name="address") String address,
                                @RequestParam (name="yearsOfExperience") Integer yearsOfExperience,
                                @RequestParam (name="email") String email){

        DriverDTO driverDTO=new DriverDTO(fullname,address,email,yearsOfExperience);
        return driverService.insertDriver(driverDTO);
    }

    @PostMapping(value = "/registerCar", consumes= MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Integer insertCar(@RequestParam(name="fabricationYear") Integer fabricationYear,@RequestParam(name="model") String model,
                            @RequestParam(name="company") String company,@RequestParam(name="carNumber") String carNumber,
                             @RequestParam(name="fuelConsumption") Double fuelConsumption){
            CarDTO carDTO= new CarDTO(company,model,fabricationYear,carNumber,fuelConsumption);
        return driverService.insertCar(carDTO);
    }

    @PostMapping(value = "/registerRouteMeasurements",consumes= MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String insertRoute( @RequestParam(name="vehicleId")Integer vehicleId,@RequestParam(name="driverId")Integer driverId,
                                @RequestParam(name="latitude")Double latitude,@RequestParam(name="longitude")Double longitude,
                                @RequestParam(name="speed")Double speed,@RequestParam(name="distance") Integer distance,
                                @RequestParam(name="date")String date,@RequestParam(name="tripDuration") Integer tripDuration,
                                @RequestParam(name="configId")Integer configId) throws IOException, InterruptedException {
        Integer result=null;
        RouteDTO routeDTO=new RouteDTO(date,latitude,longitude,speed,tripDuration,distance);
        switch(configId){
            case 1:
                String[] cmd1 = {
                        "python",
                        "D:\\Desktop\\DriverBehaviorProfilingSpringApp\\src\\main\\resources\\load_licenta1.py",
                        String.valueOf(latitude),
                        String.valueOf(longitude),
                        String.valueOf(speed)
                };
                Process p1=Runtime.getRuntime().exec(cmd1);
                p1.waitFor();
                result=p1.exitValue();
                System.out.println(p1.exitValue());
                break;
            case 2:
                String[] cmd2 = {
                        "python",
                        "D:\\Desktop\\DriverBehaviorProfilingSpringApp\\src\\main\\resources\\load_licenta2.py",
                        String.valueOf(latitude),
                        String.valueOf(longitude),
                        String.valueOf(speed)
                };
                Process p2=Runtime.getRuntime().exec(cmd2);
                p2.waitFor();
                result=p2.exitValue();
                System.out.println(p2.exitValue());
                break;
            case 3:
                String[] cmd3 = {
                        "python",
                        "D:\\Desktop\\DriverBehaviorProfilingSpringApp\\src\\main\\resources\\load_licenta3.py",
                        String.valueOf(latitude),
                        String.valueOf(longitude),
                        String.valueOf(speed)
                };
                Process p3=Runtime.getRuntime().exec(cmd3);
                p3.waitFor();
                result=p3.exitValue();
                System.out.println(p3.exitValue());
                break;
            case 4:
                String[] cmd4 = {
                        "python",
                        "D:\\Desktop\\DriverBehaviorProfilingSpringApp\\src\\main\\resources\\load_licenta4.py",
                        String.valueOf(latitude),
                        String.valueOf(longitude),
                        String.valueOf(speed)
                };
                Process p4=Runtime.getRuntime().exec(cmd4);
                p4.waitFor();
                result=p4.exitValue();
                System.out.println(p4.exitValue());
                break;
            case 5:
                String[] cmd5 = {
                        "python",
                        "D:\\Desktop\\DriverBehaviorProfilingSpringApp\\src\\main\\resources\\load_licenta5.py",
                        String.valueOf(latitude),
                        String.valueOf(longitude),
                        String.valueOf(speed)
                };
                Process p5=Runtime.getRuntime().exec(cmd5);
                p5.waitFor();
                result=p5.exitValue();
                System.out.println(p5.exitValue());
                break;

        }
        routeDTO.setDriverProfile(result);
        String profile=result==0? "non-aggressive":"aggressive";
        driverService.insertRoute(driverId,vehicleId,routeDTO);
        return "<html>\n" +
                "<head>\n" +
                "</head>\n" +
                "<body>\n" +
                "\n" +
                "<h1>The driver is labeled as being "+profile+" </h1>\n" +
                "<button type=\"button\" onclick=\"window.history.back()\">Back</button>\n" +
                "\n" +
                "</body>\n" +
                "</html>";
    }

    @GetMapping(value = "/driverWithRoutes/{driverId}")
    public DriverWithRoutesDTO getDriverWithRoutesById(@PathVariable("driverId") Integer driverId) throws Exception {
        return driverService.getDriverWithRoutes(driverId);
    }

    @GetMapping(value = "/compareDrivers/{driverId1}/{driverId2}")
    public List<Float> getDriverWithRoutesById(@PathVariable("driverId1") Integer driverId1,
                                                       @PathVariable("driverId2") Integer driverId2) throws Exception {
        return driverService.compareDrivers(driverId1,driverId2);
    }

    @GetMapping(value = "/getNoOfRecordsDrivers")
    public List<String> getNoOfRecordsPerDriver(){
        return driverService.getNoOfRecordsPerDriver();
    }

    @GetMapping(value = "/getNoOfRecordsVehicles")
    public List<String> getNoOfRecordsPerVehicle(){
        return driverService.getNoOfRecordsPerVehicle();
    }


    @GetMapping(value = "/allTripsPerSubjectInADate/{date}")
    public List<String> getNoOfTripsPerDayForADriver( @PathVariable("date") String date){
        return driverService.getTripsPerSubject(date);
    }
}
