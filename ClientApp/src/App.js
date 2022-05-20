import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import CRUDEmpleados from "./components/CRUDEmpleados";
import Movimientos from "./components/Movimientos";
import Cliente2 from "./cliente2/index";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/empleados" component={CRUDEmpleados} />
          <Route path="/movimientos" component={Movimientos} />
          <Route path="/fetch-data" component={FetchData} />
          <Route path="/cliente2">
            <Cliente2 />
          </Route>
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
        </Layout>
      </Switch>
    );
  }
}
