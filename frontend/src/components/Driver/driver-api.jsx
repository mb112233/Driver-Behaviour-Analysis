import {HOST} from '../../api/host';
import RestApiClient from "../../api/rest-api";


const endpoint = {
    get_all_drivers: '/allDrivers',
    get_all_routes_from_driver: '/',
    get_driver_with_routes: '/driverWithRoutes/',
    get_all_trips_per_subject: '/allTripsPerSubjectInADate/',
    get_driver_trip_statistics: '/tripFromDriver/',
    get_all_vehicles: '/allVehicles',
    get_overall_driver_statistics: '/getOverallDriverStatistics/',
    get_overall_trip_statistics: '/getOverallTripStatistics/',
    compare_drivers: '/compareDrivers',
    get_no_records_drivers: '/getNoOfRecordsDrivers',
    get_no_records_vehicles: '/getNoOfRecordsVehicles'
};


function getAllDrivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.get_all_drivers, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getNoOfRecordsDrivers(callback) {
    let request = new Request(HOST.backend_api + endpoint.get_no_records_drivers, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getNoOfRecordsVehicles(callback) {
    let request = new Request(HOST.backend_api + endpoint.get_no_records_vehicles, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function compareDrivers(driverId1, driverId2, callback) {
    let request = new Request(HOST.backend_api + endpoint.compare_drivers + '/' + driverId1 + '/' + driverId2, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getAllRoutesFromDriver(driverId, callback) {
    let request = new Request(HOST.backend_api + endpoint.get_all_routes_from_driver + driverId, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDriverWithRoutes(driverId, callback) {
    let request = new Request(HOST.backend_api + endpoint.get_driver_with_routes + driverId, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getNoOfTripsInADayPerSubject(date,callback) {
    let request = new Request(HOST.backend_api + endpoint.get_all_trips_per_subject+date, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function getAllVehicles(callback) {
    let request = new Request(HOST.backend_api + endpoint.get_all_vehicles, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

    function getOverallDriverStatistics(driverId, callback) {
        let request = new Request(HOST.backend_api + endpoint.get_overall_driver_statistics + driverId, {
            method: 'GET',
        });
        console.log(request.url);
        RestApiClient.performRequest(request, callback);
    }

function getOverallTripStatistics(driverId, day, callback) {
        let request = new Request(HOST.backend_api + endpoint.get_overall_trip_statistics  + driverId + '/' + day, {
            method: 'GET',
        });
        console.log(request.url);
        RestApiClient.performRequest(request, callback);
    }

export {
    getAllDrivers,
    getAllRoutesFromDriver,
    getDriverWithRoutes,
    getNoOfTripsInADayPerSubject,
    getOverallTripStatistics,
    getAllVehicles,
    getOverallDriverStatistics,
    compareDrivers,
    getNoOfRecordsDrivers,
    getNoOfRecordsVehicles
};
