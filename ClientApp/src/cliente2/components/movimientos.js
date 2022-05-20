import { useState } from "react";
import { Table, Modal, Button, Container, Form, Row } from "react-bootstrap";

export default function Movimientos() {
  const [formData, setFormData] = useState({
    fecha: "",
    movimiento: "",
    almacen: "",
    clave: "",
    cantidad: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const movimientosIniciales = [
    {
      fecha: "1996-07-04",
      movimiento: "Salida por venta",
      almacen: "Pasarela",
      productos: [{ clave: 1, cantidad: 2 }],
    },
    {
      fecha: "1996-07-05",
      movimiento: "Traspaso entre almacenes",
      almacen: "Casa Chic - Pasarela",
      productos: [
        { clave: 19, cantidad: 10 },
        { clave: 16, cantidad: 15 },
      ],
    },
    {
      fecha: "1996-07-08",
      movimiento: "Ajuste",
      almacen: "Naturart",
      productos: [{ clave: 17, cantidad: 1 }],
    },
    {
      fecha: "1996-07-10",
      movimiento: "Salida por venta",
      almacen: "Pasarela",
      productos: [
        { clave: 56, cantidad: 12 },
        { clave: 42, cantidad: 31 },
      ],
    },
    {
      fecha: "1996-07-24",
      movimiento: "Traspaso entre almacenes",
      almacen: "Pasarela - Naturart",
      productos: [{ clave: 1, cantidad: 2 }],
    },
    {
      fecha: "1996-07-30",
      movimiento: "Ajuste",
      almacen: "Naturart",
      productos: [
        { clave: 17, cantidad: 14 },
        { clave: 9, cantidad: 9 },
      ],
    },
    {
      fecha: "1996-08-14",
      movimiento: "Traspaso entre almacenes",
      almacen: "Naturart - Confort house",
      productos: [{ clave: 18, cantidad: 4 }],
    },
  ];
  const [movimientos, setMovimientos] = useState(movimientosIniciales);
  const [index, setIndex] = useState(-1);
  const handleClose = () => setIndex(-1);
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const closeAgregar = () => {
    setFormData({
      fecha: "",
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

  const agregaMovimiento = () => {
    if (formData.traspaso) {
      movimientos.push({
        fecha: formData.fecha,
        movimiento: formData.movimiento,
        almacen: formData.origen + " - " + formData.destino,
        productos: [{ clave: formData.clave, cantidad: formData.cantidad }],
      });
    } else {
      movimientos.push({
        fecha: formData.fecha,
        movimiento: formData.movimiento,
        almacen: formData.almacen,
        productos: [{ clave: formData.clave, cantidad: formData.cantidad }],
      });
    }
    setMovimientos(movimientos);
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
                <td>{x.almacen}</td>
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
        <Modal show={index !== -1} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de movimiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Productos</p>
            {index >= 0
              ? movimientos[index].productos.map((x) => (
                  <p key={x.clave}>
                    Clave: {x.clave}, Cantidad: {x.cantidad}
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
            <Modal.Title>Compras/Ventas/Ajustes/Traspasos</Modal.Title>
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
                <Form.Control
                  type="text"
                  placeholder="Fecha"
                  name="fecha"
                  onChange={handleInputChange}
                  value={formData.fecha}
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
                    <option>Compra</option>
                    <option>Venta</option>
                    <option>Ajuste</option>
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
