import React, { useEffect, useState } from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Chart, Pie } from "react-chartjs-2";
import PieChart from "../Chart/Chart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetHostelByIdQuery,
  usePostRateMutation,
  usePostReviewMutation,
  useGetAllHostelsQuery,
  useNewItineraryStageMutation,
  useGetItineraryByUserQuery,
  useSetItineraryStartDateMutation,
  useLazyGetHostelByIdNoCBQuery,
} from "../../reduxStore/RTKfetch/apiSlice";
//import "./style/planTripStyle.scss";
import { itineraryExist } from "../../reduxStore/slices/itinerarySlice";
import EditStageModal from "./EditStageModal";

function ViewTripModal(props) {
  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //     reset,
  //   } = useForm();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewTrip, setShowViewTrip] = useState(true);

  const [editProps, setEditProps] = useState();

  const hostels = useSelector((state) => state.hostels.allHostels);

  const itinerary = useSelector((state) => state.itinerary.itinerary.stages);
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
              Edit your trip
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Total distance is {totDis * 0.001}
            {renderItinerary()}
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
