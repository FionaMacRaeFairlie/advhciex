import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ShareTripPopup() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {    
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button variant="outline-secondary" size="lg" onClick={setModalIsOpenToTrue} >
        Share Trips
      </Button>
      <Modal 
      show={modalIsOpen}
      onHide={setModalIsOpenToFalse}
      backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>View Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body> You must be logged in to use this feature</Modal.Body>
      </Modal>
    </>
  );
}
export default ShareTripPopup;
