import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {    
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button variant="outline-secondary" size="lg" onClick={setModalIsOpenToTrue}>
        Login
      </Button>
      <Modal 
      show={modalIsOpen}
      onHide={setModalIsOpenToFalse}
      backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body> This feature is currently unavailabe</Modal.Body>
      </Modal>
    </>
  );
}
export default Login;
