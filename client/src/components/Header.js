import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../assets/MY100LOGO2.png';
import './Header.css';
import Auth from "../utils/auth";

const AppNavbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top logo"
          alt="Your App Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/profile">My Profile</Nav.Link>
        </Nav>
        {Auth.loggedIn() && (
          <Button variant="primary" size="sm" onClick={logout} className="d-lg-none mb-2">
            Logout
          </Button>
        )}
      </Navbar.Collapse>
      {Auth.loggedIn() && (
        <div className="ml-auto d-none d-lg-flex">
          <Button variant="primary" size="sm" onClick={logout} className='logout-btn'>
            Logout
          </Button>
        </div>
      )}
    </Navbar>
  );
};

export default AppNavbar;
