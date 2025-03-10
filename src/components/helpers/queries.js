// LLAMAR A MIS VARIABLES DE ENTORNO
const URLUsuario = import.meta.env.VITE_API_USUARIO;
const URLProducto = import.meta.env.VITE_API_PRODUCTO;
const URLPedido = import.meta.env.VITE_API_PEDIDO;

// Login
export const login = async (usuario) => {
  try {
    const response = await fetch(URLUsuario, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const datos = await response.json();
    if (response.status === 200) {
      // Guardar token y rol en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify({
        nombreUsuario: datos.nombreUsuario,
        token: datos.token,
        rol: datos.rol,  // Guardar rol en sessionStorage
      }));

      return {
        status: response.status,
        nombreUsuario: datos.nombreUsuario,
        token: datos.token,
        rol: datos.rol,  // Devolver rol
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// Crear usuario
// Crear usuario
export const crearUsuario = async (usuario) => {
  try {
    // Aquí aseguramos que el rol se envíe junto con los demás datos del usuario
    const respuesta = await fetch(`${URLUsuario}/nuevo`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...usuario,  // Esto incluirá nombreUsuario, email, password, etc.
        rol: "operador",  // Establecer el rol por defecto
      }),
    });

    // Devolver la respuesta
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};


// Consultar lista de productos
export const consultaListaProductos = async () => {
  try {
    const respuesta = await fetch(URLProducto)
    
    const listaProductos = await respuesta.json();
    return listaProductos;
  } catch (error) {
    console.log(error);
  }
};

// Consultar producto por ID
export const consultaProducto = async (id) => {
  try {
    const respuesta = await fetch(`${URLProducto}/${id}`);
    const producto = await respuesta.json();
    return producto;
  } catch (error) {
    console.log(error);
  }
};

// Borrar producto
export const consultaBorrarProducto = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(`${URLProducto}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

// Agregar producto
export const consultaAgregarProducto = async (producto) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(URLProducto, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

// Editar producto
export const consultaEditarProducto = async (producto, id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(`${URLProducto}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

// Realizar pedido
export const realizarPedido = async (nombreUsuario, productos, total) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const pedidoData = { nombreUsuario, productos, total };

    const respuesta = await fetch(URLPedido, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(pedidoData),
    });

    const data = await respuesta.json();
    return { status: respuesta.status, ...data };  
  } catch (error) {
    console.log(error);
  }
};


// Consultar lista de pedidos
export const consultaListaPedidos = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(URLPedido, {
      headers: {
        "x-token": token,
      },
    });
    const listaPedidos = await respuesta.json();
    return listaPedidos;
  } catch (error) {
    console.log(error);
  }
};

// Cambiar estado del pedido
export const cambiarEstadoPedido = async (pedidoId, nuevoEstado) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(`${URLPedido}/${pedidoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

// Eliminar pedido
export const eliminarPedido = async (pedidoId) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(`${URLPedido}/${pedidoId}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

// Obtener usuarios
export const obtenerUsuarios = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario'))?.token;
    

    if (!token) {
      throw new Error("Token no disponible");
    }

    const respuesta = await fetch(URLUsuario, {
      method: "GET",
      headers: {
        "x-token": token,
      },
    });

    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const listaUsuarios = await respuesta.json();
    return listaUsuarios;
  } catch (error) {
    console.log("Error:", error);
  }
};
// Eliminar usuario
export const eliminarUsuario = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(`${URLUsuario}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
      },
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(`Error al eliminar usuario: ${errorData.mensaje || respuesta.statusText}`);
    }

    return respuesta;
  } catch (error) {
    console.error("Error en eliminarUsuario:", error);
    throw error;  // Re-lanzar el error para que lo maneje el frontend
  }
};

// Editar usuario
export const editarUsuario = async (id, usuario) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(`${URLUsuario}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      throw new Error("Error al editar usuario");
    }

    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

