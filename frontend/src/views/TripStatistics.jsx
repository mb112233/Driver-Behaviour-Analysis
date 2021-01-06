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
import React, { Component } from "react";
import {Table, Grid, Row, Col, Navbar} from "react-bootstrap";
import Card from "components/Card/Card";
import ChartistGraph from "react-chartist";
import AdminNavbarLinks from "../components/Navbars/AdminNavbarLinks";
import {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  today
} from "variables/Variables.jsx";
import * as API_DRIVER from "../components/Driver/driver-api";

class TripStatistics extends Component {

  constructor(props) {
    super(props);
    this.totalDistance=undefined;
    this.totalDuration=undefined;
    this.averageSpeed=undefined;
    this.noOfTripsInADayPerSubject=undefined;
    this.dataPieDrivers={};
    this.legendBarDrivers={};
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

  parentFunction(id,date){
    return API_DRIVER.getOverallTripStatistics(id,date,(result, status, err) => {
      if (result !== null && status === 200) {
        let s0=result[0].split("=");
        this.totalDistance=parseInt(s0[1]);
        let s1=result[1].split("=");
        this.totalDuration=parseInt(s1[1]);
        let s2=result[2].split("=");
        this.averageSpeed=parseFloat(s2[1]);
        let s3=result[3].split("=");
        this.noOfTripsInADayPerSubject=parseInt(s3[1]);
        this.forceUpdate();
      } else {
        console.log(err);
        this.state.errorStatus = status;
        this.state.error = err;
        this.forceUpdate();
      }
    });
  }


  getNoOfTripsInADayPerSubject(date){
    return API_DRIVER.getNoOfTripsInADayPerSubject(date,(result, status, err) => {
      if (result !== null && status === 200) {
        var i;
        var dict=[];
        for (i = 0; i < result.length; i++) {
            let s=result[i].split("=");
          dict.push(
              {
                'name':s[0],
                'value':parseInt(s[1])
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
        var seriesA=[[],[],series];
        this.dataPieDrivers={'labels':labels,'series':seriesA};
        this.legendBarDrivers={names:['Drivers'],types:["warning"]};
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
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={12} sm={12}>
              <Navbar fluid>
                <Navbar.Header>
                </Navbar.Header>
                <Navbar.Collapse>
                  <AdminNavbarLinks  parentCallback={this.parentFunction.bind(this)}
                                     parentCallback2={this.getNoOfTripsInADayPerSubject.bind(this)}
                                     componentBrand={"Trip Statistics"}/>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>

          <br/>
          <Row>
            <Col md={12} >
              <Card
                hCenter
                title="Trip statistics information"
                category=""
                ctTableResponsive
                ctTableFullWidth
                ctTableUpgrade
                content={
                  <Table>
                    <thead>
                      <tr>
                        <th />
                       {/* <th className="text-center">Avg</th>*/}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Trip distance (KM)</td>
                        <td>{this.totalDistance? this.totalDistance:NaN}</td>

                      </tr>
                      <tr>
                        <td>Trip time (H)</td>
                        <td>{Math.round(((this.totalDuration/3600) + Number.EPSILON) * 100) / 100}</td>

                      </tr>
                      <tr>
                        <td>Average speed for trip</td>
                        <td>{Math.round((this.averageSpeed + Number.EPSILON) * 100) / 100}</td>

                      </tr>
                      <tr>
                        <td>Number of trips/subject</td>
                        <td>{this.noOfTripsInADayPerSubject? this.noOfTripsInADayPerSubject:NaN}</td>

                      </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>

        <Row>
        <Col md={12}>
          <Card
              hCenter
              id="chartActivity"
              title="Number of trips in a given day per driver"
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
      </div>
    );
  }
}

export default TripStatistics;
