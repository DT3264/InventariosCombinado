import { Card, CardGroup, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Precios() {
    return (
        <Container>
            <h1 class="display-4 fw-normal text-center">Precios sencillos</h1>
            <h3 className="text-muted text-center p-4">Echa un vistazo a nuestras opciones de precios</h3>
        <CardGroup>
            <Card className="m-2 text-center">
            <Card.Header className="p-3">Gratis</Card.Header>
            <Card.Body>
                <Card.Title>$0</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">MXN</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">/mes</Card.Subtitle>
                <Card.Text>
                50 pedidos/mes <br />
                    50 etiquetas de envío/mes<br />
                    50 seguimientos posterior al envío<br />
                    1 almacén
                
                </Card.Text>
                <Button variant="outline-primary">Pruébalo ahora</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
            Este es el paquete más básico pero también es el más barato. Ideal para uso ordinario.    
            </Card.Footer>
            </Card>
            <Card border="primary" className="m-2 text-center border ">
            <Card.Header className="p-3  bg-primary text-white ">Estándar</Card.Header>
            <Card.Body>
                <Card.Title>$700</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">MXN</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">/mes</Card.Subtitle>
                <Card.Text>
                
                1500 pedidos/mes <br />
                1500 etiquetas de envío/mes <br />
                1500 seguimientos posterior al envío/mes <br />
                2 almacenes

                
                </Card.Text>
                <Button variant="primary">Pruébalo ahora</Button>
            </Card.Body>
            <Card.Footer border="primary" className="text-muted">
            La mejor opción. Esto es muy adecuado para todo en general todo. 
            </Card.Footer>
            </Card>
            <Card className="m-2 text-center border">
            <Card.Header className="p-3">Profesional</Card.Header>
            <Card.Body>
                <Card.Title>$1600</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">MXN</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">/mes</Card.Subtitle>
                <Card.Text>
                
                7500 pedidos/mes  <br />
                7500 etiquetas de envío/mes  <br />
                7500 seguimientos posterior al envío/mes  <br />
                7 almacenes  <br />
                Seguimiento de número de serie  <br />
                Seguimiento de lotes  
                
                </Card.Text>
                <Button variant="outline-primary">Pruébalo ahora</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
            Impresionante servicio pesado que manejará casi cualquier cosa que pueda arrojarle
            </Card.Footer>
            </Card>
        </CardGroup>
        </Container>
    );
  }