import { useContext } from 'react';
import { Button, Nav, Navbar, Badge } from "react-bootstrap"
import "./NavBar.css"
import "../productItem/ProductItem.css"
import Cart from '../icons/Cart.png';
import CartList from '../cartList/CartList';
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { CartContext } from '../../services/cartContext/CartContext';
import useModal from "../hooks/useModal";

const Header = () => {
  const { handleLogout, user } = useContext(AuthenticationContext)
  const { cartItems, } = useContext(CartContext);
  const { isOpenCart, toggleCart } = useModal()

  const onHandleClick = () => {
    handleLogout();
  };


  return (
    <Navbar id="navbar" expand="lg" fixed='top'>
      <Navbar.Brand href='http://localhost:5173/' style={{ marginLeft: '1rem' }}>Rotiseria Rosarina</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        {user && user.role === "User" &&
          <div>
            <Button variant="warning" style={{ marginRight: '1rem' }} onClick={toggleCart}>
              <img src={Cart} height={20} alt="Cart" />
              <Badge bg="primary" pill>
                {cartItems.length}
              </Badge>
            </Button>
          </div>
        }
        <Button variant="dark" onClick={onHandleClick} style={{ marginRight: '1rem' }}>Cerrar sesión</Button>
      </Navbar.Collapse>
      {isOpenCart &&
        <CartList toggleCart={toggleCart}/>
      }
    </Navbar>
  );
};

export default Header;