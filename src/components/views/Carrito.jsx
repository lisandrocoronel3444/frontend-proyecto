import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { carritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { realizarPedido } from "../helpers/queries.js"; 
import Swal from "sweetalert2";

const Carrito = () => {
  const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } =
    useContext(carritoContext);

  const navigate = useNavigate();


  const calcularTotal = () => {
    return listaCompras.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };


  const handleSeguirComprando = () => {
    navigate("/productos"); 
  };

  const handleRealizarPedido = async () => {
    // Obtener el nombre del usuario desde sessionStorage
    const nombreUsuario = sessionStorage.getItem("usuario");

    if (nombreUsuario) {
      
      const nombre = JSON.parse(nombreUsuario);

      try {
        const respuesta = await realizarPedido(
          nombre,
          listaCompras,
          calcularTotal()
        );
        console.log("Pedido realizado con éxito:", respuesta);
        if (respuesta.status === 201) {
          Swal.fire(
            "Pedido realizado",
            "Tu pedido ha sido procesado correctamente",
            "success"
          );
          navigate("/admin/gestion-pedidos"); 
        } else {
          Swal.fire("Error", "Hubo un problema al realizar tu pedido", "error");
        }
      } catch (error) {
        console.log("Error al realizar el pedido:", error);
        Swal.fire("Error", "Hubo un problema al realizar el pedido", "error");
      }
    } else {
      console.log("No se encontró el usuario en la sesión");
      Swal.fire("Error", "No has iniciado sesión", "error");
      navigate("/login"); 
    }
  };

  return (
    <Container className="carrito-container">
      <h2 className="carrito-title">Mi Carrito de Compras</h2>
      <Table responsive hover className="carrito-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaCompras.map((item) => (
            <tr key={item._id}>
              <td>{item.nombreProducto}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => disminuirCantidad(item._id)}
                    disabled={item.cantidad === 1}
                  >
                    -
                  </Button>
                  <span>{item.cantidad}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => aumentarCantidad(item._id)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>${(item.precio * item.cantidad).toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => eliminarCompra(item._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end">
              <strong>Total:</strong>
            </td>
            <td colSpan="2" className="carrito-total">
              ${calcularTotal().toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </Table>

      
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          onClick={handleSeguirComprando}
          className="my-3"
        >
          Seguir Comprando
        </Button>

        <Button
          variant="primary"
          onClick={handleRealizarPedido}
          className="my-3"
          disabled={listaCompras.length === 0}
        >
          Realizar Pedido
        </Button>
      </div>
    </Container>
  );
};

export default Carrito;
