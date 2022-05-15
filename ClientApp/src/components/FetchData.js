import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import { Chart } from "react-google-charts";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken();
    const response = await fetch("weatherforecast/top5", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

  static renderForecastsTable(data) {
    console.log(data);
    var options = {
      title: "Ventas por persona",
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chartData = [["Empleado", "Ventas"]];
    data.forEach((d) => chartData.push([d.empleado, d.ventas]));
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
      FetchData.renderForecastsTable(this.state.forecasts)
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
