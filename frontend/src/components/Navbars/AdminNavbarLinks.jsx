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
import {NavItem, Nav, NavDropdown, MenuItem, Form, Row} from "react-bootstrap";
import {InputGroup, InputGroupAddon, Button, Input} from 'reactstrap';

import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import * as API_DRIVER from "../Driver/driver-api";
import {FormInputs} from "../FormInputs/FormInputs";
import DriverLog from "../../views/DriverLog";
import ClassVarHolder from "../../views/ClassVarHolder";
import {PropTypes} from 'react'

class AdminNavbarLinks extends Component {

    constructor(props) {
        super(props);
        this.currentDriver = undefined;
        this.drivers = [];
        this.currentDriverId = 0;

        this.currentDateTrip = undefined;
        this.state = {
            currentDateTrip: '',
            currentDriverId: undefined
        };

        this.handleDriverStatistics = this.handleDriverStatistics.bind(this);
        this.handleTripStatistics = this.handleTripStatistics.bind(this);
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

    fetchOverallTripStatistics(driverId, day) {

        return API_DRIVER.getOverallTripStatistics(driverId, day, (result, status, err) => {

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


    fetchOverallDriverStatistics(driverId) {

        return API_DRIVER.getOverallDriverStatistics(driverId, (result, status, err) => {

            if (result !== null && status === 200) {
                result.forEach(x => {

                    this.drivers.push({
                        id: x.driverId,
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


    handleClick(eventkey, event) {
        this.currentDriver = eventkey;
        if (this.currentDriver !== undefined && Array.isArray(this.drivers) && this.drivers.length)
            var obj = this.drivers.find(d => d.fullname === this.currentDriver);
        this.currentDriverId = obj.driverId;
        this.setState({currentDriverId: obj.driverId});
        this.forceUpdate();
    }

    handleClick2(eventkey, event) {
        this.currentDateTrip=eventkey.target.value;
        this.props.parentCallback2(this.currentDateTrip);

        //console.log('The following date was selected',this.currentDateTrip);
        this.setState({currentDateTrip: eventkey.target.value});
        this.forceUpdate();
    }


    handleDriverStatistics(e) {

        let id=this.currentDriverId;
        this.props.parentCallback(id);

    }

    handleTripStatistics(e) {
        let id=this.currentDriverId;
        let date=this.currentDateTrip;

        this.props.parentCallback(id,date);
    }

    componentDidMount() {
        this.fetchAllDrivers();
    }

    childFunction() {
        let id=this.currentDriverId;
        this.props.parentCallback(id);
    }

    render() {
        let name = this.currentDriver;
        const drivers = this.drivers;
        let componentBrand = this.props.componentBrand;
        if (componentBrand === 'Driver statistics')
            return (
                <div>
                    <Row>
                        <Col lg={3} sm={6}>
                            <Nav onSelect={k => this.handleClick(k)}>
                                <NavDropdown
                                    eventKey={2}
                                    title={name ? name : "Select Driver"}
                                    id="basic-nav-dropdown-right"
                                >
                                    {drivers.map((d, i) => (
                                        <MenuItem key={i} eventKey={d.fullname}>
                                            {d.fullname}
                                        </MenuItem>
                                    ))}
                                </NavDropdown>
                            </Nav>
                        </Col>

                        <Col lg={3} sm={6}>
                            <Button onClick={this.handleDriverStatistics} variant="contained" color="primary">
                                Show driver statistics
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        else if (componentBrand === 'Driver Log')
            return (
                <div>
                    <Row>
                        <Col lg={3} sm={6}>
                            <Nav onSelect={k => this.handleClick(k)}>
                                <NavDropdown
                                    eventKey={2}
                                    title={name ? name : "Select Driver"}
                                    id="basic-nav-dropdown-right"
                                >
                                    {drivers.map((d, i) => (
                                        <MenuItem key={i} eventKey={d.fullname}>
                                            {d.fullname}
                                        </MenuItem>
                                    ))}
                                </NavDropdown>
                            </Nav>
                        </Col>
                        <Button onClick={this.childFunction.bind(this)} className={"btn btn-primary"}>View log

                        </Button>

                    </Row>
                </div>
            );


        else if (componentBrand === 'Trip Statistics')
            return (
                <div>
                    <Row>

                        <Col lg={3} sm={6}>
                            <Nav onSelect={k => this.handleClick(k)}>
                                <NavDropdown
                                    eventKey={2}
                                    title={name ? name : "Select Driver"}
                                    id="basic-nav-dropdown-right"
                                >
                                    {drivers.map((d, i) => (
                                        <MenuItem key={i} eventKey={d.fullname}>
                                            {d.fullname}
                                        </MenuItem>
                                    ))}
                                </NavDropdown>
                            </Nav>
                        </Col>


                            <Col lg={6} sm={6} >
                                <form onChange={k => this.handleClick2(k)}>
                                    <FormInputs
                                        ncols={["col-md-6"]}
                                        properties={[
                                            {
                                                label: " Select trip date:",
                                                type: "date",
                                                bsClass: "form-control",
                                                placeholder: "",

                                            }
                                        ]}
                                    />
                                </form>
                            </Col>

                        <Col>
                            <Button onClick={this.handleTripStatistics} className={"btn btn-primary"} >View

                            </Button>
                        </Col>
                    </Row>
                </div>
            );

        else
            return (
                <div>
                    <Row>

                        <Col lg={3} sm={6}>
                            <Nav onSelect={k => this.handleClick(k)}>

                            </Nav>
                        </Col>
                    </Row>
                </div>
            );

    }
}

export default AdminNavbarLinks;
