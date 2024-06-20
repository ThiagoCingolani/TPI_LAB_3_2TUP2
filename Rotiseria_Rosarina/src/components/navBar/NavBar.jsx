import { useContext, useState } from 'react';
import { Button, Nav, NavDropdown, Navbar, Card, Row, Col } from "react-bootstrap"
import "./NavBar.css"
import "../productItem/ProductItem.css"
import Cart from '../icons/Cart.png';
import CartList from '../cartList/CartList';
import { AuthenticationContext } from "../../services/authentication/Authentication.context";

const Header = () => {
  const { handleLogout } = useContext(AuthenticationContext)
  const [showCart, setShowCart] = useState(false);

  const onHandleClick = () => {
    handleLogout();
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Navbar id="navbar" expand="lg" fixed='top'>
      <Navbar.Brand href="#home" style={{ marginLeft: '1rem' }}>Rotiseria Rosarina</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Categorias" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Pizzas</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Carlitos</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Empanadas</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="dark" style={{ marginRight: '1rem' }} onClick={toggleCart}>
          <img src={Cart} height={20} alt="Cart" />
        </Button>
        <Button variant="dark" onClick={onHandleClick} style={{ marginRight: '1rem' }}>Cerrar sesión</Button>
      </Navbar.Collapse>
      {showCart &&
        <CartList toggleCart={toggleCart} />
      }
    </Navbar>
  );
};

export default Header;