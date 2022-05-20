import { Accordion, Container } from "react-bootstrap";
export default function Faq() {
  return (
    <Container>
      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">Preguntas frecuentes</h1>
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            ¿El plan gratis tiene periodo de prueba?
          </Accordion.Header>
          <Accordion.Body>
            No, el plan gratis puede usarse tanto como se necesite siempre y
            cuando no exceda de las capacidades prestadas, de ser excedidas, se
            detendrá el servicio hasta que el cliente cambie al plan que
            satisfaga sus necesidades o reduzca los recursos que usa en la
            plataforma.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            ¿Cuál es el periodo de respuesta para el soporte?
          </Accordion.Header>
          <Accordion.Body>
            Para los usuarios del plan gratis el periodo suele ser de 24 a 72
            horas Para los usuarios del plan estandar el periodo es de 24 a 48
            horas Para los usuarios del plan profesional el periodo es de 0 a 24
            horas
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>¿Cómo puedo acceder al sistema?</Accordion.Header>
          <Accordion.Body>
            Puede acceder desde la página web o desde la aplicación móvil
            disponible en la playstore y la appstore.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
