import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import Yo from "../../assets/images/miFoto.jpeg";

const Nosotros = () => {
  return (
    <section className="acerca-de py-5 bg-light">
      <Container>
        <h2
          className="text-center mb-5 display-4 font-weight-bold"
          variant="dark"
        >
          <span className="pb-2">Acerca de Mí</span>
        </h2>
        <Row className="align-items-center justify-content-center">
          <Col
            xs={12}
            md={5}
            className="d-flex justify-content-center mb-4 mb-md-0"
          >
            <Image
              src={Yo}
              fluid
              roundedCircle
              className="shadow-lg imagen-yo"
            />
          </Col>

          <Col xs={12} md={7}>
            <p className="lead text-muted">
              ¡Hola! Mi nombre es{" "}
              <span className="fw-bold" variant="dark">
                Lisandro
              </span>
              , soy estudiante de programación en la{" "}
              <span className="fw-bold">
                Universidad Nacional de Tucumán (UNT)
              </span>
              , donde estoy aprendiendo todo sobre el desarrollo de software.
              Tengo <span className="fw-bold">20 años</span> y me apasiona el
              mundo de la tecnología y la programación.
            </p>
            <p className="lead text-muted">
              En mis tiempos libres, disfruto{" "}
              <span className=" fw-bold" variant="dark">
                jugar al fútbol
              </span>
              , una de mis grandes pasiones. También soy un gran aficionado a
              los videojuegos, los cuales me permiten explorar mundos virtuales
              y mejorar mis habilidades en estrategias. La combinación de mi
              amor por los deportes y la tecnología me ha llevado a querer
              desarrollar proyectos que unan ambos mundos.
            </p>
            <p className="lead text-muted">
              Estoy emocionado por seguir aprendiendo y creciendo como
              programador. Me encanta crear nuevas aplicaciones y juegos, y en
              el futuro espero poder aportar{" "}
              <span className=" fw-bold" variant="dark">
                soluciones innovadoras
              </span>{" "}
              al mundo de la tecnología.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Nosotros;
