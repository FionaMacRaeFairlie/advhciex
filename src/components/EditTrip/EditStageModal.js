import React, { useEffect, useState } from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Chart, Pie } from "react-chartjs-2";
import PieChart from "../Chart/Chart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetItineraryByUserQuery,
  useUpdateItineraryStageMutation,
} from "../../reduxStore/RTKfetch/apiSlice";

function EditStageModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const hostels = useSelector((state) => state.hostels.allHostels);
  const user = useSelector((state) => state.login.verifyUser.user);
  const { data: itineraryData, refetch: refetchItinerary } =
    useGetItineraryByUserQuery(user.user);

  const [updateItineraryStage] = useUpdateItineraryStageMutation();

  useEffect(() => {
    console.log("props", props);
  });

  const renderOptions = () => {
    return hostels.map((key, val) => {
      return (
        <option key={val} value={key.id}>
          {key.name}
        </option>
      );
    });
  };

  const renderForm = () => {
    return (
      <>
        <form className="stageForm">
          <div>
            <h1>Stage: {props.data.stage} </h1>
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
              stageId: props.data.stage,
              userName: user.user,
              hostel: formData.hostelStage,
              nights: formData.nights,
            };
            // console.log(formData);
            // setAddStage(stage + 1);
            updateItineraryStage(reqBody);
            // reset({ hostelStage: "", nights: "" });
            refetchItinerary();
            props.onHide();
          })}
          type="submit"
        >
          Edit stage
        </Button>

        <Button
          className="primButton"
          onClick={() => {
            props.onHide();
          }}
          type="submit"
        >
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
            Edit stage ...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
      </Modal>
    </div>
  );
}

export default EditStageModal;
