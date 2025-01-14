# Restaurante Don Pedro - Ecommerce

[Pagina web](https://velvety-cranachan-d9d9a1.netlify.app/)

## Descripción del Proyecto
Don Pedro es un ecommerce diseñado para revolucionar la forma en que los clientes interactúan con los restaurantes. Este sistema permite a los usuarios explorar el menú, realizar pedidos y gestionar sus compras de manera eficiente y segura, todo desde la comodidad de su hogar o dispositivo móvil.

El proyecto está desarrollado utilizando el stack MERN (MongoDB, Express, React, Node.js) y aplica principios modernos de desarrollo web, incluyendo autenticación basada en JWT, validaciones robustas y un diseño responsive.

## Características Principales
- **Exploración de Productos:** Los usuarios pueden navegar por una lista de productos disponibles con descripciones detalladas.
- **Carrito de Compras:** Integración de un carrito que permite agregar, editar y eliminar productos antes de realizar un pedido.
- **Autenticación y Autorización:** Uso de JWT para proteger rutas sensibles y garantizar que solo los usuarios autenticados puedan realizar ciertas acciones.
- **Gestión de Pedidos:** Los administradores pueden ver y gestionar los pedidos realizados.
- **Validación de Datos:** Implementación de validaciones tanto en el frontend como en el backend para garantizar la integridad de los datos.
- **Diseño Responsive:** Utilizando React-Bootstrap y estilos personalizados para una experiencia óptima en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas
### Frontend
- **React.js**
  - React-Bootstrap para componentes de UI
  - Context API para la gestión de estado
- **JavaScript (ES6+)**

### Backend
- **Node.js** con Express
  - Mongoose para la interacción con MongoDB
  - JWT para la autenticación
  - Express-Validator para la validación de datos

### Base de Datos
- **MongoDB:** Base de datos NoSQL para almacenar información de usuarios, productos y pedidos.

## Instalación y Configuración
### Repositorios
- [Frontend](https://github.com/lisandrocoronel3444/frontend-proyecto.git)
- [Backend](https://github.com/lisandrocoronel3444/backend-proyecto)
- 

### Frontend
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/lisandrocoronel3444/frontend-proyecto.git
   ```

2. Navegar a la carpeta del proyecto:
   ```bash
   cd frontend-proyecto
   npm install
   ```
3. Iniciar la aplicación frontend:
   ```bash
   npm run dev
   ```

### Backend 
1. Clonar el repositorio del backend [Backend](https://github.com/lisandrocoronel3444/backend-proyecto).
 
2. Instalar las dependencias con `npm install`.

3. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Endpoints Principales
### Productos
- `GET /productos`: Obtiene la lista de productos.
- `POST /productos`: Crea un nuevo producto (requiere autenticación y permisos).
- `PUT /productos/:id`: Edita un producto existente (requiere autenticación y permisos).
- `DELETE /productos/:id`: Elimina un producto (requiere autenticación y permisos).

### Usuarios
- `POST /usuarios/login`: Inicia sesión y devuelve un token JWT.
- `POST /usuarios/nuevo`: Registra un nuevo usuario.

### Pedidos
- `GET /pedidos`: Obtiene la lista de pedidos (requiere autenticación).
- `POST /pedidos`: Crea un nuevo pedido.
- `PUT /pedidos/:id`: Cambia el estado de un pedido (requiere autenticación y permisos).
- `DELETE /pedidos/:id`: Elimina un pedido (requiere autenticación y permisos).

## Autenticación
Este proyecto utiliza **JSON Web Tokens (JWT)** para autenticar y autorizar a los usuarios. Los usuarios deben iniciar sesión para recibir un token que se envía en el encabezado `x-token` con cada solicitud protegida.


