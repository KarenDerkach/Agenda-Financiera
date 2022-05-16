import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
import { registerUser } from "../../redux/actions/User/userActions";


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: ""
  })
  
  const [message, setMessage] = useState("");
  



  const userRegister = useSelector((state:any) => state.stateUser);
  const { loading, error, isLogged} = userRegister;
  // console.log("datos del state" , userRegister.loading);

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const handleChange = (e:any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e:any) => {
    e.preventDefault();
    // if(!input.email || !input.password || !input.name || !input.confirmpassword){
    //   setMessage("Todos los campos son obligatorios")
    // }
    if (input.password !== input.confirmpassword) {
      setMessage("Las contraseñas no coinciden");
      return 
    }
    dispatch(registerUser(input));
  };

  return (
    <div className="mainback">
      <Container>
        <Row>
          <h1 className="header-title">REGISTRARSE</h1>
          <hr/>
        </Row>
        {error && <ErrorMessage variant="danger" input={error}/>}
        {message && <ErrorMessage variant="danger" input={message}/>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="name"
              value={input.name}
              name="name"
              placeholder="Ingrese su nombre completo"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={input.email}
              name="email"
              placeholder="Ingrese su correo"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={input.password}
              name="password"
              placeholder="Ingrese constraseña"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={input.confirmpassword}
              name="confirmpassword"
              placeholder="Confirme contraseña"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
           Registrar
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Ya tienes cuenta? <Link to="/login">Ingresar</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
