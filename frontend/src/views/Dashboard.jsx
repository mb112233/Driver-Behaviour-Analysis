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
import ChartistGraph from "react-chartist";
import {Grid, Row, Col, Table, Navbar} from "react-bootstrap";
import {Card} from "components/Card/Card.jsx";
import {StatsCard} from "components/StatsCard/StatsCard.jsx";
import {
    legendPie,
    today
} from "variables/Variables.jsx";
import AdminNavbarLinks from "../components/Navbars/AdminNavbarLinks";
import UserCard from "../components/UserCard/UserCard";
import * as API_DRIVER from "../components/Driver/driver-api";

const divStyle={
    overflowY: 'scroll',
    width:'500px',
    float: 'left',
    height:'500px',
    position:'relative'
};
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.currentDriverName = undefined;
        this.driverStatistics = {};
        this.tdArray1=[];
        this.tdArray2=[];
        this.dataPie={};
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


    parentFunction(e) {

        this.driverStatistics = {};
        return API_DRIVER.getOverallDriverStatistics(e, (result, status, err) => {

            if (result !== null && status === 200) {

                this.tdArray1=result.stoppingPlaces;
                this.tdArray2=result.fastDrivenPlaces
                this.driverStatistics=result;
                let v=Math.floor(result.drivingProfile * 100);
                let o=100-v;
                this.dataPie={labels:[v.toString()+'%',o.toString()+'%'],series:[v,o]};
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
        let thArray1 = ['Description'];
        let thArray2 = ['Description'];

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={12} sm={12}>
                            <Navbar fluid>
                                <Navbar.Header>
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <AdminNavbarLinks parentCallback={this.parentFunction.bind(this)}
                                                      componentBrand={'Driver statistics'}/>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-server text-warning"/>}
                                statsText="Total distance"
                                statsValue={this.driverStatistics.totalDistance? this.driverStatistics.totalDistance+' KM':NaN}
                                statsIcon={<i className="fa fa-calendar-o"/>}
                                statsIconText={today}
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success"/>}
                                statsText="Total duration"
                                statsValue={this.driverStatistics.totalDuration?(Math.floor(this.driverStatistics.totalDuration/3600))+' H': NaN}
                                statsIcon={<i className="fa fa-calendar-o"/>}
                                statsIconText={today}
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-danger"/>}
                                statsText="Average speed"
                                statsValue={this.driverStatistics.averageSpeed? Math.floor(this.driverStatistics.averageSpeed):NaN}
                                statsIcon={<i className="fa fa-calendar-o"/>}
                                statsIconText={today}
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success"/>}
                                statsText="Number of stops"
                                statsValue={this.driverStatistics.noOfStops? this.driverStatistics.noOfStops:NaN}
                                statsIcon={<i className="fa fa-calendar-o"/>}
                                statsIconText={today}
                            />
                        </Col>
                    </Row>
                    <Row>


                        <Col md={6}>
                            <Card
                                hCenter
                                statsIcon="fa fa-clock-o"
                                title="Driving Profile"
                                category=""
                                stats={today}
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ct-perfect-fourth"
                                    >
                                        <ChartistGraph data={this.dataPie} type="Pie"/>
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendPie)}</div>
                                }
                            />
                        </Col>
                        <Col md={6}>
                            <UserCard
                                bgImage="https://image.freepik.com/free-vector/black-gold-geometric-web-page-size-background_70155-229.jpg"
                                avatar={'data:image/png;base64,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'}
                                name={this.driverStatistics.fullname}
                                userName={this.driverStatistics.email}
                                description={
                                    <span>

                                        <strong>Address</strong>:{this.driverStatistics.address}
                                        <br/>
                                        <strong>Years of experience</strong>: {this.driverStatistics.yearsOfExperience}
                                    </span>
                                }

                            />
                        </Col>


                    </Row>


                    {/*<Row>
                        <Col lg={6} sm={6}>
                            <Card
                                plain
                                title="Places where the driver has stopped"
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div className="scrollit" style={divStyle}>
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            {thArray1.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.tdArray1.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td key={key}>{prop}</td>

                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                    </div>
                                }
                            />
                        </Col>
                        <Col lg={6} sm={6}>
                            <Card
                                plain
                                title="Places where the driver has driven too fast"
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div className="scrollit" style={divStyle}>
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            {thArray2.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.tdArray2.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td key={key}>{prop}</td>

                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>*/}
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
