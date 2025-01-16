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
    return {
      status: response.status,
      nombreUsuario: datos.nombreUsuario,
    };
  } catch (error) {
    console.log(error);
  }
};

// Crear usuario
export const crearUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(`${URLUsuario}/nuevo`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario),
    });
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
    return respuesta.json();
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
    const token = JSON.parse(sessionStorage.getItem('usuario')).token;
    const respuesta = await fetch(URLUsuario, {
      headers: {
        "x-token": token,
      },
    });
    const listaUsuarios = await respuesta.json();
    return listaUsuarios;
  } catch (error) {
    console.log(error);
  }
};
