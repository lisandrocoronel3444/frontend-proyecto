import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearUsuario } from "../helpers/queries";
import { Link } from 'react-bootstrap-icons';

const Registro = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (usuario) => {
    crearUsuario(usuario).then((respuesta) => {
      if (respuesta && respuesta.status === 201) {
        Swal.fire(
          'Registro Exitoso',
          `${respuesta.nombre} te has registrado correctamente`,
          'success'
        );
        // Redirigir al login después del registro exitoso
        navigate('/login');
      } else {
        Swal.fire(
          'Error',
          'Hubo un problema al registrar tu cuenta',
          'error'
        );
      }
    });
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="login-form">
            <h2 className="text-center">Registrar Cuenta</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formNombreUsuario">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre de usuario"
                  {...register("nombreUsuario", { required: "El nombre de usuario es obligatorio" })}
                />
                <Form.Text className="text-danger">
                  {errors.nombreUsuario?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  {...register("email", {
                    required: "El email es un dato obligatorio",
                    pattern: {
                      value:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                      message: "El email debe cumplir con el formato mail@dominio.com",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: "El password es un dato obligatorio",
                    pattern: {
                      value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                      message:
                        "El password debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Registrar Cuenta
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
