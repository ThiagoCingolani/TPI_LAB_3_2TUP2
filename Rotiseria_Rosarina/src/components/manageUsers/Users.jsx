import React from 'react'
import PropTypes from "prop-types";
import ManageUsers from './ManageUsers';
import UsersSearch from './UsersSearch';
import CreateUser from './CreateUser';
import useModal from '../hooks/useModal';
import { Button } from 'react-bootstrap';

const Users = ({ users, searchUserHandler, onUpdateUsers, toggleUsers }) => {
  const { isOpenCreateUser, toggleCreateUser } = useModal()
  return (
    <div className="cart-overlay">
      <div className="cart h-75 overflow-hidden overflow-y-scroll">
        <div className='d-flex justify-content-start'>
          <UsersSearch searchUserHandler={searchUserHandler} />
          <Button className='mt-4' variant='outline-success' style={{ height: "39px", width: "39px" }} onClick={toggleCreateUser}><strong>+</strong></Button>
        </div>
        <Button className='mb-3' variant="secondary" onClick={toggleUsers}>Cerrar</Button>
        {isOpenCreateUser && <CreateUser isOpenCreateUser={isOpenCreateUser} toggleCreateUser={toggleCreateUser} />}
        {users.map((user) => {
          return (
            <ManageUsers
              key={user.id}
              id={Number(user.id)}
              username={user.username}
              email={user.email}
              password={user.password}
              role={user.role}
              onUpdateUsers={onUpdateUsers}
            />
          );
        })}
      </div>
    </div>

  )
}

Users.propTypes = {
  users: PropTypes.array,
  toggleUsers: PropTypes.func,
  searchUserHandler: PropTypes.func,
  onUpdateUsers: PropTypes.func,
};

export default Users