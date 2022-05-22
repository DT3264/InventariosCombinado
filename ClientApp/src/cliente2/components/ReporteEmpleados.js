import React, { Component } from "react";
// import authService from "./api-authorization/AuthorizeService";
import authService from "./../../components/api-authorization/AuthorizeService";
import { Chart } from "react-google-charts";
import LogoCargando from "./LogoCargando";
import { Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";

export default class ReporteEmpleados extends Component {
  static displayName = ReporteEmpleados.name;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isUserValid: false,
      loading: true,
      anio: 1996,
    };
  }

  componentDidMount() {
    this.populateWeatherData();
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#tabla").DataTable({
          pagingType: "full_numbers",
          pageLength: 5,
          processing: true,
          dom: "Bfrtip",
          order: [[1, "desc"]],
          buttons: ["copy", "csv", "print"],
        });
      }, 1000);
    });
  }

  sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }
  async populateWeatherData(anio) {
    authService.getUser().then((u) => {
      const valo = authService.isAdmin(u);
      this.setState({ isUserValid: valo });
    });
    const token = await authService.getAccessToken();
    const response = await fetch(
      `weatherforecast/top5Vendedores/${this.state.anio}`,
      {
        headers: !token ? {} : { Authorization: `Bearer ${token}` },
      }
    );

    await this.sleep(6000);

    if (response.status != 403) {
      const data = await response.json();
      this.setState({ data: data, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  static renderDataTable(data) {
    if (!data.isUserValid) {
      return <>Usuario no valido</>;
    }
    var options = {
      title: "Ventas por empleado",
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chartData = [["Empleado", "Ventas"]];
    data.data = data.data.sort((a, b) => b.ventas - a.ventas);
    data.data.forEach((d) => chartData.push([d.empleado, d.ventas]));
    return (
      <>
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />

        <div className="container p-5">
          <table id="tabla" className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Ventas</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((result) => {
                return (
                  <tr>
                    <td>{result.empleado}</td>
                    <td>{result.ventas}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <>
        <p>
          <em>Cargando</em>
        </p>
        <LogoCargando />
      </>
    ) : (
      ReporteEmpleados.renderDataTable(this.state)
    );

    return (
      <div>
        <h1 id="tabelLabel">Ventas por empleado</h1>
        <Form.Label>
          Año de ventas
          <Form.Select
            aria-label="Año de ventas"
            onChange={(e) => {
              this.setState({ loading: true, anio: e.target.value });
              this.populateWeatherData();
            }}
          >
            <option value="1996">1996</option>
            <option value="1997">1997</option>
            <option value="1998">1998</option>
          </Form.Select>
        </Form.Label>
        {contents}
      </div>
    );
  }
}
