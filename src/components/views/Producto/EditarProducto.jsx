import { useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { consultaEditarProducto, consultaProducto } from "../../helpers/queries";
import Swal from "sweetalert2";

const EditarProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    consultaProducto(id).then((respuesta) => {
      if (respuesta) {
        setValue("nombreProducto", respuesta.nombreProducto);
        setValue("precio", respuesta.precio);
        setValue("img", respuesta.img);
        setValue("categoria", respuesta.categoria);
        setValue("descripcion", respuesta.descripcion);
      } else {
        Swal.fire(
          "Ocurrio un error",
          "No se puede editar el producto, intentelo más tarde",
          "error"
        );
      }
    });
  }, [id]);

  const onSubmit = (productoEditado) => {
    consultaEditarProducto(productoEditado, id).then((respuesta) => {
      if (respuesta && respuesta.status === 200) {
        Swal.fire(
          "Producto editado",
          `El producto ${productoEditado.nombreProducto} fue editado correctamente`,
          "success"
        );
        navegacion("/admin");
      } else {
        Swal.fire(
          "Ocurrio un error",
          `El producto ${productoEditado.nombreProducto} no fue editado, intentelo más tarde`,
          "error"
        );
      }
    });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Editar Producto</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded bg-light">
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formNombreProducto">
              <Form.Label>Nombre del Producto*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Café"
                {...register("nombreProducto", {
                  required: "El nombre del producto es obligatorio",
                  minLength: {
                    value: 2,
                    message: "La cantidad mínima de caracteres es de 2",
                  },
                  maxLength: {
                    value: 100,
                    message: "La cantidad máxima de caracteres es de 100",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreProducto?.message}
              </Form.Text>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
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
                    value: 300000,
                    message: "El precio máximo es de $300000",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.precio?.message}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Café torrado"
                {...register("descripcion", {
                  required: "La descripción del producto es obligatoria",
                  minLength: {
                    value: 2,
                    message: "La cantidad mínima de caracteres es de 2",
                  },
                  maxLength: {
                    value: 300,
                    message: "La cantidad máxima de caracteres es de 300",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.descripcion?.message}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formImg">
              <Form.Label>Imagen URL*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: https://www.example.com/image.jpg"
                {...register("img", {
                  required: "La imagen es obligatoria",
                })}
              />
              <Form.Text className="text-danger">
                {errors.img?.message}
              </Form.Text>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoría*</Form.Label>
              <Form.Select
                {...register("categoria", {
                  required: "La categoría es obligatoria",
                })}
              >
                <option value="">Seleccione una opción</option>
                <option value="Pastas">Pastas</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Hamburguesas">Hamburguesas</option>
                <option value="Ensaladas">Ensaladas</option>
                <option value="Bebidas">Bebidas</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.categoria?.message}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100 mt-4">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarProducto;
