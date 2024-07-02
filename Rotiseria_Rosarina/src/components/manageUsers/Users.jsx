import React from 'react'
import PropTypes from "prop-types";
import ManageUsers from './ManageUsers';
import UsersSearch from './UsersSearch';
import CreateUser from './CreateUser';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Users = ({ users, toggleUsers, searchUserHandler }) => {
  const [showCreateUser, setShowCreateUser] = useState(false)

  const toggleCreateUser = () => {
    setShowCreateUser(!showCreateUser)
  }

  return (
    <div className="cart-overlay">
      <div className="cart h-75 overflow-hidden overflow-y-scroll">
        <div className='d-flex justify-content-start'>
          <UsersSearch searchUserHandler={searchUserHandler}/>
          <Button className='mt-4' variant='outline-success' style={{height: "39px", width: "39px"}} onClick={toggleCreateUser}><strong>+</strong></Button>
        </div>
        {showCreateUser && <CreateUser toggleCreateUser={toggleCreateUser}/>}
        {users.map((user) => {
          return (
            <ManageUsers
              key={user.id}
              id={user.id}
              username={user.username}
              email={user.email}
              role={user.role}
            />
          );
        })}
        <Button variant="secondary" onClick={toggleUsers}>Cerrar</Button>
      </div>
    </div>

  )
}

Users.propTypes = {
  users: PropTypes.array,
  toggleUsers: PropTypes.func,
  searchUserHandler: PropTypes.func
};

export default Users