import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector, useDispatch } from 'react-redux';
import {useLogoutMutation} from '../slices/userApiSlice'
import { logout } from '../slices/authSlice';

const Header = () => {

  const {cartItems} = useSelector((state)=> state.cart)
  const {userInfo} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const [logoutAPICall] = useLogoutMutation()


  const logoutHandler = async ()=>{
    try {
      await logoutAPICall()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
   
  }


  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/* Brand with Link */}
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart {cartItems.length > 0 && <Badge bg='danger'>{cartItems.reduce((acc, curr)=>acc + curr.qty,0)}</Badge>}
              </Nav.Link>
              {userInfo? (<NavDropdown title={userInfo.name}>
                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>) :(<Nav.Link as={Link} to="/login">
                <FaUser /> Login
              </Nav.Link>)}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
