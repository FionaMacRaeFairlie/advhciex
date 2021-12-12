import React, { useEffect, useState } from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Chart, Pie } from "react-chartjs-2";
import PieChart from "../Chart/Chart";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useGetHostelByIdQuery,
  usePostRateMutation,
  usePostReviewMutation,
  useGetAllHostelsQuery,
  useNewItineraryStageMutation,
  useGetItineraryByUserQuery,
} from "../../reduxStore/RTKfetch/apiSlice";
import "./style/planTripStyle.scss";

function PlanTripModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [stage, setAddStage] = useState(1);
  const hostels = useSelector((state) => state.hostels.allHostels);
  const user = useSelector((state) => state.login.verifyUser.user);
  const { data: itineraryData, refetch: refetchItinerary } =
    useGetItineraryByUserQuery(user.user);

  const [newItineraryStage] = useNewItineraryStageMutation();

  const renderOptions = () => {
    return hostels.map((key, val) => {
      return (
        <option key={val} value={key.id}>
          {key.name}
        </option>
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
            Plan your trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="stageForm">
            {/* {renderStage()} */}

            <div key={stage}>
              <h1>Stage: {stage}</h1>
              <Form.Select {...register("hostelStage", { required: true })}>
                <option selected={true} disabled="disabled" value="">
                  Choose Hostel...
                </option>
                {renderOptions()}
              </Form.Select>
              <Form.Select {...register("nights", { required: true })}>
                <option selected={true} disabled="disabled" value="">
                  How many nights?
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </div>
            {/* ---------------------- */}
          </form>
          <Button
            className="primButton"
            onClick={handleSubmit((formData) => {
              const reqBody = {
                userName: user.user,
                hostel: formData.hostelStage,
                nights: formData.nights,
              };
              console.log(formData);
              setAddStage(stage + 1);
              newItineraryStage(reqBody);
              reset({ hostelStage: "", nights: "" });
              refetchItinerary();
            })}
            type="submit"
          >
            Add stage
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button className="primButton" onClick={props.onHide} type="submit">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlanTripModal;
