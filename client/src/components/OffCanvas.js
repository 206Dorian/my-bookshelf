import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './OffCanvas.css';
import BookSuggestion from './BookSuggestion';

// Offcanvas section for showing Book Sugggestions
const OffcanvasComponent = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom" className="offcanvas-books">
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
