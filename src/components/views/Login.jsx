import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "../helpers/queries";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = (usuario) => {
  login(usuario).then((respuesta) => {
    console.log('Respuesta del login:', respuesta);  // Verifica la estructura aquí
    if (respuesta && respuesta.status === 200) {
      sessionStorage.setItem("usuario", JSON.stringify(respuesta));
      Swal.fire(
        "Bienvenido",
        `${respuesta.nombreUsuario} iniciaste sesión correctamente`,
        "success"
      );
      setUsuarioLogueado(respuesta);
      // Redireccionar
      navegacion("/admin");
    } else {
      Swal.fire("Error", "Email o contraseña incorrectos", "error");
    }
  });
};

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="login-form">
            <h2 className="text-center">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                      message:
                        "El email debe cumplir con el formato mail@dominio.com",
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
              </Form.Group>
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
              <Button variant="primary" type="submit" className="w-100">
                Iniciar Sesión
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <p>
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
