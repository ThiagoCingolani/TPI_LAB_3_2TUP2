import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap'
import useModal from '../hooks/useModal';

const ManageUsers = ({ id, username, email, password, role, onUpdateUsers}) => {
  const {isOpen, openModal, closeModal,} = useModal()
  const [userName, setUserName] = useState(username);
  const [userEmail, setUserEmail] = useState(email);
  const [userRole, setUserRole] = useState(role);


  const handleApplyChanges = async (userid) => {
    const updatedUsersData = {
      id,
      username: userName,
      email: userEmail,
      password,
      role: userRole,
    };

    
    try {
        const response = await fetch(`http://localhost:3001/Users/${userid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUsersData),
        });

        if (!response.ok) {
            throw new Error('Failed to update users.');
        }

        onUpdateUsers(updatedUsersData);
        closeModal();
    } catch (error) {
        console.error('Error updating users:', error);
    }
};

  const deleteUsers = async (userId) => {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
      try {
        const response = await fetch(`http://localhost:3001/Users/${userId}`, {
          method: "DELETE",
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error("Fallo al intentar eliminar un usuario.");
        }
        alert("Usuario eliminado correctamente.");
      }
      catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <Card border="primary" style={{ width: '515px' }} className='mb-4'>
        <Card.Header><strong>{username}</strong></Card.Header>
        <Card.Body className='d-flex justify-content-center'>
          <table>
            <tbody>
              <tr>
                <td className='d-flex justify-content-end'><Card.Text><strong>Email: </strong></Card.Text></td>
                <td className="text-start px-2">{email}</td>
              </tr>
              <tr>
                <td className='d-flex justify-content-end'><Card.Text><strong>Tipo de usuario: </strong></Card.Text></td>
                <td className="text-start px-2">{role}</td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
        <div className='d-flex justify-content-around mb-2'>
          <Button variant='danger' onClick={() => deleteUsers(id)}>Eliminar usuario</Button>
          <Button variant='primary' onClick={openModal}>Modificar usuario</Button>
        </div>



        {/*Modal para modificar usuarios*/}
        <Modal show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustomUser">
                <Form.Label>Seleccione el rol del usuario</Form.Label>
                <Form.Control as="select" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Sysadmin">Sysadmin</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => handleApplyChanges(id)}>
              Aplicar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  )
}

ManageUsers.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  onUpdateUsers: PropTypes.func,
};


export default ManageUsers