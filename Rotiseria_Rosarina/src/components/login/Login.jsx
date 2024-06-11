import React from 'react'
import { Alert, Button, Form, FormGroup, FloatingLabel } from 'react-bootstrap'
import { useContext, useRef, useState } from "react"
//import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    exist: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //const navigate = useNavigate();

  //const { handleLogin } = useContext(AuthenticationContext);

  const changeEmailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setErrors({ ...errors, password: false });
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    
    if (!emailRef.current.value) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }

    if (!password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }

    setErrors({ ...errors, exist: false });

    handleLogin(email);
    //navigate("/");
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form className="text-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="floatingInput" label="Ingresar su Email/Usuario" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" required onChange={changeEmailHandler} ref={emailRef} value={email} className={errors.email && "border border-danger"}/>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
              <Form.Control placeholder="Password" className={errors.password && "border border-danger"} type="password" required onChange={changePasswordHandler} value={password} ref={passwordRef}/>
            </FloatingLabel>
          </Form.Group>

          <Button variant="success" type="submit" onClick={loginHandler}>
            Iniciar Sesión
          </Button>
          {(errors.email || errors.password) && (
            <div className="mt-3 mb-3">
              <Alert variant="danger">Debe completar todos los campos</Alert>
            </div>
          )}
      </Form>
    </div>
  );
}

export default Login