import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Nav,
  NavItem,
  NavLink,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  obtenerUsuarios,
  eliminarUsuario,
  editarUsuario,
} from "../../helpers/queries";
import { Person, ExclamationTriangle } from "react-bootstrap-icons";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioEliminando, setUsuarioEliminando] = useState(null);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    email: "",
    rol: "",
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const datosUsuarios = await obtenerUsuarios();
      setUsuarios(datosUsuarios);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  const handleEliminarClick = (usuario) => {
    setUsuarioEliminando(usuario);
    setShowDeleteModal(true);
  };

  const confirmarEliminar = async () => {
    try {
      await eliminarUsuario(usuarioEliminando._id);
      setUsuarios(usuarios.filter((usuario) => usuario._id !== usuarioEliminando._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      rol: usuario.rol || 'operador'
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await editarUsuario(usuarioEditando._id, formData);
      if (respuesta && respuesta.ok) {
        setShowEditModal(false);
        // Actualizar la lista de usuarios
        cargarUsuarios();
      } else {
        console.error("Error al editar usuario");
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  return (
    <section className="container admin-section">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 text-center text-dark font-weight-bold">
          Panel de Administración - Gestionar Usuarios
        </h1>
      </div>

      <Nav className="mt-4 nav-pills-custom">
        <NavItem>
          <NavLink as={Link} to="/admin" end>
            <Person className="nav-icon" /> Gestionar Productos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/admin/gestion-pedidos">
            <Person className="nav-icon" /> Gestionar Pedidos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/admin/gestion-usuarios" className="active">
            <Person className="nav-icon" /> Gestionar Usuarios
          </NavLink>
        </NavItem>
      </Nav>

      <div className="d-flex justify-content-between align-items-center mt-5">
        <h2 className="text-muted">Usuarios registrados</h2>
      </div>
      <hr />

      <Table responsive striped bordered hover className="mt-4 table-custom">
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol || 'operador'}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditar(usuario)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleEliminarClick(usuario)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                required
              >
                <option value="operador">Operador</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para eliminar usuario */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <ExclamationTriangle className="me-2" />
            Confirmar Eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioEliminando && (
            <>
              <p className="mb-1">¿Estás seguro de eliminar al siguiente usuario?</p>
              <div className="p-3 bg-light rounded mb-3 mt-2">
                <p className="mb-1"><strong>Usuario:</strong> {usuarioEliminando.nombreUsuario}</p>
                <p className="mb-1"><strong>Email:</strong> {usuarioEliminando.email}</p>
                <p className="mb-0"><strong>Rol:</strong> {usuarioEliminando.rol || 'operador'}</p>
              </div>
              <p className="text-danger mb-0">
                <small>
                  <strong>Atención:</strong> Esta acción no se puede deshacer.
                </small>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={confirmarEliminar}
          >
            Eliminar Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default GestionUsuarios;