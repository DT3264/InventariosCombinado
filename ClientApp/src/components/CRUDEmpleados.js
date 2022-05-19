import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import authService from "./api-authorization/AuthorizeService";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import axios from "axios";

// const data = [];

export default class CRUDEmpleados extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      employeeId: "",
      lastName: "",
      firstName: "",
      hireDate: "",
      address: "",
      homePhone: "",
      email: "",
      password: "",
    },
    isAdmin: false,
  };

  componentDidMount() {
    this.populateData();
  }

  async populateData() {
    const token = await authService.getAccessToken();
    const response = await fetch("api/employees/", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    if (response.status != 403) {
      const data = await response.json();
      this.setState({ data: data, loading: false });
    } else {
      this.setState({ loading: false });
      // console.log("Sin autorizacion");
    }
    authService.getUser().then((u) => {
      const isAdmin = authService.isAdmin(u);
      this.setState({ isAdmin: isAdmin });
    });
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  toggleModalActualizar(v) {
    this.setState({ modalActualizar: !v });
  }

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  toggleModalInsertar(v) {
    this.setState({ modalInsertar: !v });
  }

  editar = async (data) => {
    const token = await authService.getAccessToken();
    const headers = !token ? {} : { Authorization: `Bearer ${token}` };
    const response = await axios.put(
      `api/employees`,
      {
        employeeId: data.employeeId,
        lastName: data.lastName,
        firstName: data.firstName,
        hireDate: data.hireDate,
        address: data.address,
        homePhone: data.homePhone,
        email: data.email,
        password: data.password,
      },
      headers
    );
    console.log(response);
    if (response.status != 403) {
      this.populateData();
    } else {
      // console.log("Sin autorizacion");
    }
    this.setState({ modalActualizar: false });
  };

  eliminar = async (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas eliminar el elemento " + dato.employeeId
    );
    if (opcion == true) {
      const token = await authService.getAccessToken();
      const response = await fetch(`api/employees/${dato.employeeId}`, {
        headers: !token ? {} : { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });
      console.log(response);
      if (response.status != 403) {
        this.populateData();
      } else {
        // console.log("Sin autorizacion");
      }
      this.setState({ modalActualizar: false });
    }
  };

  insertar = async () => {
    var data = { ...this.state.form };

    const token = await authService.getAccessToken();
    const headers = !token ? {} : { Authorization: `Bearer ${token}` };
    const response = await axios.post(
      `api/employees`,
      {
        employeeId: 0,
        lastName: data.lastName,
        firstName: data.firstName,
        hireDate: data.hireDate,
        address: data.address,
        homePhone: data.homePhone,
        email: data.email,
        password: data.password,
      },
      headers
    );
    console.log(response);
    if (response.status != 403) {
      this.populateData();
    } else {
      // console.log("Sin autorizacion");
    }
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          {this.state.isAdmin ? (
            <>
              <Button
                color="success"
                onClick={() => this.mostrarModalInsertar()}
              >
                Crear
              </Button>
            </>
          ) : (
            <></>
          )}
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Apellido</td>
                <td>Nombre</td>
                <td>Fecha de ingreso</td>
                <td>Dirección</td>
                <td>Telefono</td>
                <td>Correo</td>
                {this.state.isAdmin ? (
                  <>
                    <td>Clave</td>
                    <td>Accion</td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.employeeId}>
                  <td>{dato.employeeId}</td>
                  <td>{dato.lastName}</td>
                  <td>{dato.firstName}</td>
                  <td>{dato.hireDate}</td>
                  <td>{dato.address}</td>
                  <td>{dato.homePhone}</td>
                  <td>{dato.email}</td>
                  {this.state.isAdmin ? (
                    <>
                      <td>{dato.password}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => this.eliminar(dato)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal
          isOpen={this.state.modalActualizar}
          toggle={() => this.toggleModalActualizar(this.state.modalActualizar)}
        >
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.employeeId}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellidos:</label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.lastName}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.firstName}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de ingreso:</label>
              <input
                className="form-control"
                name="hireDate"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.hireDate}
              />
            </FormGroup>

            <FormGroup>
              <label>Direccion:</label>
              <input
                className="form-control"
                name="address"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.address}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="homePhone"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.homePhone}
              />
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>

            <FormGroup>
              <label>Clave:</label>
              <input
                className="form-control"
                name="password"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.password}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalInsertar}
          toggle={() => this.toggleModalInsertar(this.state.modalInsertar)}
        >
          <ModalHeader>
            <div>
              <h3>Insertar Personaje</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Apellidos:</label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de ingreso:</label>
              <input
                className="form-control"
                name="hireDate"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Direccion:</label>
              <input
                className="form-control"
                name="address"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="homePhone"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Clave:</label>
              <input
                className="form-control"
                name="password"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
