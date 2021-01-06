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
import {Row, Col, Nav, NavDropdown, MenuItem} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import * as API_DRIVER from "../components/Driver/driver-api";
import ChartistGraph from "react-chartist";
import {dataPie, legendPie,today} from "variables/Variables";
import Button from "react-bootstrap/lib/Button";

class CompareDrivers extends Component {

    constructor(props) {
        super(props);
        this.currentDriverId1 = undefined;
        this.currentDriver1 = undefined;
        this.currentDriverId2 = undefined;
        this.currentDriver2 = undefined;
        this.drivers = [];
        this.results = [];
        this.dataPie1=[];
        this.dataPie2=[];
        this.state = {
            currentDriverId1: undefined,
            currentDriverId2: undefined,

        };
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

    componentDidMount() {
        this.fetchAllDrivers();
    }

    handleClick1(eventkey, event) {
        this.currentDriver1 = eventkey;
        if (this.currentDriver1 !== undefined && Array.isArray(this.drivers) && this.drivers.length)
            var obj = this.drivers.find(d => d.fullname === this.currentDriver1);
        this.currentDriverId1 = obj.driverId;
        this.setState({currentDriverId1:obj.driverId});
        this.forceUpdate();
    }

    handleClick2(eventkey, event) {
        this.currentDriver2 = eventkey;
        if (this.currentDriver2 !== undefined && Array.isArray(this.drivers) && this.drivers.length)
            var obj = this.drivers.find(d => d.fullname === this.currentDriver2);
        this.currentDriverId2 = obj.driverId;
        this.setState({currentDriverId2:obj.driverId});
        this.forceUpdate();
    }

    handleButton() {
        console.log("A",this.currentDriverId1);
        console.log("A",this.currentDriverId2);
        if ((this.currentDriverId1 !== undefined) && (this.currentDriverId2 !== undefined)) {
            return API_DRIVER.compareDrivers(this.currentDriverId1,this.currentDriverId2,(result, status, err) => {
                this.results=[];
                if (result !== null && status === 200) {
                    result.forEach(x => {

                        this.results.push({
                            x:x
                        });
                    });
                    let v1=Math.floor(this.results[0].x * 100);
                    let v2=Math.floor(this.results[1].x * 100);
                    let o1=100-v1;
                    let o2=100-v2;
                    this.dataPie1={labels:[v1.toString()+'%',o1.toString()+'%'],series:[v1,o1]};
                    this.dataPie2={labels:[v2.toString()+'%',o2.toString()+'%'],series:[v2,o2]};
                    this.forceUpdate();
                } else {
                    console.log(err);
                    this.state.errorStatus = status;
                    this.state.error = err;
                    this.forceUpdate();
                }
            });
        }else{
            this.forceUpdate();
        }
    }

    render() {
        let name1 = this.currentDriver1;
        let name2 = this.currentDriver2;
        const drivers = this.drivers;

        return (
            <div className="content">
                <Row>
                    <Col lg={6} md={4}>
                        <Nav onSelect={k => this.handleClick1(k)}>
                            <NavDropdown
                                eventKey={2}
                                title={name1 ? name1 : "Select Driver1"}
                                id="basic-nav-dropdown-right"
                            >
                                {drivers.map((d, i) => (
                                    <MenuItem key={i} eventKey={d.fullname}>
                                        {d.fullname}
                                    </MenuItem>
                                ))}
                            </NavDropdown>

                        </Nav>
                        <Card
                            hCenter
                            statsIcon="fa fa-clock-o"
                            title="Driving style"
                            category=""
                            stats={today}
                            content={
                                <div
                                    id="chartPreferences"
                                    className="ct-chart ct-perfect-fourth"
                                >
                                    <ChartistGraph data={this.dataPie1} type="Pie"/>
                                </div>
                            }
                            legend={
                                <div className="legend">{this.createLegend(legendPie)}</div>
                            }
                        />
                    </Col>

                    <Col lg={6} md={4}>
                        <Nav onSelect={k => this.handleClick2(k)}>
                            <NavDropdown
                                eventKey={2}
                                title={name2 ? name2 : "Select Driver2"}
                                id="basic-nav-dropdown-right"
                            >
                                {drivers.map((d, i) => (
                                    <MenuItem key={i} eventKey={d.fullname}>
                                        {d.fullname}
                                    </MenuItem>
                                ))}
                            </NavDropdown>
                        </Nav>
                        <Card
                            hCenter
                            statsIcon="fa fa-clock-o"
                            title="Driving style"
                            category=""
                            stats={today}
                            content={
                                <div
                                    id="chartPreferences"
                                    className="ct-chart ct-perfect-fourth"
                                >
                                    <ChartistGraph data={this.dataPie2} type="Pie"/>
                                </div>
                            }
                            legend={
                                <div className="legend">{this.createLegend(legendPie)}</div>
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Button type="submit" onClick={k => this.handleButton(k)}>
                            Compare
                        </Button>
                        <div className="clearfix"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CompareDrivers;
