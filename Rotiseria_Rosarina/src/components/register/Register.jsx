import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, email: false, password: false });
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const response = await fetch('http://localhost:3001/Users');
        if (!response.ok) {
          throw new Error('Error fetching users');
        }
        const users = await response.json();
        const newId = users.length + 1;

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchNextId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/Users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const users = await response.json();
      const newId = users.length + 1;

      const newUser = {
        id: String(newId),
        username,
        email,
        password,
        role: 'User'
      };

      const registerResponse = await fetch('http://localhost:3001/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (registerResponse.ok) {
        alert('Registro exitoso');
        navigate('/login');
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el registro');
    }
  };

  const validateEmail = () => {
    return email.includes('@gmail.com') || email.includes('@hotmail.com');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors({ ...errors, username: false });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username) {
      usernameRef.current.focus();
      setErrors({ ...errors, username: true });
      return;
    }

    if (!validateEmail()) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }

    if (!password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }

    handleSubmit(e);
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "420px" }}>
        <Card.Body>
          <Form className="text-center">
            <h1>Registrarse</h1>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <FloatingLabel controlId="floatingUsername" label="Ingresar nombre de usuario" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nombre de usuario"
                  ref={usernameRef}
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  className={errors.username && "border border-danger"}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Ingresar su Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  ref={emailRef}
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={errors.email && "border border-danger"}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
                <Form.Control
                  type='password'
                  placeholder="Password"
                  ref={passwordRef}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={errors.password && "border border-danger"}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleRegister}>
              Crear cuenta
            </Button>
            <h6>¿Ya tienes una cuenta? <Button variant="link" className="fw-bold pt-1" onClick={() => navigate("/login")}>Iniciar Sesión</Button></h6>
          </Form>
          {(errors.email || errors.password || errors.username) && (
              <div className="mt-3 mb-3">
                <Alert variant="danger">Complete los campos y/o cumpla los criterios</Alert>
              </div>
            )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;