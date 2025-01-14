import { Table, Nav, NavItem, NavLink, Button, Badge, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consultaListaPedidos, cambiarEstadoPedido, eliminarPedido } from "../../helpers/queries";
import { Pencil, Trash, Box, Person } from 'react-bootstrap-icons';

const GestionPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  useEffect(() => {
  
    consultaListaPedidos().then((respuesta) => {
      setPedidos(respuesta);
    });
  }, []);

  const handleCambiarEstado = () => {
    cambiarEstadoPedido(pedidoSeleccionado._id, nuevoEstado)
      .then(() => {
        setPedidos(pedidos.map((pedido) =>
          pedido._id === pedidoSeleccionado._id ? { ...pedido, estado: nuevoEstado } : pedido
        ));
        setShowModalEditar(false);
      })
      .catch((error) => {
        console.error("Error al cambiar estado:", error);
      });
  };

  const handleEliminarPedido = () => {
    eliminarPedido(pedidoSeleccionado._id)
      .then(() => {
        setPedidos(pedidos.filter(pedido => pedido._id !== pedidoSeleccionado._id));
        setShowModalEliminar(false);
      })
      .catch((error) => {
        console.error("Error al eliminar pedido:", error);
      });
  };

  return (
    <section className="container admin-section">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 text-center text-dark font-weight-bold">Panel de Administración - Gestionar Pedidos</h1>
      </div>

     
      <Nav className="mt-4 nav-pills-custom">
        <NavItem>
          <NavLink as={Link} to="/admin" end>
            <Box className="nav-icon" /> Gestionar Productos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/admin/gestion-pedidos" className="active">
            <Box className="nav-icon " /> Gestionar Pedidos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/admin/gestion-usuarios">
            <Person className="nav-icon" /> Gestionar Usuarios
          </NavLink>
        </NavItem>
      </Nav>

      
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h2 className="text-muted">Pedidos realizados</h2>
      </div>
      <hr />

      {/* Tabla de pedidos */}
      <Table responsive striped bordered hover className="mt-4 table-custom">
        <thead>
          <tr>
            <th>Pedido ID</th>
            <th>Usuario</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id}>
              <td>{pedido._id}</td>
              <td>{pedido.nombreUsuario}</td>
              <td>{pedido.productos.map((item) => `${item.nombreProducto} (${item.cantidad})`).join(", ")}</td>
              <td>${pedido.total.toFixed(2)}</td>
              <td>
                <Badge pill bg={pedido.estado === 'Pendiente' ? 'warning' : 'info'}>
                  {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                </Badge>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    onClick={() => {
                      setPedidoSeleccionado(pedido);
                      setNuevoEstado(pedido.estado);
                      setShowModalEditar(true);
                    }}
                    className="d-flex align-items-center"
                  >
                    <Pencil className="me-1" /> Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setPedidoSeleccionado(pedido);
                      setShowModalEliminar(true);
                    }}
                    className="d-flex align-items-center"
                  >
                    <Trash className="me-1" /> Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estado del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="estadoPedido">
              <Form.Label>Nuevo Estado</Form.Label>
              <Form.Control
                as="select"
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Enviado">Enviado</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCambiarEstado}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Eliminar */}
      <Modal show={showModalEliminar} onHide={() => setShowModalEliminar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar este pedido?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEliminar(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminarPedido}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default GestionPedidos;
