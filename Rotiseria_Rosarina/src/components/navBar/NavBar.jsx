import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useContext } from "react";
import "./NavBar.css"
import { AuthenticationContext } from '../../services/authentication/Authentication.context';

const Header = () => {
  const {handleLogout, user} = useContext(AuthenticationContext)

  const onHandleClick = () => {
    handleLogout();
  };

  return (
    <Navbar id="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Rotiseria Rosarina</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categorias" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Pizzas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Carlitos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Empanadas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="dark">Carrito</Button>
          <Button variant="dark" onClick={onHandleClick}>Cerrar sesión</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header