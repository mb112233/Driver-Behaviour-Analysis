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
import {Grid, Row, Col, Alert, Table} from "react-bootstrap";

import Button from "components/CustomButton/CustomButton.jsx";
import * as API_DRIVER from "../components/Driver/driver-api";
import {Card} from "../components/Card/Card";
import ChartistGraph from "react-chartist";
import {dataBar, legendBar, optionsBar, responsiveBar,today} from "../variables/Variables";

class OverallStatistics extends Component {

    constructor(props) {
        super(props);
        this.drivers = [];
        this.vehicles = [];
        this.recordPerDrivers=[];
        this.recordPerVehicles=[];
        this.dataPieDrivers={};
        this.dataPieVehicles={};
        this.legendBarDrivers={};
        this.legendBarVehicles={};
    }

    fetchAllDrivers() {
        return API_DRIVER.getAllDrivers((result, status, err) => {
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.drivers.push({
                        driverId: x.driverId,
                        fullname: x.fullname,
                        address: x.address,
                        email: x.email,
                        yearsOfExperience: x.yearsOfExperience
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

    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i}/>);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

    fetchNoOfRecordsDrivers(){
        return API_DRIVER.getNoOfRecordsDrivers((result, status, err) => {
            this.recordPerDrivers=[];
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.recordPerDrivers.push({
                        x:x
                    });
                });
                var i;
                var dict=[];
                for (i = 0; i < this.recordPerDrivers.length; i++) {
                    let arr=this.recordPerDrivers[i].x.split('-');
                    dict.push(
                        {
                            'name':arr[0],
                            'value':parseInt(arr[1])
                        }
                    )
                }
                dict.sort(function compare(kv1, kv2) {
                    return kv1.value - kv2.value;
                });

                var labels=[];
                var series=[];
                for (i = 0; i < dict.length; i++) {
                    labels[i]=dict[i].name;
                    series[i]=dict[i].value;
                }
                var seriesA=[[],series];
                this.dataPieDrivers={'labels':labels,'series':seriesA};
                this.legendBarDrivers={names:['Drivers'],types:["danger"]};
                this.forceUpdate();
            } else {
                console.log(err);
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    fetchNoOfRecordsVehicles(){
        return API_DRIVER.getNoOfRecordsVehicles((result, status, err) => {
            this.recordPerVehicles=[];
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.recordPerVehicles.push({
                        x:x
                    });
                });
                var i;
                var dict=[];
                for (i = 0; i < this.recordPerVehicles.length; i++) {
                    let arr=this.recordPerVehicles[i].x.split('-');

                    dict.push(
                        {
                            'name':arr[0],
                            'value':parseInt(arr[1])
                        }
                    )
                }
                dict.sort(function compare(kv1, kv2) {
                    return kv1.value - kv2.value;
                });

                var labels=[];
                var series=[];
                for (i = 0; i < dict.length; i++) {
                    labels[i]=dict[i].name;
                    series[i]=dict[i].value;
                }
                var seriesA=[series];
                this.dataPieVehicles={'labels':labels,'series':seriesA};
                this.legendBarVehicles={names:['Vehicles'],types:['info']};
                this.forceUpdate();
            } else {
                console.log(err);
                this.state.errorStatus = status;
                this.state.error = err;
                this.forceUpdate();
            }
        });
    }

    componentDidMount() {
        this.fetchAllDrivers();
        this.fetchAllVehicles();
        this.fetchNoOfRecordsDrivers();
        this.fetchNoOfRecordsVehicles();
    }


    render() {

        const thArray = ['Id', 'Fullname', 'Address', 'Email', 'Years of experience'];
        const thArray2 = ['Id', 'Company', 'Model', 'Car Number'];
        let noOfVehicles = this.vehicles.length;
        let noOfDrivers = this.drivers.length;
        const drivers = this.drivers;
        return (
            <div className="content">
                <Grid fluid>
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Drivers</h4>
                            <p className="category">
                                Total drivers: {noOfDrivers}
                            </p>
                        </div>

                        <div className="content">
                            <Card
                                title=""
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                        <tr>
                                            {thArray.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {drivers.map((d, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{d.driverId} </td>
                                                    <td>{d.fullname} </td>
                                                    <td>{d.address} </td>
                                                    <td>{d.email} </td>
                                                    <td>{d.yearsOfExperience} </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </div>

                        <div className="header">
                            <h4 className="title">Vehicles</h4>
                            <p className="category">
                                Total vehicles: {noOfVehicles}
                            </p>
                        </div>

                        <div className="content">
                            <Card
                                title=""
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                        <tr>
                                            {thArray2.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.vehicles.map((v, key) => {
                                            return (

                                                <tr key={key}>
                                                    <td>{v.vehicleId} </td>
                                                    <td>{v.company} </td>
                                                    <td>{v.model} </td>
                                                    <td>{v.carNumber} </td>

                                                </tr>

                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </div>

                    </div>
                </Grid>
                <Grid fluid>
                    <Row>
                        <Col md={14}>
                            <Card
                                id="chartActivity"
                                title="Number of records per driver"
                                category=""
                                stats={today}
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={Object.keys(this.dataPieDrivers).length === 0 ? dataBar :this.dataPieDrivers}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(Object.keys(this.legendBarDrivers).length === 0 ? legendBar :this.legendBarDrivers)}</div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>

                <Grid fluid>
                    <Row>
                        <Col md={14}>
                            <Card
                                id="chartActivity"
                                title="Number of records per vehicle"
                                category=""
                                stats={today}
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={Object.keys(this.dataPieVehicles).length === 0 ? dataBar :this.dataPieVehicles}
                                            type="Bar"
                                            options={optionsBar}
                                            responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(Object.keys(this.legendBarVehicles).length === 0 ? legendBar :this.legendBarVehicles)}</div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default OverallStatistics;
