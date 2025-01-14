import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Menu from "./components/common/Menu/Menu";
import Footer from "./components/common/Footer/Footer";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import Registro from "./components/views/Registro";
import Error404 from "./components/views/Error404";
import DetalleProducto from "./components/views/Producto/DetalleProducto/DetalleProducto";
import RutasAdministrador from "./components/routes/RutasAdministrador";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import { useState } from "react";
import Productos from "./components/views/Productos";
import Carrito from "./components/views/Carrito"; 
import CarritoProvider from "./components/context/CarritoProvider";
import Nosotros from "./components/views/Nosotros";
import Contacto from "./components/views/Contacto";

function App() {
  const usuario = JSON.parse(sessionStorage.getItem('usuario')) || {}; 
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);
  const [carrito, setCarrito] = useState([]);

  return (
    <BrowserRouter>
    <CarritoProvider>

      <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Menu>
      <Routes>
        <Route exact path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
        <Route exact path="/productos" element={<Productos />}></Route>
        <Route exact path="/nosotros" element={<Nosotros/>}></Route>
        <Route exact path="/contacto" element={<Contacto/>}></Route>
        <Route exact path="/registro" element={<Registro />}></Route>
        <Route exact path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />}></Route>
        <Route exact path="/detalle/:id" element={<DetalleProducto />}></Route>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin/*" element={
          <RutasProtegidas>
            <RutasAdministrador />
          </RutasProtegidas>
        }></Route>
        <Route exact path="/*" element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </CarritoProvider>
    </BrowserRouter>
  );
}


export default App;
