import { useState } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
export default function Inventario() {
  const [almacen, setAlmacen] = useState(1);

  const [index, setIndex] = useState(0);

  const handleClose = () => setIndex(0);

  const productos = [
    {
      clave: 1,
      producto: "Chai",
      categoria: "Bebidas",
      reorden: 20,
      almacenes: [39, 0, 15, 0],
    },
    {
      clave: 2,
      producto: "Chang",
      categoria: "Bebidas",
      reorden: 10,
      almacenes: [17, 25, 0, 0],
    },
    {
      clave: 24,
      producto: "Guarana fantastica",
      categoria: "Bebidas",
      reorden: 10,
      almacenes: [0, 0, 20, 25],
    },
    {
      clave: 16,
      producto: "Pavlova",
      categoria: "Confections",
      reorden: 30,
      almacenes: [0, 29, 0, 25],
    },
    {
      clave: 19,
      producto: "Teatime Chocolate Biscuits",
      categoria: "Confections",
      reorden: 15,
      almacenes: [40, 0, 0, 25],
    },
    {
      clave: 59,
      producto: "Raclette Courdavault",
      categoria: "Dairy Products",
      reorden: 50,
      almacenes: [0, 47, 79, 20],
    },
    {
      clave: 42,
      producto: "Gnocchi di nonna Alice",
      categoria: "Grains/Cereals",
      reorden: 30,
      almacenes: [14, 0, 0, 12],
    },
    {
      clave: 56,
      producto: "Singaporean Hokkien Fried Mee",
      categoria: "Grains/Cereals",
      reorden: 20,
      almacenes: [0, 21, 0, 0],
    },
    {
      clave: 9,
      producto: "Mishi Kobe Niku",
      categoria: "Meat/Poultry",
      reorden: 20,
      almacenes: [0, 21, 0, 0],
    },
    {
      clave: 17,
      producto: "	Alice Mutton",
      categoria: "Meat/Poultry",
      reorden: 20,
      almacenes: [0, 10, 0, 0],
    },
    {
      clave: 14,
      producto: "	Tofu",
      categoria: "Produce",
      reorden: 10,
      almacenes: [0, 0, 35, 0],
    },
    {
      clave: 10,
      producto: "	Ikura",
      categoria: "Seafood",
      reorden: 10,
      almacenes: [0, 0, 15, 20],
    },
    {
      clave: 18,
      producto: "Carnarvon Tigers",
      categoria: "Seafood",
      reorden: 15,
      almacenes: [0, 12, 24, 6],
    },
  ];

  const productoModal = productos.filter((x) => x.clave == index)[0];

  return (
    <>
      <div className="d-flex justify-content-center col-12">
        <Dropdown className="">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {almacen != 0 ? `Almacen ${almacen}` : "Todos"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
              <div onClick={() => setAlmacen(1)}>Almacen 1</div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={() => setAlmacen(2)}>Almacen 2</div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={() => setAlmacen(3)}>Almacen 3</div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={() => setAlmacen(4)}>Almacen 4</div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={() => setAlmacen(0)}>Todos</div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Container>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th className="d-none d-md-table-cell" scope="col">
                  Clave
                </th>
                <th scope="col">Producto</th>
                <th className="d-none d-sm-table-cell" scope="col">
                  Categoria
                </th>
                <th scope="col">Existencia</th>
                <th className="d-none d-sm-table-cell" scope="col">
                  Nivel de reorden
                </th>
                <th scope="col">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {productos
                .filter((x) =>
                  almacen != 0 ? x.almacenes[almacen - 1] > 0 : true
                )
                .map((x, i) => (
                  <tr
                    key={x.clave}
                    className={
                      almacen != 0 && x.almacenes[almacen - 1] < x.reorden
                        ? "table-danger"
                        : ""
                    }
                  >
                    <td className="d-none d-md-table-cell">{x.clave}</td>
                    <td>{x.producto}</td>
                    <td className="d-none d-sm-table-cell">{x.categoria}</td>
                    <td>
                      {almacen != 0
                        ? x.almacenes[almacen - 1]
                        : x.almacenes.reduce((prev, x) => prev + x, 0)}
                    </td>
                    <td className="d-none d-md-table-cell">{x.reorden}</td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        variant="primary"
                        onClick={() => setIndex(x.clave)}
                      >
                        Ver detalles
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal show={index !== 0} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {index > 0
              ? productoModal.almacenes.map((x, i) => (
                  <p key={i}>
                    En almacen {i + 1}: {x}
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
      </Container>
    </>
  );
}
