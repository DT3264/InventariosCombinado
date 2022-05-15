import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import { Chart } from "react-google-charts";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], isUserValid: false, loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  async populateWeatherData() {
    authService.getUser().then((u) => {
      console.log(u);
      const valo = authService.isAdmin(u);
      console.log(valo);
      this.setState({ isUserValid: valo });
    });
    const token = await authService.getAccessToken();
    console.log(token);
    const response = await fetch("weatherforecast/top5", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (response.status != 403) {
      const data = await response.json();
      this.setState({ forecasts: data, loading: false });
    } else {
      this.setState({ loading: false });
      // console.log("Sin autorizacion");
    }
  }

  static renderForecastsTable(data) {
    if (!data.isUserValid) {
      return <>Usuario no valido</>;
    }
    console.log(data);
    var options = {
      title: "Ventas por persona",
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chartData = [["Empleado", "Ventas"]];
    data.forecasts.forEach((d) => chartData.push([d.empleado, d.ventas]));
    return (
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderForecastsTable(this.state)
    );

    return (
      <div>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
