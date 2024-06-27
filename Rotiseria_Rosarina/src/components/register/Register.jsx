import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel, Card } from "react-bootstrap";


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
      role: 'User'
    };

    try {
      const response = await fetch('http://localhost:3001/Users', {
        method: 'POST',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingInput" label="Ingresar su Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
                <Form.Control
                  type='password'
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Crear cuenta
            </Button>
            <h6>Ya tenés una cuenta?<Button variant="link" className="fw-bold pt-1" onClick={()=>{navigate("/login")}}>Iniciá Sesión</Button></h6>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
