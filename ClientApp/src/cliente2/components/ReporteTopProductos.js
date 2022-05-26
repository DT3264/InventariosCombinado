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

export default class ReporteTopProductos extends Component {
  static displayName = ReporteTopProductos.name;

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
    const response = await fetch(`reportes/top5productos/${this.state.anio}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });

    //await this.sleep(6000);

    if (response.status != 403) {
      const data = await response.json();
      this.setState({ data: data, loading: false });
    } else {
      this.setState({ loading: false });
    }
    setTimeout(function () {
      var groupColumn = 0;
      var table = $("#tabla").DataTable({
        columnDefs: [{ visible: false, targets: groupColumn }],
        order: [[groupColumn, "asc"]],
        displayLength: 25,
        drawCallback: function (settings) {
          var api = this.api();
          var rows = api.rows({ page: "current" }).nodes();
          var last = null;

          api
            .column(groupColumn, { page: "current" })
            .data()
            .each(function (group, i) {
              if (last !== group) {
                $(rows)
                  .eq(i)
                  .before(
                    '<tr class="group"><td colspan="5">' + group + "</td></tr>"
                  );

                last = group;
              }
            });
        },
      });

      // Order by the grouping
      $("#tabla tbody").on("click", "tr.group", function () {
        var currentOrder = table.order()[0];
        if (currentOrder[0] === groupColumn && currentOrder[1] === "asc") {
          table.order([groupColumn, "desc"]).draw();
        } else {
          table.order([groupColumn, "asc"]).draw();
        }
      });
    }, 1000);
  }

  groupBy(collection, property) {
    var i = 0,
      val,
      index,
      values = [],
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  renderDataTable(data) {
    if (!data.isUserValid) {
      return <>Usuario no valido</>;
    }
    var options = {
      title: "Top 5 productos vendidos por año",
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chartData = [
      ["Producto", "Trimestre 1", "Trimestre 2", "Trimestre 3", "Trimestre 4"],
    ];
    data.data = data.data.sort((a, b) => b.ventas - a.ventas);
    var agrupados = this.groupBy(data.data, "prod");
    var chartData2 = agrupados.map((e) => {
      var result = [e[0].prod];
      e = e.sort((a, b) => a.trimestre - b.trimestre);
      console.log(e);
      for (var i = 1; i < 5; i++) {
        var v = e.find((x) => x.trimestre == i);
        if (v == undefined) result.push(0);
        else result.push(v.ventas);
      }
      return result;
    });
    //console.log(chartData);
    chartData2.forEach((e) => chartData.push(e));
    return (
      <>
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />

        <div className="container p-5">
          <table id="tabla" className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Trimestre</th>
                <th>Producto</th>
                <th>Ventas</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((result) => {
                return (
                  <tr>
                    <td>{result.trimestre}</td>
                    <td>{result.prod}</td>
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
      this.renderDataTable(this.state)
    );

    return (
      <div>
        <h1 id="tabelLabel">Top 5 productos vendidos por año</h1>
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
