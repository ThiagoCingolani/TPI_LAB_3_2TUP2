import React from 'react'
import { Alert, Button, Form, FloatingLabel, Card, Dropdown } from "react-bootstrap";
import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react';

const CreateUser = ({ toggleCreateUser }) => {
  const [createUsername, setCreateUsername] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createRole, setCreateRole] = useState("User");
  const [errors, setErrors] = useState({ username: false, email: false, password: false });
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/Users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const users = await response.json();
      const newId = users.length + 1;

      const newUser = {
        id: newId,
        username: createUsername,
        email: createEmail,
        password: createPassword,
        role: createRole
      };

      const registerResponse = await fetch('http://localhost:3001/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (registerResponse.ok) {
        alert('Usuario creado');
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el usuario');
    }
  }

  const validateEmail = () => {
    return createEmail.includes('@gmail.com') || createEmail.includes('@hotmail.com');
  };

  const handleUsernameChange = (e) => {
    setCreateUsername(e.target.value);
    setErrors({ ...errors, username: false });
  };

  const handleEmailChange = (e) => {
    setCreateEmail(e.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (e) => {
    setCreatePassword(e.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!createUsername) {
      usernameRef.current.focus();
      setErrors({ ...errors, username: true });
      return;
    }

    if (!validateEmail()) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }

    if (!createPassword) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }

    handleCreateUser(e);
  };

  const handleSelectChange = (event) => {
    setCreateRole(event.target.value);
  };

  return (
    <div className="cart-overlay overflow-auto">
      <div className="cart">
        <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "480px" }}>
          <Card.Body>
            <Form className="text-center">
              <h1>Crear un usuario</h1>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <FloatingLabel controlId="floatingUsername" label="Ingresar el nombre de usuario" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Nombre de usuario"
                    ref={usernameRef}
                    value={createUsername}
                    onChange={handleUsernameChange}
                    className={errors.username && "border border-danger"}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Ingresar su Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    ref={emailRef}
                    value={createEmail}
                    onChange={handleEmailChange}
                    className={errors.email && "border border-danger"}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
                  <Form.Control
                    type='password'
                    placeholder="Password"
                    ref={passwordRef}
                    value={createPassword}
                    onChange={handlePasswordChange}
                    className={errors.password && "border border-danger"}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Seleccione el rol del usuario</Form.Label>
                <Form.Control as="select" value={createRole} onChange={handleSelectChange}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Sysadmin">Sysadmin</option>
                </Form.Control>
              </Form.Group>

              <Button variant="outline-success" type="submit" className='mt-3' onClick={handleCreate}>
                Crear usuario
              </Button>
              <Button variant="secondary" className='mt-3' onClick={toggleCreateUser}>Cerrar</Button>
            </Form>
            {(errors.email || errors.password || errors.username) && (
              <div className="mt-3 mb-3">
                <Alert variant="danger">Complete los campos y/o cumpla los criterios</Alert>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

CreateUser.propTypes = {
  toggleCreateUser: PropTypes.func
}

export default CreateUser