import React from "react";
import { Modal} from "react-bootstrap";
import PieChart from "../Chart/Chart";

function HomepageModal(props) {
  console.log("props :", props);

  const calcAvg = (elmt) => {
    var sum = 0;
    for (var i = 0; i < elmt.length; i++) {
      sum += parseInt(elmt[i], 10);
    }

    var avg = sum / elmt.length;
    var fixed = avg.toFixed(1);
    return fixed;
  };

  let ratings = props.data.ratings;

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
        <Modal.Body>{initState()}</Modal.Body>
      </Modal>
    </div>
  );
}

export default HomepageModal;
