import Background from '../assets/img/d8.jpg';
import React, {Component} from "react";
import {Link} from "react-router-dom";

var var1 = {
    backgroundImage: "url(" + Background + ")",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
}

var var3 = {
    textAlign: "center"
}
var var4 = {
    margin: "auto",
    display: "block",
    backgroundColor: "#aaabad",
    border: "none",
    color: "black",
    padding: "12px 16px",
    fontSize: "16px",
    cursor: "pointer"
}

class Section extends Component {
    render() {
        return (

            <div className={"parent"} style={var1}>
                <div style={{margin: "0"}}>
                    <div style={var3}>
                        <a className="simple-text ">
                            <h1 style={{color: "black", fontSize: "700%", backgroundColor: "#aaabad", padding: "12px 16px",    borderRadius: "15px"}}>
                                <em>Fleet
                                    <a style={{color: "#1DC7EA"}}>rede</a>
                                </em>
                            </h1>
                        </a>
                    </div>
                    <div>
                        <Link to="/admin/companyOverview" >
                        <button class="btn" style={var4}>

                                <em><h7 style={{color: "black"}}>
                                    <i className="fa fa-arrow-right" aria-hidden="true"/>
                                </h7></em>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default Section;