import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children }) => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null;

  console.log('usuarioLogueado:', usuarioLogueado);  // Verifica el valor aquí

  // Si el usuario no está logueado, redirige al login
  if (!usuarioLogueado) {
    console.log('Usuario no logueado, redirigiendo al login');
    return <Navigate to="/login" />;
  }

  // Si el usuario no tiene rol de admin, redirige a la página principal
  if (usuarioLogueado.rol !== "admin") {
    console.log('Usuario no es admin, redirigiendo a la página principal');
    return <Navigate to="/" />;
  }

  // Si es un usuario logueado y es admin, muestra las rutas protegidas
  return children;
};

export default RutasProtegidas;
