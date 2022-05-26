import { useState, useEffect } from "react";
import { Table, Modal, Button, Container, Form, Row } from "react-bootstrap";
import authService from "./api-authorization/AuthorizeService";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Movimientos() {
  const [formData, setFormData] = useState({
    fecha: new Date(),
    movimiento: "",
    almacen: "",
    clave: "",
    cantidad: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isGerente, setIsGerente] = useState(false);

  const [movimientos, setMovimientos] = useState([]);
  const [index, setIndex] = useState(-1);
  const handleClose = () => setIndex(-1);
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const closeAgregar = () => {
    setFormData({
      fecha: new Date(),
      movimiento: "",
      almacen: "",
      clave: "",
      cantidad: "",
      origen: "",
      destino: "",
      traspaso: false,
    });
    setShowModalAgregar(false);
  };
  const populateData = async () => {
    authService.getUser().then((u) => {
      const gerente = authService.isGerente(u);
      setIsGerente(gerente);
    });
    const token = await authService.getAccessToken();
    const response = await fetch("api/movements", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setMovimientos(data);
  };

  useEffect(() => {
    populateData();
  }, []);

  const agregaMovimiento = async () => {
    const token = await authService.getAccessToken();
    const config = {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    };

    const date = formData.fecha;
    const anio = date.getFullYear();
    const mes = date.getMonth() <= 9 ? `0${date.getMonth()}` : date.getMonth();
    const dia = date.getDay() <= 9 ? `0${date.getDay()}` : date.getDay();
    const fecha = `${anio}-${mes}-${dia}`;
    if (formData.traspaso) {
      const traspaso = {
        date: `${fecha}T00:00:00`,
        type: formData.movimiento,
        originWarehouseId: formData.origen,
        targetWarehouseId: formData.destino,
        products: [{ clave: formData.clave, cantidad: formData.cantidad }],
      };
      console.log(traspaso);
      const response = await axios.post(
        "api/movements/traspaso",
        traspaso,
        config
      );
      console.log(response);
    } else {
      const movimiento = {
        date: `${fecha}T00:00:00`,
        type: formData.movimiento,
        originWarehouseId: formData.almacen,
        products: [{ clave: formData.clave, cantidad: formData.cantidad }],
      };
      const response = await axios.post(
        "api/movements/movimiento",
        movimiento,
        config
      );
      console.log(response);
    }

    populateData();

    closeAgregar();
  };

  const openAgregar = () => {
    setFormData({ ...formData, traspaso: false });
    setShowModalAgregar(true);
  };
  const openTraspaso = () => {
    setFormData({ ...formData, traspaso: true, movimiento: "Traspaso" });
    setShowModalAgregar(true);
  };

  return (
    <>
      <Container>
        {isGerente ? (
          <>
            <Button
              className="btn btn-primary"
              variant="primary"
              onClick={openAgregar}
            >
              Agregar movimiento
            </Button>
            <Button
              className="btn btn-primary mx-1"
              variant="primary"
              onClick={openTraspaso}
            >
              Agregar traspaso
            </Button>
          </>
        ) : (
          <></>
        )}

        <Table>
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Tipo de movimiento</th>
              <th scope="col">Almacén</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((x, i) => (
              <tr key={i}>
                <td>{x.fecha}</td>
                <td>{x.movimiento}</td>
                <td>
                  {x.almacenOrigen}
                  {x.almacenDestino != undefined
                    ? ` - ${x.almacenDestino}`
                    : ""}
                </td>
                <td>
                  <Button
                    className="btn btn-primary"
                    variant="primary"
                    onClick={() => setIndex(i)}
                  >
                    Ver detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={index !== -1} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de movimiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Productos</p>
            {index >= 0
              ? movimientos[index].productos.map((x) => (
                  <p key={x.productName}>
                    {x.productName}: {x.quantity} unidades
                  </p>
                ))
              : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModalAgregar} onHide={closeAgregar}>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData.traspaso ? "Compras/Ventas/Ajustes" : "Traspasos"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="row">
              <Form.Group
                className={
                  formData.traspaso
                    ? "col-12 col-lg-12 mb-3"
                    : "col-12 col-lg-6 mb-3"
                }
                controlId="fecha"
              >
                <Form.Label>Fecha</Form.Label>
                <DatePicker
                  selected={formData.fecha}
                  onChange={(date) => {
                    setFormData({ ...formData, fecha: date });
                  }}
                />
              </Form.Group>
              {formData.traspaso ? (
                <></>
              ) : (
                <Form.Group className="col-12 col-lg-6 mb-3">
                  <Form.Label>Tipo de movimiento</Form.Label>
                  <Form.Select
                    name="movimiento"
                    onChange={handleInputChange}
                    value={formData.movimiento}
                  >
                    <option>Seleccione un movimiento</option>
                    <option>COMPRA</option>
                    <option>VENTA</option>
                    <option>AJUSTE</option>
                  </Form.Select>
                </Form.Group>
              )}
              <Row>
                {formData.traspaso ? (
                  <>
                    <Form.Group className="col-6 mb-3">
                      <Form.Label>Almacen de origen</Form.Label>
                      <Form.Select
                        name="origen"
                        onChange={handleInputChange}
                        value={formData.origen}
                      >
                        <option>Seleccione un origen</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="col-6 mb-3">
                      <Form.Label>Almacen de destino</Form.Label>
                      <Form.Select
                        name="destino"
                        onChange={handleInputChange}
                        value={formData.destino}
                      >
                        <option>Seleccione un destino</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </Form.Select>
                    </Form.Group>
                  </>
                ) : (
                  <Form.Group className="col-12 mb-3">
                    <Form.Label>Almacen</Form.Label>
                    <Form.Select
                      name="almacen"
                      onChange={handleInputChange}
                      value={formData.almacen}
                    >
                      <option>Seleccione un almacen</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </Form.Select>
                  </Form.Group>
                )}
              </Row>
              <Form.Group className="col-12 col-lg-6 mb-3" controlId="clave">
                <Form.Label>Clave del producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Clave de producto"
                  name="clave"
                  onChange={handleInputChange}
                  value={formData.clave}
                />
              </Form.Group>
              <Form.Group className="col-12 col-lg-6 mb-3" controlId="cantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cantidad"
                  name="cantidad"
                  onChange={handleInputChange}
                  value={formData.cantidad}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAgregar}>
              Cerrar
            </Button>
            <Button variant="secondary" onClick={agregaMovimiento}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
