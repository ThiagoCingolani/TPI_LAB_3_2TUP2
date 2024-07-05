import React from 'react'
import { useState } from 'react';
import {Form, Button, Row, InputGroup} from "react-bootstrap"


const UsersSearch = ({searchUserHandler}) => {
  const [searchUser, setSearchUser] = useState("");

    const handleSearch = () => {
        searchUserHandler(searchUser);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch()
        }
    };

  return (
    <div>
      <Row className="justify-content-center w-100">
        <Form style={{width: "500px"}}>
          <Form.Group controlId="formBasicUserSearch">
            <InputGroup className="mb-3 mt-4">
              <Form.Control
                className="border-success"
                type="text"
                placeholder="Busca un usuario"
                style={{ textAlign: 'center' }}
                value={searchUser}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <Button variant="success" onClick={handleSearch}>
                Buscar
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Row>
    </div>
  )
}

export default UsersSearch