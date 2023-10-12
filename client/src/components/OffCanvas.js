import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './OffCanvas.css';
import BookSuggestion from './BookSuggestion';

const OffcanvasComponent = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom" className="offcanvas-feature">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Recent Additions</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <BookSuggestion />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasComponent;
