import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import moment from "moment";

function ViewTripPopup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [value, setValue] = useState("");
  const [ArrivalDate, setArrivalDate] = useState();
  const [DeptDate, setDeptDate] = useState();
  const [Trip, setTrip] = useState([{}]);

  const onChangeArrivalDate = (date) => {
    setArrivalDate(moment(new Date(date.target.value)).format("DD-MM-YYYY"));
  };
  const onChangeDeptDate = (date) => {
    setDeptDate(moment(new Date(date.target.value)).format("DD-MM-YYYY"));
  };
  const handleAdd = () => {
    setTrip((Trip) => [
      ...Trip,
      { name: value, arrive: ArrivalDate, depart: DeptDate },
    ]);
  };
  const handleSave = () => {
    setShowAlert(true);
  };
  const [showAlert, setShowAlert] = useState(false);



  const setModalIsOpenToFalse = () => {
    setShowAlert(false);
  };

  if (showAlert) {
    return (
      <Modal show={showAlert} onHide={setModalIsOpenToFalse}>
        <Modal.Header closeButton>
          <Modal.Title>Save Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body> Please log in to use this feature</Modal.Body>
      </Modal>
    );
  }
  return (
    <>
      <Button variant="outline-secondary" size="lg"  onClick={handleShow}>
        Plan Trip
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Plan Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.Date1">
              <Form.Label>Arrival Date</Form.Label>
              <Form.Control
                type="date"
                value={value}
                onChange={(e) => onChangeArrivalDate(e)}
                autoFocus
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.Date2">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                value={value}
                onChange={(e) => onChangeDeptDate(e)}
              ></Form.Control>
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setValue((value) => e.target.value)}
            >
              <option>Select a hostel...</option>
              {props.hostels.map((item) => {
                return <option value={item.name}>{item.name}</option>;
              })}
            </Form.Select>
            <p>You have selected </p>
            <p>{value}</p>
            <p>{ArrivalDate}</p>
            <p>{DeptDate}</p>
            <p>Click add to include this stage in your itinerary</p>

            <h4>Itinerary</h4>
            <Table>
              <thead>
                <th>Hostel name</th>
                <th>arrive</th>
                <th>depart</th>
              </thead>
              {Trip.map((item) => {
                  return (
                  <tr key={item.name}>
                    <td>{item.name} </td>
                    <td>{item.arrive} </td>
                    <td>{item.depart} </td>
                  </tr>
                );
              })}
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add stage
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Itinerary
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewTripPopup;
