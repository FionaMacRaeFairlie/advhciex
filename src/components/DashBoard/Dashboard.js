import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { render } from "react-dom";
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import "./style/dashboard.scss";
import { useState } from "react";
import {
  useGetAllHostelsQuery,
  useNewUserItineraryMutation,
} from "../../reduxStore/RTKfetch/apiSlice";
import SearchModal from "../Homepage/searchModal";
import { useDispatch, useSelector } from "react-redux";
import PlanTripModal from "../PlanTrip/PlanTripModal";
import ViewTripModal from "../EditTrip/ViewTripModal";
import { logOut } from "../../reduxStore/slices/loginSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Dashboard = () => {
  const { data, error, isLoading, isSuccess } = useGetAllHostelsQuery();
  const [showHostelsModal, setShowHostelsModal] = useState(false);
  const [planTripModal, setPlanTripModal] = useState(false);
  const [editTripModal, setEditTripModal] = useState(false);
  const user = useSelector((state) => state.login.verifyUser.user);

  const [newUserItinerary] = useNewUserItineraryMutation();
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="dashWrapper">
      <span>Your Account:</span>
      <div className="infoDiv">
        <h2>{user.personalInfo.name}</h2>
        <h2>{user.personalInfo.surname}</h2>
      </div>

      <div className="btnDiv">
        <ButtonGroup vertical className="buttonGroup">
          <Button
            className="dashBtn"
            onClick={() => {
              setShowHostelsModal(true);
            }}
          >
            List all hostels
          </Button>
          <Button
            className="dashBtn"
            onClick={() => {
              setPlanTripModal(true);
              newUserItinerary(user.user);
            }}
          >
            Plan your Trip
          </Button>
          <Button
            className="dashBtn"
            onClick={() => {
              setEditTripModal(true);
            }}
          >
            View Your Journey
          </Button>
          <Button
            className="dashBtn"
            onClick={() => {
              history.push("/");
              dispatch(logOut());
            }}
          >
            Log out
          </Button>
        </ButtonGroup>
      </div>

      {isLoading && "loading"}
      {error && error.message}
      {isSuccess && data && showHostelsModal && (
        <SearchModal
          show={showHostelsModal}
          onHide={() => setShowHostelsModal(false)}
          //btnClick={()=>{}}
          data={data}
          title={"List of hostels along the way!"}
        ></SearchModal>
      )}

      {planTripModal && (
        <PlanTripModal
          show={planTripModal}
          onHide={() => setPlanTripModal(false)}
        />
      )}

      {editTripModal && (
        <ViewTripModal
          show={editTripModal}
          onHide={() => setEditTripModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
