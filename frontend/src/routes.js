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
import Dashboard from "views/Dashboard.jsx";
import StartPage from "views/StartPage.jsx";
import RegisterDriver from "views/RegisterDriver.jsx";
import CompareDrivers from "views/CompareDrivers.jsx";
import RegisterCar from "views/RegisterCar.jsx";

import DriverLog from "views/DriverLog.jsx";
import OverallStatistics from "views/OverallStatistics.jsx";
import Upgrade from "views/TripStatistics.jsx";
import RouteInfo from "./views/RouteInfo";

const dashboardRoutes = [

  {
    path: "/companyOverview",
    name: "Company Overview",
    icon: "pe-7s-global",
    component: OverallStatistics,
    layout: "/admin"
  },
  {
    path: "/driverStatistics",
    name: "Driver statistics",
    icon: "pe-7s-graph1",
    component: Dashboard,
    layout: "/admin"
  },
  {

    path: "/tripStatistics",
    name: "Trip Statistics",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  },
  {
  path: "/compareDrivers",
  name: "Compare drivers",
  icon: "pe-7s-note2",
  component: CompareDrivers,
  layout: "/admin"
},
  {
    path: "/registerDriver",
    name: "Register Driver",
    icon: "pe-7s-user",
    component: RegisterDriver,
    layout: "/admin"
  },
  {
    path: "/registerCar",
    name: "Register Car",
    icon: "pe-7s-car",
    component: RegisterCar,
    layout: "/admin"
  },
  {

    path: "/manageRoutes",
    name: "Manage Routes",
    icon: "pe-7s-way",
    component: RouteInfo,
    layout: "/admin"
  },
  {
    path: "/driverLog",
    name: "Driver Log",
    icon: "pe-7s-news-paper",
    component: DriverLog,
    layout: "/admin"
  },

];

export default dashboardRoutes;
