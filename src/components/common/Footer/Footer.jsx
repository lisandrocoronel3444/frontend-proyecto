import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
     
        <Row>
          <Col className="text-center mb-3">
            <h5 className="footer-phrase">
              "El arte de la cocina, llevado a tu mesa."
            </h5>
          </Col>
        </Row>

     
        <Row>
          <Col className="text-center mb-3">
            <div className="social-icons">
              <a
                href="/face"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Facebook size={24} />
              </a>
              <a
                href="/twite"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Twitter size={24} />
              </a>
              <a
                href="/insta"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Instagram size={24} />
              </a>
            </div>
          </Col>
        </Row>

       
        <Row>
          <Col className="text-center mb-3">
            <p>
              Dirección: Tucuman - Av. General Paz 576
            </p>
            <p>
              Teléfono: (381) 456-7890
            </p>
            <p>
              Correo: pedrorestaurante@contacto.com
            </p>
          </Col>
        </Row>

      
        <Row>
          <Col className="text-center">
            <p className="footer-rights">
              © {new Date().getFullYear()} Restaurante Gourmet. Todos los
              derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
