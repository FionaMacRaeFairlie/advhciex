import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Chart, Pie } from "react-chartjs-2";
import PieChart from "../Chart/Chart";
// import Chart from "../Chart/Chart";
import "./styles/modalStyle.scss";

function HomepageModal(props) {
  useEffect(() => {
    console.log(props.data);

    console.log(props.data.ratings);
  });

  let ratings = props.data.ratings;
  const calcAvg = (elmt) => {
    var sum = 0;
    for (var i = 0; i < elmt.length; i++) {
      sum += parseInt(elmt[i], 10);
    }

    var avg = sum / elmt.length;
    return avg;
  };

  const [showReviews, setShowReviews] = useState(false);
  const [init, setInit] = useState(true);

  const initState = () => {
    return (
      <div className="modalBodyWrap">
        <span>
          <strong>Address:</strong> {props.data.address}
        </span>
        <span>
          <strong>Post code:</strong> {props.data.postcode}
        </span>
        <span>
          <strong>Phone:</strong> {props.data.phone}
        </span>
        <span>
          <strong>Mail:</strong> {props.data.mail}
        </span>
        <span>
          <strong>Description:</strong> {props.data.description}
        </span>
        <span>
          <strong>Average rating:</strong> {calcAvg(ratings)}
        </span>
        <span>
          <strong>Total ratings:</strong> {ratings.length}
        </span>
        <br />
        <strong style={{ textAlign: "center" }}>
          Total ratings distribution:
        </strong>

        <PieChart data={props.data.ratings}></PieChart>
      </div>
    );
  };

  const reviews = (d) => {
    return d.map((key, val) => {
      return (
        <div key={val} className="reviewContainer">
          <div className="reviewWrap">
            <span>Name: {key.reviewer}</span>
            <span>Description: {key.review}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.data.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {init && initState()}

          {showReviews && reviews(props.data.reviews)}
        </Modal.Body>
        <Modal.Footer>
          {init && (
            <Button
              className="primButton"
              onClick={() => {
                setInit(false);
                setShowReviews(true);
              }}
            >
              View reviews
            </Button>
          )}

          <Button className="primButton" onClick={props.onHide}>
            Write a review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomepageModal;
