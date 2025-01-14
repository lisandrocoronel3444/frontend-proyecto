import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import logo from "../../../assets/images/logoSinFondo.png";
import { Cart } from "react-bootstrap-icons";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();

  const logout = () => {
    setUsuarioLogueado({});
    sessionStorage.removeItem("usuario");
    navegacion("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <img src={logo} alt="Logo del restaurante" className="logo" />
          <p className="nav-parrafo">Don Pedro</p>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <NavLink end as={NavLink} to="/" className="nav-item nav-link">
              Inicio
            </NavLink>

            <NavLink
              className="nav-item nav-link btn-link"
              as={NavLink}
              to="productos"
            >
              Productos
            </NavLink>

            <NavLink as={Link} to="/nosotros" className="nav-item nav-link">
              Nosotros
            </NavLink>
            <NavLink as={Link} to="/contacto" className="nav-item nav-link">
              Contacto
            </NavLink>
          </Nav>
          <Nav>
            <NavLink
              as={NavLink}
              to="/carrito"
              className="nav-item nav-link cart"
            >
              <Cart size={22} />
            </NavLink>
            {usuarioLogueado.nombreUsuario ? (
              <>
                <NavLink end className="nav-item nav-link" to="/admin">
                  Administrador
                </NavLink>
                <Button variant="dark" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink as={NavLink} to="/login" className="nav-item nav-link">
                Iniciar Sesión
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
