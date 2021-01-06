/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component} from "react";
import {Grid, Row, Col, Nav, NavDropdown, MenuItem} from "react-bootstrap";

import Card from "components/Card/Card";
import {iconsArray} from "variables/Variables.jsx";
import {HOST} from "../api/host";
import {FormInputs} from "../components/FormInputs/FormInputs";
import Button from "react-bootstrap/lib/Button";
import * as API_DRIVER from "../components/Driver/driver-api";

class RouteInfo extends Component {


    constructor(props) {
        super(props);
        this.currentDriverName = undefined;
        this.currentVehicleName = undefined;
        this.drivers = [];
        this.vehicles = [];
        this.currentDriverId = 0;
        this.currentVehicleId = 0;
        this.latitude=undefined;
        this.configId=undefined;
        this.state = {
            currentDriverId: undefined,
            currentVehicleId: undefined,
            latitude:undefined,
            longitude:undefined,
            speed:undefined,
            distance:undefined,
            date:undefined,
            tripDuration:undefined,
            configId:0
        };
    }

    fetchAllDrivers() {

        return API_DRIVER.getAllDrivers((result, status, err) => {

            if (result !== null && status === 200) {
                result.forEach(x => {

                    this.drivers.push({
                        driverId: x.driverId,
                        fullname: x.fullname,
                    });
                });
                this.forceUpdate();
            } else {
                console.log(err);
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    fetchAllVehicles() {

        return API_DRIVER.getAllVehicles((result, status, err) => {

            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.vehicles.push({
                        vehicleId: x.vehicleId,
                        company: x.company,
                        model: x.model,
                        yearOfFabrication: x.yearOfFabrication,
                        carNumber: x.carNumber,
                        fuelConsumption: x.fuelConsumption
                    });
                });
                this.forceUpdate();
            } else {
                console.log(err);
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    handleClick1(eventkey, event) {
        this.currentDriverName = eventkey;
        if (this.currentDriverName !== undefined && Array.isArray(this.drivers) && this.drivers.length)
            var obj = this.drivers.find(d => d.fullname === this.currentDriverName);
        this.currentDriverId = obj.driverId;
        this.setState({currentDriverId: obj.driverId});
        this.forceUpdate();
    }

    handleClick2(eventkey, event) {
        this.currentVehicleName = eventkey;
        if (this.currentVehicleName !== undefined && Array.isArray(this.vehicles) && this.vehicles.length)
            var obj = this.vehicles.find(d => d.model === this.currentVehicleName);
        this.currentVehicleId = obj.vehicleId;
        this.setState({currentVehicleId: obj.vehicleId});
        this.forceUpdate();
    }


    componentDidMount() {
        this.fetchAllDrivers();
        this.fetchAllVehicles();

    }

    handleClickButton(event){
        console.log(event.target.value);
        this.setState({configId:event.target.value});
    }


    render() {
        const drivers = this.drivers;
        const vehicles = this.vehicles;
        let name1 = this.currentDriverName;
        let name2 = this.currentVehicleName;

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={10}>
                            <Card
                                title="Add a new route measurement"
                                content={
                                    <form action={HOST.backend_api  + '/registerRouteMeasurements'} method="post" encType="application/json" target="_self">
                                        <Row>
                                            <Nav onSelect={k => this.handleClick1(k)}>
                                                <NavDropdown
                                                    eventKey={2}
                                                    title={name1 ? name1 : "Select Driver"}
                                                    id="basic-nav-dropdown-right"
                                                >
                                                    {drivers.map((d, i) => (
                                                        <MenuItem key={i} eventKey={d.fullname}>
                                                            {d.fullname}
                                                        </MenuItem>
                                                    ))}
                                                </NavDropdown>
                                            </Nav>


                                            <Nav onSelect={k => this.handleClick2(k)}>
                                                <NavDropdown
                                                    eventKey={2}
                                                    title={name2 ? name2 : "Select Vehicle"}
                                                    id="basic-nav-dropdown-right"

                                                >
                                                    {vehicles.map((v, i) => (
                                                        <MenuItem key={i} eventKey={v.model}>
                                                            {v.model}
                                                        </MenuItem>
                                                    ))}
                                                </NavDropdown>
                                            </Nav>
                                        </Row>
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Latitude",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "-23.222",
                                                    name: 'latitude'
                                                },
                                                {
                                                    label: "Longitude",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "56.7653",
                                                    name: 'longitude'
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Speed (KM/H)",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "54 ",
                                                    name: 'speed'
                                                },
                                                {
                                                    label: "Distance (KM)",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "100",
                                                    name: 'distance'
                                                }
                                            ]}
                                        />

                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Date",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "MM/DD/YYYY ",
                                                    name: 'date'
                                                },
                                                {
                                                    label: "Duration of trip (sec)",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "1001",
                                                    name: 'tripDuration'
                                                }
                                            ]}
                                        />

                                        <input type='text' style={{display: 'none'}} name={'driverId'}
                                               value={this.state.currentDriverId || ''} readOnly/>
                                        <input type='text' style={{display: 'none'}} name={'vehicleId'}
                                               value={this.state.currentVehicleId || ''} readOnly/>


                                        <label> Select a model configuration:</label>
                                        <div>
                                            <input type="radio" id="C1" name="configId" value="1" />
                                            <label htmlFor="C1">Model 1-> 5 Dense Layers, epochs:1500, batch size:300,
                                                shuffled
                                                dataset->Accuracy:96.37%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="C2" name="configId" value="2" />
                                            <label htmlFor="C2">
                                                Model 2-> 3 Dense Layers, epochs:200, batch size:300,default
                                                dataset->Accuracy:91.40%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="C3" name="configId" value="3" />
                                            <label htmlFor="C3">Model 3-> 6 Dense Layers, epochs:500, batch size:100,
                                                default
                                                dataset->Accuracy:90.71%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="C4" name="configId" value="4" />
                                            <label htmlFor="C4">Model 4-> 11 Dense Layers, epochs:1500, batch size:500,
                                                default
                                                dataset->Accuracy:94.19%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="C5" name="configId" value="5" />
                                            <label htmlFor="C5">Model 5-> 5 Dense Layers, epochs:1500, batch size:400,
                                                shuffled
                                                dataset->Accuracy:95.75%</label>
                                        </div>

                                        <Row>
                                            <Col md={10}>
                                                <Button  type="submit" >
                                                    Classify driver
                                                </Button>
                                                <div className="clearfix"/>
                                                <br/>

                                            </Col>

                                        </Row>
                                    </form>
                                }
                            />

                        </Col>
                    </Row>
                </Grid>


            </div>
        );
    }
}

export default RouteInfo;
