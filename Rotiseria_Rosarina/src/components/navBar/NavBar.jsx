import { useContext, useState } from 'react';
import { Button, Nav, NavDropdown, Navbar, Badge } from "react-bootstrap"
import "./NavBar.css"
import "../productItem/ProductItem.css"
import Cart from '../icons/Cart.png';
import CartList from '../cartList/CartList';
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { CartContext } from '../../services/cartContext/CartContext';

const Header = () => {
  const { handleLogout, user } = useContext(AuthenticationContext)
  const [showCart, setShowCart] = useState(false);
  const { cartItems, } = useContext(CartContext);


  const onHandleClick = () => {
    handleLogout();
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Navbar id="navbar" expand="lg" fixed='top'>
      <Navbar.Brand href='http://localhost:5173/' style={{ marginLeft: '1rem' }}>Rotiseria Rosarina</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && <div>
            <NavDropdown title="Categorias" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Pizzas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Carlitos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Empanadas</NavDropdown.Item>
            </NavDropdown>
          </div>}
        </Nav>
        {user && <div>
          <Button variant="warning" style={{ marginRight: '1rem' }} onClick={toggleCart}>
            <img src={Cart} height={20} alt="Cart" />
            <Badge bg="primary" pill>
              {cartItems.length}
            </Badge>
          </Button>
          <Button variant="dark" onClick={onHandleClick} style={{ marginRight: '1rem' }}>Cerrar sesión</Button>
        </div>}
      </Navbar.Collapse>
      {showCart &&
        <CartList toggleCart={toggleCart} />
      }
    </Navbar>
  );
};

export default Header;