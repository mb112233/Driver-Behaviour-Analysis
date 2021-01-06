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
import {Grid, Row, Col, Table, Navbar} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import * as API_DRIVER from "../components/Driver/driver-api";
import AdminNavbarLinks from "../components/Navbars/AdminNavbarLinks";

class DriverLog extends Component {

    constructor(props) {
        super(props);
        this.routes=[]
        this.id=undefined;
    }

    fetchRoutesFromDriver(driverId) {
        this.routes=[];
        return API_DRIVER.getAllRoutesFromDriver(driverId,(result, status, err) => {

            if (result !== null && status === 200) {
                result.forEach(x => {

                    this.routes.push({
                        routeID: x.routeID,
                        tripDate: x.tripDate,
                        latitude:x.latitude,
                        longitude:x.longitude,
                        speed:x.speed,
                        tripDuration:x.tripDuration,
                        description:x.description,
                        inTown:x.inTown,
                        driverProfile:x.driverProfile
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

    render() {
        let routes=this.routes;
        let thArray=['Date','Duration (HH-mm-ss)','Activity','Location'];
        console.log(routes);
        return (
            <div>
                <Navbar fluid>
                    <Navbar.Header>
                    </Navbar.Header>
                    <Navbar.Collapse >
                        <AdminNavbarLinks  parentCallback={this.fetchRoutesFromDriver.bind(this)} componentBrand={'Driver Log'}/>
                    </Navbar.Collapse>
                </Navbar>
            <Grid fluid>
                <Row>

                    <Col md={12}>
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

                                    {routes.map((d, key) => {
                                        return (
                                            <tr key={key}>

                                                <td>{d.tripDate}</td>
                                                <td>{new Date(d.tripDuration * 1000).toISOString().substr(11, 8)}</td>
                                                {d.speed !==0 ?<td>Driving</td>: <td>Off-duty</td>}
                                                <td>{d.description}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
            </div>
        );
    }
}
export default DriverLog;
