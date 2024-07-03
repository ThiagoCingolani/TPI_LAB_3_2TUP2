import React from 'react'
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap'

const ManageUsers = ({ username, email, role, id }) => {

  const deleteProduct = async (userId) => {
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
          <Button variant='danger' onClick={() => deleteProduct(id)}>Eliminar usuario</Button>
          <Button variant='primary'>Modificar usuario</Button>
        </div>
      </Card>
    </div>
  )
}

ManageUsers.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
};


export default ManageUsers