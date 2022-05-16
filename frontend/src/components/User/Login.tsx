import React, { useState, useEffect } from "react";
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/User/userActions";
import Loading from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
// import { useEffect } from "react";
import './Login.css'



export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const userLogin = useSelector((state:any) => state.stateUser)
  
  const {loading, isLogged, error} = userLogin
  
  const [input, setInput] = useState({
    email: "",
    password: ""
  })
  // console.log("EL ESTADO DE USUARIO",userLogin)
  const [message, setMessage] = useState("");

  //si el usuario ya esta logeado no entrara a este componente
  useEffect(() => {
    if (isLogged) {
      navigate('/')
     
    }
  }, [isLogged, navigate])

 
const handleChange = (e:any) => {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
}


  const handleSubmit = (e:any) => {
    
      e.preventDefault();
      if(input.email === "" || input.password === ""){
        setMessage("Todos los campos son obligatorios");
      }
      dispatch(loginUser(input));

    

  };

  return (
    <div className="mainback">
      <Container>
        <Row>
          <h1 className="header-title">INGRESAR</h1>
          <hr/>
        </Row>
    {message && <ErrorMessage variant="danger" input={message}/>}
    {error && <ErrorMessage variant="danger" input={error}/>}
    {loading && <Loading/>}
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Correo</Form.Label>
    <Form.Control
     type="email"
     value={input.email}
     name="email"
      placeholder="Enter email"
      onChange={handleChange}
      />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Contraseña</Form.Label>
    <Form.Control
     type="password" 
     value={input.password}
     name="password"
     placeholder="Password"
     onChange={handleChange}
     />
  </Form.Group>
  <Button onClick={handleSubmit} variant="primary" type="submit">
    Ingresar
  </Button>
</Form>
<Row className="py-3">
          <Col>
            Eres nuevo ? <Link to="/register">Registrate</Link>
          </Col>
        </Row>
    	</Container>
    </div>
  );
}
