import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { consultaAgregarProducto } from "../../helpers/queries";

const CrearProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (productoNuevo) => {
    consultaAgregarProducto(productoNuevo).then((respuestaCreated) => {
      if (respuestaCreated && respuestaCreated.status === 201) {
        Swal.fire('Producto creado', `El producto ${productoNuevo.nombreProducto} fue creado correctamente`, 'success');
        reset();
      } else {
        Swal.fire('Ocurrió un error', `El producto ${productoNuevo.nombreProducto} no fue creado, inténtelo más tarde`, 'error');
      }
    });
  };

  return (
    <Container className="mainSection mt-5">
      <h1 className="display-4 text-center mb-4">Nuevo Producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-3">
         
          <Col md={6}>
            <Form.Group controlId="formNombreProducto">
              <Form.Label>Producto*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Café"
                {...register("nombreProducto", {
                  required: "El nombre del producto es obligatorio",
                  minLength: {
                    value: 2,
                    message: "La cantidad mínima de caracteres es de 2 dígitos",
                  },
                  maxLength: {
                    value: 100,
                    message: "La cantidad máxima de caracteres es de 100 dígitos",
                  },
                })}
                isInvalid={!!errors.nombreProducto}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreProducto?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 50"
                {...register("precio", {
                  required: "El precio del producto es obligatorio",
                  min: {
                    value: 1,
                    message: "El precio mínimo es de $1",
                  },
                  max: {
                    value: 10000,
                    message: "El precio máximo es de $10000",
                  },
                })}
                isInvalid={!!errors.precio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.precio?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

         
          <Col md={12}>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Café torrado"
                {...register("descripcion", {
                  required: "La descripción del producto es obligatoria",
                  minLength: {
                    value: 2,
                    message: "La cantidad mínima de caracteres es de 2 dígitos",
                  },
                  maxLength: {
                    value: 300,
                    message: "La cantidad máxima de caracteres es de 300 dígitos",
                  },
                })}
                isInvalid={!!errors.descripcion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group controlId="formImagen">
              <Form.Label>Imagen URL*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
                {...register("img", {
                  required: "La imagen es obligatoria",
                })}
                isInvalid={!!errors.img}
              />
              <Form.Control.Feedback type="invalid">
                {errors.img?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

     
          <Col md={12}>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoría*</Form.Label>
              <Form.Select
                {...register("categoria", {
                  required: "La categoría es obligatoria",
                })}
                isInvalid={!!errors.categoria}
              >
                <option value="">Seleccione una opción</option>
                <option value="Pastas">Pastas</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Hamburguesas">Hamburguesas</option>
                <option value="Ensaladas">Ensaladas</option>
                <option value="Bebidas">Bebidas</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.categoria?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4 my-4">
          <Button variant="primary" type="submit" size="lg">
            Guardar Producto
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CrearProducto;
