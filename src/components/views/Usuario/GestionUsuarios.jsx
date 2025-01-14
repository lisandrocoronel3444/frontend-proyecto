import React, { useEffect, useState } from "react";
import { Table, Nav, NavItem, NavLink} from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerUsuarios } from "../../helpers/queries"; 
import { Person } from 'react-bootstrap-icons'; 

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    
    const cargarUsuarios = async () => {
      try {
        const datosUsuarios = await obtenerUsuarios();
        setUsuarios(datosUsuarios); 
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <section className="container admin-section">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 text-center text-dark font-weight-bold">Panel de Administración - Gestionar Usuarios</h1>
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
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default GestionUsuarios;
