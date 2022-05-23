import React, { Component } from "react";
// import authService from "./api-authorization/AuthorizeService";
import authService from "../../components/api-authorization/AuthorizeService";
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
import MultiRangeSlider from "multi-range-slider-react";

export default class ReporteDesgloseProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isUserValid: false,
      loading: true,
      ids: [],
      pID: -1,
      minValue: 0,
      maxValue: 23,
    };
  }

  handleInput(e) {
    this.setState({ minValue: e.minValue });
    this.setState({ maxValue: e.maxValue });
  }
  componentDidMount() {
    this.fetchIds();
    this.populateData();
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#tabla").DataTable({
          pagingType: "full_numbers",
          pageLength: 15,
          processing: true,
          dom: "Bfrtip",
          order: [[0, "asc"]],
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
onlyUnique(v, i, s){
  return s.indexOf(v) === i;
}

  async fetchIds() {
    authService.getUser().then((u) => {
      const valo = authService.isAdmin(u);
      this.setState({ isUserValid: valo });
    });
    const response = await fetch(
      `products`,
    );
    const data = await response.json();
    console.log(data);
    if(data!= undefined){
    const unique = [...new Map(data.map(i => [i.productName, i])).values()];
    this.setState({ ids: unique, loading: false });
    }
  }
  async populateData() {
    authService.getUser().then((u) => {
      const valo = authService.isAdmin(u);
      this.setState({ isUserValid: valo });
    });
    const token = await authService.getAccessToken();
    const deFecha = this.fechas[this.state.minValue];
    const aFecha = this.fechas[this.state.maxValue];
    const response = await fetch(
      `reportes/productopormes/${this.state.pID},${deFecha},${aFecha}`,
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

  formateaFecha(fecha) {
    return fecha.substring(0, 4) + "-" + fecha.substring(4, 6);
  }

  renderDataTable(data) {
    if (!data.isUserValid) {
      return <>Usuario no valido</>;
    }
    var options = {
      title: "Ventas por producto en un periodo",
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chartData = [["Fecha", "Ventas"]];
    data.data = data.data.sort((a, b) => b.fecha < a.fecha);
    data.data.forEach((d) => {
      d.fecha = this.formateaFecha(d.fecha);
      chartData.push([d.fecha, d.ventas]);
    });
    return (
      <>
        <Chart
          chartType="Line"
          width="100%"
          data={chartData}
          options={options}
        />

        <div className="container p-5">
          <table id="tabla" className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Ventas</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((result) => {
                return (
                  <tr>
                    <td>{result.fecha}</td>
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

  fechas = [
    "199607",
    "199608",
    "199609",
    "199610",
    "199611",
    "199612",
    "199701",
    "199702",
    "199703",
    "199704",
    "199705",
    "199706",
    "199707",
    "199708",
    "199709",
    "199710",
    "199711",
    "199712",
    "199801",
    "199802",
    "199803",
    "199803",
    "199804",
    "199805",
  ];
  render() {
    let contents = this.state.loading ? (
      <>
        <p>
          <em>Cargando</em>
        </p>
        <LogoCargando />
      </>
    ) : this.state.data.length > 0 ? (
      this.renderDataTable(this.state)
    ) : (
      <p>No hay datos para el producto/fecha especificados</p>
    );

    console.log("ids:")
    console.log(this.state.ids);
    return (
      <div>
        <h1 id="tabelLabel">Ventas por producto</h1>
        <Form.Label>
          ID del producto
          <Form.Select
            aria-label="Año de ventas"
            value={this.state.pID}
            onChange={(e) => {
              this.setState({ loading: true, pID: e.target.value });
              this.populateData();
            }}
          >
            <option value="-1">Seleccione un producto</option>
            {this.state.ids.map(i => 
            <option value={i.productId}>{i.productName}</option>)}
          </Form.Select>
        </Form.Label>
        <br></br>
        Rango de fechas
        <MultiRangeSlider
          min={0}
          max={23}
          step={1}
          ruler={false}
          label={false}
          preventWheel={false}
          minValue={this.state.minValue}
          maxValue={this.state.maxValue}
          onInput={(e) => {
            this.setState({ loading: true });
            this.handleInput(e);
            this.populateData();
          }}
        />
        <Form.Label>
          De {this.formateaFecha(this.fechas[this.state.minValue])}
        </Form.Label>
        <br></br>
        <Form.Label>
          A {this.formateaFecha(this.fechas[this.state.maxValue])}
        </Form.Label>
        {contents}
      </div>
    );
  }
}
