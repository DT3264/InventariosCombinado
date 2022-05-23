import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./index.scss";
import { Route, Switch, BrowserRouter, useRouteMatch } from "react-router-dom";
import Index from "./components/index";
import Faq from "./components/faq";
import Movimientos from "./components/movimientos";
import Inventario from "./components/inventarioEx";
import Precios from "./components/precios";
import Soporte from "./components/soporte";
import AppNavBar from "./components/AppNavBar";
import ReporteTopProductos from "./components/ReporteTopProductos";
import ReporteDesgloseProducto from "./components/ReporteDesgloseProducto";

export default function Cliente2() {
  let { path, url } = useRouteMatch();
  return (
    <header className="px-3 mb-3 border-bottom">
      <div>
        <div className="container d-inline d-lg-none p-0 m-0">
          <div className="row justify-content-center">
            <div className="col-1 p-0">
              <img className="logo" src="/img/NW.png" alt="..." />
            </div>
          </div>
        </div>
        <AppNavBar />
        <Switch>
          <Route exact path={path}>
            <Index />
          </Route>
          <Route path={`${path}/precios`}>
            <Precios />
          </Route>
          <Route path={`${path}/faq`}>
            <Faq />
          </Route>
          <Route path={`${path}/soporte`}>
            <Soporte />
          </Route>
          <Route path={`${path}/inventarios`}>
            <Inventario />
          </Route>
          <Route path={`${path}/movimientos`}>
            <Movimientos />
          </Route>
          <Route path={`${path}/reporteventas`}>
            <ReporteDesgloseProducto />
          </Route>
          <Route path={`${path}/reporteempleados`}>
            <ReporteTopProductos />
          </Route>
        </Switch>
      </div>
    </header>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
