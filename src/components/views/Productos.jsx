import CardProducto from "./Producto/CardProducto";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { consultaListaProductos } from "../helpers/queries";
import { carritoContext } from "../context/CarritoContext";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    consultaListaProductos().then((respuesta) => {
      setProductos(respuesta);
    });
  }, []);

  const {
    agregarCompra,
    eliminarCompra
  } = useContext(carritoContext);
  const handleAgregar = (producto) => {
    agregarCompra(producto);
  };
  const handleQuitar = (id) => {
    eliminarCompra(id);
  };

  return (
    <Container>
      <h1 className="my-4">Explora nuestros productos</h1>
      <Row>
        {productos.map((producto) => (
          <CardProducto
            key={producto._id}
            producto={producto}
            handleAgregar={() => handleAgregar(producto)}
            handleQuitar={() => handleQuitar(producto._id)}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
