import React, { useState } from "react";
import { Card, Col, Button, Modal } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";

const CardProducto = ({ producto, handleAgregar, handleQuitar }) => {
  const [agregado, setAgregado] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const clickAgregar = () => {
    handleAgregar();
    setAgregado(true);
  };

  const clickQuitar = () => {
    handleQuitar();
    setAgregado(false);
  };

  const handleMostrarDetalle = () => {
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
  };

  return (
    <Col xs={12} sm={6} md={3} lg={3} className="mb-4">
      <Card
        className="producto-contenedor h-100 shadow-lg rounded"
        onClick={handleMostrarDetalle}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          src={producto.img}
          alt={producto.nombreProducto}
          className="producto-img"
        />
        <Card.Body className="d-flex flex-column">
          <div className="producto-categoria mb-2">{producto.categoria}</div>
          <Card.Title className="producto-titulo">{producto.nombreProducto}</Card.Title>
          <Card.Text className="producto-descripcion flex-grow-1">{producto.descripcion}</Card.Text>
          <Card.Text className="producto-precio">
            <p className="precio">Precio: ${producto.precio}</p>
          </Card.Text>

          {agregado ? (
            <Button
              variant="primary"
              className="add-to-cart d-flex justify-content-between align-items-center boton-quitar"
              onClick={(e) => {
                e.stopPropagation();
                clickQuitar();
              }}
            >
              Quitar del carrito
              <Cart className="producto-carrito-icono" />
            </Button>
          ) : (
            <Button
              variant="primary"
              className="add-to-cart d-flex justify-content-between align-items-center boton-agregar"
              onClick={(e) => {
                e.stopPropagation();
                clickAgregar();
              }}
            >
              Añadir al carrito
              <Cart className="producto-carrito-icono" />
            </Button>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombreProducto}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio?.toFixed(2)}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAgregar(producto);
              handleCerrarModal();
            }}
          >
            Agregar al Carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default CardProducto;
