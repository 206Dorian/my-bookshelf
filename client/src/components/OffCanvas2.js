import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './OffCanvas.css';
import FriendList from './FriendList';

// Offcanvas section for showing Friend List
const OffcanvasComponent2 = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="offcanvas-friends">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Friends</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <FriendList />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasComponent2;