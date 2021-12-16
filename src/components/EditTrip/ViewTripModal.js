import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

import EditStageModal from "./EditStageModal";
import { useDeleteStageMutation } from "../../reduxStore/RTKfetch/apiSlice";

function ViewTripModal(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewTrip, setShowViewTrip] = useState(true);

  const [editProps, setEditProps] = useState();

  const hostels = useSelector((state) => state.hostels.allHostels);

  const [deletestage] = useDeleteStageMutation();
  const user = useSelector((state) => state.login.verifyUser.user);

  const itinerary = useSelector((state) => state.itinerary.itinerary.stages);
  const itineraryExist = useSelector((state) => state.itinerary.itineraryExist);
  const totDis = useSelector((state) => state.itinerary.totalDistance);
  const renderItinerary = () => {
    return itinerary.map((key, val) => {
      console.log(key, val);

      let currentHostel = hostels.filter((obj) => obj.id == key.hostel);

      console.log(currentHostel);

      return (
        <div key={val} className="reviewContainer">
          <div className="reviewWrap">
            <h3>Stage: {key.stage}</h3>
            <span>Name: {currentHostel[0].name}</span>
            <span>Nights: {key.nights}</span>

            <Button
              className="primButton"
              onClick={() => {
                setShowEditModal(true);
                setShowViewTrip(false);
                setEditProps(key);
              }}
            >
              edit stage{" "}
            </Button>

            <Button
              className="primButton"
              onClick={() => {
                deletestage({ userName: user.user, stageId: key.stage });
              }}
              type="submit"
            >
              Cancel stage
            </Button>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {showViewTrip && (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={props.show}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Your trip
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {itineraryExist ? (
              <>
                Total distance is {totDis * 0.001}
                {renderItinerary()}
              </>
            ) : (
              <h3>You dont have an itinerary yet please create one</h3>
            )}
          </Modal.Body>
          {/* <Modal.Footer>
         
        </Modal.Footer> */}
        </Modal>
      )}

      {showEditModal && (
        <EditStageModal
          data={editProps}
          show={showEditModal}
          onHide={() => {
            {
              setShowEditModal(false);
              setShowViewTrip(true);
            }
          }}
        ></EditStageModal>
      )}
    </div>
  );
}

export default ViewTripModal;
