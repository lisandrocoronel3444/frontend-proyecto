import { Table, Nav, NavItem, NavLink} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consultaListaProductos } from "../helpers/queries";
import ItemProducto from "./Producto/ItemProducto";
import { Plus, Box, Person,} from 'react-bootstrap-icons';

const Admin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    consultaListaProductos().then((respuesta) => {
      setProductos(respuesta);
    });
  }, []);

  return (
    <section className="container admin-section">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 text-center text-dark font-weight-bold">Panel de Administración - Gestionar Productos</h1>
      </div>


      <Nav className="mt-4 nav-pills-custom">
        <NavItem>
          <NavLink as={Link} to="/admin" end>
            <Box className="nav-icon" /> Gestionar Productos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/admin/gestion-pedidos" end>
            <Box className="nav-icon" /> Gestionar Pedidos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/admin/gestion-usuarios">
            <Person className="nav-icon" /> Gestionar Usuarios
          </NavLink>
        </NavItem>
      </Nav>

      
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h2 className="text-muted">Productos disponibles</h2>
        <Link className="btn btn-dark d-flex align-items-center" to="/admin/crear-producto">
          <Plus className="me-2" /> Agregar Producto
        </Link>
      </div>
      <hr />
      
   
      <Table responsive striped bordered hover className="mt-4 table-custom">
        <thead>
          <tr>
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ItemProducto
              key={producto._id}
              producto={producto}
              setProductos={setProductos}
            />
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Admin;
