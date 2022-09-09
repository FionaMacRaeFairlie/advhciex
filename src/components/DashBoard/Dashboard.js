import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ViewTripPopup from "../PlanTrip/viewTrip";
import ViewItinerariesPopup from "../PlanTrip/viewItineraries";
import ShareTripPopup from "../PlanTrip/shareTrip";
import Login from "../PlanTrip/Login";

const Dashboard = (props) => {
  return (
    <>
      <ButtonToolbar  aria-label="Toolbar with button groups">
        <ButtonGroup vertical className="buttonGroup1 mb-2">
          <ViewTripPopup hostels={props.data}></ViewTripPopup>
          <ShareTripPopup></ShareTripPopup>
          <ViewItinerariesPopup></ViewItinerariesPopup>
        </ButtonGroup>
      </ButtonToolbar>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup  className="buttonGroup2 mb-2">
          <Login></Login>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
};

export default Dashboard;
