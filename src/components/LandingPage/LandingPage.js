import Button from "react-bootstrap/Button";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Goat from "./assets/goat.png";
import "./style/landingPage.scss";
import { Link } from "react-router-dom";
import { useGetAllHostelsQuery } from "../../reduxStore/RTKfetch/apiSlice";

const LandingPage = () => {
  const { data, error, isLoading, isSuccess, refetch } =
    useGetAllHostelsQuery();
  return (
    <Container>
      <Row className="row">
        <Col>
          <div className="wrapper">
            <img src={Goat} alt="goat" />
            <h1>Welcome to The North Coast 500 route planner</h1>

            <h3>Plan now your journey along the route:</h3>

            <ul className="list-group">
              <li class="list-group-item">check hostels availability</li>
              <li class="list-group-item">check hostels review</li>
              <li class="list-group-item">share your experience with the community</li>
              <li class="list-group-item">plan your trip and modify it as you need</li>
              <li class="list-group-item">view your journey progress</li>
            </ul>
            <Link to="/register">
              <Button className="primButton landBtn">Start Now</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
