import React from 'react'
import { Button, Form, FloatingLabel, Card, Dropdown } from "react-bootstrap";
import PropTypes from 'prop-types'

const CreateUser = ({toggleCreateUser}) => {
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
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Ingresar su Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
                  <Form.Control
                    type='password'
                    placeholder="Password"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Seleccionar rol de usuario
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item value="User">User</Dropdown.Item>
                  <Dropdown.Item value="Admin">Admin</Dropdown.Item>
                  <Dropdown.Item value="Sysadmin">Sysadmin</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-success" type="submit" className='mt-3'>
                Crear usuario
              </Button>
              </Form.Group>
              <Button variant="secondary" className='mt-3' onClick={toggleCreateUser}>Cerrar</Button>
            </Form>
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