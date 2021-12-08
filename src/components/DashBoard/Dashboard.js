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
import { useGetAllHostelsQuery } from "../../reduxStore/RTKfetch/apiSlice";
import SearchModal from "../Homepage/searchModal";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { data, error, isLoading, isSuccess } = useGetAllHostelsQuery();
  const [showHostelsModal, setShowHostelsModal] = useState(false);
  const user = useSelector((state) => state.login.verifyUser.user);
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
          <Button className="dashBtn">Plan your Trip</Button>
          <Button className="dashBtn">View Your Journey</Button>
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
    </div>
  );
};

export default Dashboard;
