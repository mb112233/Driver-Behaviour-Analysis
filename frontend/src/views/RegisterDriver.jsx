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
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

import {Card} from "components/Card/Card.jsx";
import {FormInputs} from "components/FormInputs/FormInputs.jsx";
import {UserCard} from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import {HOST} from "../api/host";

class RegisterDriver extends Component {
    render() {
        return (
            <div className="content">
                {<Grid fluid>
                    <Row>
                        <Col md={10}>
                            <Card
                                title="Driver Profile"
                                content={
                                    <form action={HOST.backend_api+'/'+'registerDriver'} method="post" encType="application/json" >
                                        <FormInputs
                                            ncols={["col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Fullname",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "HARRELL FURGERSON",
                                                    name:'fullname'
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            properties={[
                                                {
                                                    label: "Address",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Speedy Freight LLC\n" +
                                                        "8004 Carriage Way",
                                                    name:'address'
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            properties={[
                                                {
                                                    label: "Years of Experience",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "5",
                                                    name:'yearsOfExperience'
                                                },
                                                {
                                                    label: "Email",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "harell.furgeson@gmail.com",
                                                    name:'email'
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

export default RegisterDriver;
