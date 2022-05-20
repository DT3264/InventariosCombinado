import { Carousel, Container, Row, Col, Image } from "react-bootstrap";

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/slider1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/slider3.png"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

function Extra1() {
  return (
    <>
      <Container className="container col-xxl-8 px-4 py-5">
        <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
          <Col className="col-10 col-sm-8 col-lg-6">
            <img
              src="/img/img1.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width={700}
              height={500}
              loading="lazy"
            />
          </Col>
          <Col className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">
              Simplifique su gestión de inventarios
            </h1>
            <p className="lead">
              Sofware de gestión de inventario y pedidos adaptados a la forma de
              venta. Brinde a sus gerentes de operaciones, finanzas, almacén y
              comercio electrónico las herramientas que necesitan para trabajar
              juntos de manera más eficiente y sin problemas.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function Extra2() {
  return (
    <>
      <div className="container">
        <hr className="featurette-divider" />
        <div className="row featurette align-items-center">
          <div className="col-md-7">
            <h3>
              <span className="text-muted">Gestión de órdenes de trabajo</span>
            </h3>
            <h2 className="featurette-heading">
              Gestione las órdenes de trabajo en un solo lugar{" "}
            </h2>
            <p className="lead">
              Kit de herramientas todo en uno para departamentos de
              mantenimiento. Todo lo que necesita desde programación y
              finalización de órdenes de trabajo.
            </p>
          </div>
          <div className="col-md-5">
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              width={500}
              height={500}
              src="/img/img1.png"
              alt="..."
            />
          </div>
        </div>
        <div className="b-example-divider" />
        <hr className="featurette-divider " />
        <div className="row featurette align-items-center">
          <div className="col-md-7 order-md-2">
            <h3>
              <span className="text-muted">Aplicaciónes de terceros</span>
            </h3>
            <h2 className="featurette-heading">
              Ahorre tiempo con una integración perfecta
            </h2>
            <p className="lead">
              El sisestá diseñado para integrarse abiertamente con cualquier
              sistema a través de servicios web
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              width={500}
              height={500}
              src="/img/img1.png"
              alt="..."
            />
          </div>
        </div>
        <div className="px-4 pt-5 my-5 text-center border-bottom">
          <h1 className="display-4 fw-bold">Gestión simplificada</h1>
          <div className="col-lg-6 mx-auto">
            <div className="d-flex text-muted pt-3">
              <svg
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={32}
                height={32}
                role="img"
                aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff" />
                <text x="50%" y="50%" fill="#007bff" dy=".3em">
                  32x32
                </text>
              </svg>
              <div className="pb-3 mb-0 small lh-sm w-100">
                <div className="d-flex justify-content-between">
                  <strong className="lead">
                    Gestión completa del catálogo de productos
                  </strong>
                </div>
              </div>
            </div>
            <div className="d-flex text-muted pt-3">
              <svg
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={32}
                height={32}
                role="img"
                aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff" />
                <text x="50%" y="50%" fill="#007bff" dy=".3em">
                  32x32
                </text>
              </svg>
              <div className="pb-3 mb-0 small lh-sm w-100">
                <div className="d-flex justify-content-between">
                  <strong className="lead">
                    Cree y administre productos simples, variantes y
                    empaquetados
                  </strong>
                </div>
              </div>
            </div>
            <div className="d-flex text-muted pt-3">
              <svg
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={32}
                height={32}
                role="img"
                aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff" />
                <text x="50%" y="50%" fill="#007bff" dy=".3em">
                  32x32
                </text>
              </svg>
              <div className="pb-3 mb-0 small lh-sm w-100">
                <div className="d-flex justify-content-between">
                  <strong className="lead">
                    Recoger, empacar y enviar artículos desde un almacén
                  </strong>
                </div>
              </div>
            </div>
            <div className="d-flex text-muted pt-3">
              <svg
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={32}
                height={32}
                role="img"
                aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff" />
                <text x="50%" y="50%" fill="#007bff" dy=".3em">
                  32x32
                </text>
              </svg>
              <div className="pb-3 mb-0 small lh-sm w-100">
                <div className="d-flex justify-content-between">
                  <strong className="lead">
                    Informe de inventario pendiente y valoración{" "}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <Image fluid src="/img/img2.jpg" alt="..." />
        </div>
      </div>
    </>
  );
}

function Extra3() {
  return (
    <>
      <div className="b-example-divider" />
      <div className="container">
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Precios</h1>
          <p className="fs-5 text-muted">
            Obtenga un vistazo de los planes que ofrecemos{" "}
            <a href="precios.html">aquí</a>
          </p>
        </div>
      </div>
    </>
  );
}

function Extra4() {
  return (
    <>
      <div className="b-example-divider" />
      <div className="container">
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Sobre nosotros</h1>
          <p className="fs-5 text-muted">
            Northwind es una empresa ubicada en Uriangato, Guanajuato
            comprometidos con crear sistemas de calidad y que provee software
            como servicio enfocado a la gestión de inventarios de las empresas
            con módulos diseñados para facilitar las tareas que suelen
            presentarse con la gestión de inventario.
          </p>
        </div>
      </div>
    </>
  );
}

export default function Index() {
  return (
    <>
      <Slider />
      <Extra1 />
      <Extra2 />
      <Extra3 />
      <Extra4 />
    </>
  );
}
