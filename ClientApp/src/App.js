import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import CRUDEmpleados from "./components/CRUDEmpleados";
import Movimientos from "./components/Movimientos";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/empleados" component={CRUDEmpleados} />
        <Route path="/movimientos" component={Movimientos} />
        <Route path="/fetch-data" component={FetchData} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
      </Layout>
    );
  }
}
