import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la recarga de la página
    navigate('/404'); // Redirige a la página de error 404
  };

  return (
    <section className="contacto my-4">
      <Container>
        <h2 className="text-center mb-4 contacto-title">Contacto</h2>
        <Row>
          <Col xs={12} md={6} className="mb-4 mx-auto">
            <h4>Envíanos un mensaje</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Tu correo electrónico" />
              </Form.Group>

              <Form.Group controlId="formMensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje" />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contacto;
