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
import {
    Grid,
    Row,
    Col
} from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import Button from "react-bootstrap/lib/Button";
import {HOST} from "../api/host";

class RegisterCar extends Component {
    render() {
        return (
            <div className="content">
                {<Grid fluid>
                    <Row>
                        <Col md={10}>
                            <Card
                                title="Car Information"
                                content={
                                    <form action={HOST.backend_api + '/registerCar'} method="post" encType="application/json">
                                        <FormInputs
                                            ncols={["col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Company ",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Renault",
                                                    name: "company"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Model",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Renault Master",
                                                    name:"model"
                                                },
                                                {
                                                    label: "Fabrication year",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "2001",
                                                    name:"fabricationYear"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[

                                                {
                                                    label: "Fuel consumption (L)",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "200.56",
                                                    name:"fuelConsumption"
                                                },
                                                {
                                                    label: "Car number",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "MS-4343-JOJO",
                                                    name:"carNumber"
                                                }
                                            ]}
                                        />

                                        <Button  type="submit">
                                            Register
                                        </Button>
                                        <div className="clearfix"/>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>}
            </div>
        );
    }
}
export default RegisterCar;
