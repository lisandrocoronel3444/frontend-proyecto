import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleVolverInicio = () => {
    navigate("/");
  };

  return (
    <Container className="error404-container text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="text-danger">Página no encontrada</h2>
          <p className="mt-4">
            Lo sentimos, la página que estás buscando no existe. Es posible que
            la URL sea incorrecta o que la página haya sido movida o eliminada.
          </p>
          <Button variant="primary" onClick={handleVolverInicio} className="my-5">
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
