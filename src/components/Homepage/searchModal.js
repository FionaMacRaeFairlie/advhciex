import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  Modal,
  ButtonGroup,
} from "react-bootstrap";
import { useGetAllHostelsQuery } from "../../reduxStore/RTKfetch/apiSlice";
import Button from "react-bootstrap/Button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./styles/modalStyle.scss";
import "./styles/searchModal.scss";

import {
  getHostels,
  selectedHostel,
} from "../../reduxStore/slices/hostelSlice";
import { useDispatch, useSelector } from "react-redux";

function SearchModal(props) {
  const [searchedHostel, setSearchedHostel] = useState();
  const stateUpdated = useSelector((state) => state.hostels.data);

  const { onHide } = props;
  useEffect(() => {
    // console.log(props.data);
    // console.log(props.title);
    // console.log(props);
    dispatch(selectedHostel(searchedHostel));

    // onHide();
  }, [searchedHostel]);

  useEffect(() => {
    if (stateUpdated) {
      props.onHide();
    }
  }, [stateUpdated]);

  const dispatch = useDispatch();

  const displayHostelList = (d) => {
    return d.map((key, val) => {
      return (
        <div key={val} className="hostelContainer">
          <Button
            className="hostelsBtn"
            onClick={() => {
              //USE REDUX TO SEND DATA OF CLICKED HOSTEL TO PREVIOUS COMPONENT
              // dispatch(selectedHostel("ciao"));
              setSearchedHostel(key);
              //  props.onHide();
            }}
          >
            {key.name}
          </Button>
        </div>
      );
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{displayHostelList(props.data)}</Modal.Body>
      {/* <Modal.Footer>
        <Button className="primButton" onClick={props.onHide}>
          View reviews
        </Button>
        <Button className="primButton" onClick={props.onHide}>
          Write a review
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default SearchModal;