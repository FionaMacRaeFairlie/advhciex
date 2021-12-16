import React, { useEffect, useState } from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useNewItineraryStageMutation,
  useGetItineraryByUserQuery,
  useSetItineraryStartDateMutation,
} from "../../reduxStore/RTKfetch/apiSlice";
import "./style/planTripStyle.scss";
import { itineraryExist } from "../../reduxStore/slices/itinerarySlice";

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
  const isItinerary = useSelector((state) => state.itinerary.itineraryExist);
  const path = useSelector((state) => state.itinerary.path);
  const { data: itineraryData, refetch: refetchItinerary } =
    useGetItineraryByUserQuery(user.user);

  const [newItineraryStage] = useNewItineraryStageMutation();
  const [setItDate] = useSetItineraryStartDateMutation();

  const [showStageForm, setShowStageForm] = useState(false);
  const [showDateForm, setShowDateForm] = useState(true);

  const dispatch = useDispatch();

  const renderOptions = () => {
    return hostels.map((key, val) => {
      return (
        <option key={val} value={key.id}>
          {key.name}
        </option>
      );
    });
  };

  useEffect(() => {
    console.log("path length is -<>", itineraryExist);
  });

  const renderForm = () => {
    return (
      <>
        <form className="stageForm">
          <div key={stage}>
            <h1>Stage: {stage}</h1>
            <Form.Select {...register("hostelStage", { required: true })}>
              <option selected={true} disabled="disabled" value="">
                Choose Hostel...
              </option>
              {renderOptions()}
            </Form.Select>
            {errors.hostelStage?.type === "required" && (
              <span className="errors">
                Please choose an hostel from the list
              </span>
            )}
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
            {errors.nights?.type === "required" && (
              <span className="errors">
                Please select how many nights you are planning to stay here!
              </span>
            )}
          </div>
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

        <Button
          className="primButton"
          onClick={() => {
            console.log("close btn", path.length);
            if (path.length > 0) {
              dispatch(itineraryExist());
            }

            props.onHide();
          }}
          type="submit"
        >
          Close
        </Button>
      </>
    );
  };

  const startDateForm = () => {
    return (
      <>
        <form className="stageForm">
          <h1>Please Select Your Starting date</h1>
          <Form.Control
            {...register("startDate", { required: true })}
            type="date"
            placeholder="select a starting date..."
          />
          {errors.startDate?.type === "required" && (
            <span className="errors">
              Please set a start date for your trip
            </span>
          )}
        </form>
        <Button
          className="primButton"
          onClick={handleSubmit((formData) => {
            console.log(formData);
            setItDate({ user: user.user, date: formData.startDate });
            setShowDateForm(false);
            setShowStageForm(true);
          })}
          type="submit"
        >
          set date
        </Button>

        <Button className="primButton" onClick={props.onHide} type="submit">
          Close
        </Button>
      </>
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
            Plan your trip
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isItinerary ? (
            <>
              {showStageForm && renderForm()}
              {showDateForm && startDateForm()}
            </>
          ) : (
            <h1>You already have an itinerary planned, please edit it</h1>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
         
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default PlanTripModal;
