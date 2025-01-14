import React, { useReducer } from "react";
import { carritoContext } from "./CarritoContext";

const initialState = [];

// Reducer de compras
const ComprasReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "[CARRITO] Agregar Compra":
      // Si el producto ya está en el carrito, solo actualiza su cantidad
      const existeProducto = state.find(item => item._id === action.payload._id);
      if (existeProducto) {
        return state.map(item => 
          item._id === action.payload._id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, cantidad: 1 }];
      }

    case "[CARRITO] Aumentar Cantidad Compra":
      return state.map(item => {
        if (item._id === action.payload) {
          return { ...item, cantidad: item.cantidad + 1 }; // Solo aumenta la cantidad
        }
        return item;
      });

    case "[CARRITO] Disminuir Cantidad Compra":
      return state.map(item => {
        if (item._id === action.payload && item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 }; // No permite disminuir de 1
        }
        return item;
      });

    case "[CARRITO] Eliminar Compra":
      return state.filter((compra) => compra._id !== action.payload);

    default:
      return state;
  }
};

const CarritoProvider = ({ children }) => {
  const [listaCompras, dispatch] = useReducer(ComprasReducer, initialState);

  const agregarCompra = (compra) => {
    const action = { 
      type: "[CARRITO] Agregar Compra", payload: compra 
    };
    dispatch(action);
  };

  const aumentarCantidad = (id) => {
    const action = { 
      type: "[CARRITO] Aumentar Cantidad Compra", 
      payload: id 
    };
    dispatch(action);
  };

  const disminuirCantidad = (id) => {
    const action = { 
      type: "[CARRITO] Disminuir Cantidad Compra", 
      payload: id 
    };
    dispatch(action);
  };

  const eliminarCompra = (id) => {
    const action = { type: "[CARRITO] Eliminar Compra", payload: id };
    dispatch(action);
  };

  return (
    <carritoContext.Provider
      value={{
        listaCompras,
        agregarCompra,
        aumentarCantidad,
        disminuirCantidad,
        eliminarCompra,
      }}
    >
      {children}
    </carritoContext.Provider>
  );
};

export default CarritoProvider;
