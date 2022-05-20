import { Card, Form, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Soporte() {
    return (
        <Container>
            <h1 class="display-4 fw-normal text-center">Soporte</h1>
            <p>El periodo de respuesta puede ser de entre 24 a 72 horas</p>
            <Form>
        <Form.Group className="mb-3 row" controlId="formBasicEmail">
            <div className="col-lg-6 col-12 col-md-12">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Juan Pérez" />
            </div>
            <div className="col-lg-6 col-12 col-md-12">
            <Form.Label>Empresa</Form.Label>
            <Form.Control type="text" placeholder="ITSUR" />
            </div>
            <div className="col-lg-6 col-12 col-md-12">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@dominio.com" />
            </div>
            <div className="col-lg-6 col-12 col-md-12">
            <Form.Label>Modulo</Form.Label>
        <Form.Select aria-label="Default select example">
            
            <option>Seleccione un módulo</option>
            <option value="1">Inventarios</option>
            <option value="2">Reportes</option>
            <option value="3">Ventas</option>
            </Form.Select>
            </div>
            <div>
            <Form.Label>Su mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} />
            </div>
        </Form.Group>
        <div className="text-center ">
        <Button variant="primary" type="submit">
            Enviar
        </Button>
        </div>
        </Form>
        </Container>
    );
  }