import React, { useState, useEffect, useContext } from "react";
import Banner from "../UI/Banner/Banner";
import CardProducto from "./Producto/CardProducto";
import { consultaListaProductos } from "../helpers/queries";
import { Row, Container, Button } from "react-bootstrap";
import Nosotros from "./Nosotros";
import Contacto from "./Contacto";
import { carritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    consultaListaProductos().then((respuesta) => {
      setProductos(respuesta);
    });
  }, []);

  const { agregarCompra, eliminarCompra } = useContext(carritoContext);

  const handleAgregar = (producto) => {
    agregarCompra(producto);
  };

  const handleQuitar = (id) => {
    eliminarCompra(id);
  };

  return (
    <section>
      <Banner />
      <Container>
        <section className="home-title text-center my-4" id="destacados">
          <h1>Descubre la Magia de Nuestra Cocina</h1>
          <h3>nuestros platillos más deliciosos y especiales.</h3>
        </section>

        <section className="productos-destacados">
          <h4>Productos Destacados</h4>
          <Row>
            {productos.slice(0, 4).map((producto) => (
              <CardProducto
                key={producto._id}
                producto={producto}
                handleAgregar={() => handleAgregar(producto)}
                handleQuitar={() => handleQuitar(producto._id)}
              />
            ))}
          </Row>
          <div className="text-center my-4">
            <Link to="/productos" className="boton-ver-mas ">
              Ver Más Productos
            </Link>
          </div>
        </section>

        <div id="nosotros">
          <Nosotros />
        </div>
        <div id="contacto">
          <Contacto />
        </div>
      </Container>
    </section>
  );
};

export default Home;
