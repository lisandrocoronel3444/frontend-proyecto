import React from "react";
import { Routes, Route } from "react-router-dom";
import CrearProducto from "../views/Producto/CrearProducto";
import EditarProducto from "../views/producto/EditarProducto";
import Admin from "../views/Admin";
import GestionPedidos from "../views/Pedido/GestionPedidos";
import GestionUsuarios from "../views/Usuario/GestionUsuarios";


const RutasAdministrador = () => {
  return (
    <>
      <Routes>
        
        <Route exact path="/" element={<Admin></Admin>}></Route>
        <Route
          exact
          path="/crear-producto"
          element={<CrearProducto></CrearProducto>}
        ></Route>
        <Route exact path="/editar-producto/:id" element={<EditarProducto />} />
        <Route exact path="/gestion-pedidos" element={<GestionPedidos />} />
        <Route exact path="/gestion-usuarios" element={<GestionUsuarios />} />
      </Routes>
    </>
  );
};

export default RutasAdministrador;
