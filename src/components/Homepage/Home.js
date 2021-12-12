import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import Map from "../Map/Map";
import Dashboard from "../DashBoard/Dashboard";
import { useGetAllHostelsQuery } from "../../reduxStore/RTKfetch/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import HomepageModal from "./HomepageModal";
import { selectedHostel } from "../../reduxStore/slices/hostelSlice";
import { Link } from "react-router-dom";
const Home = (props) => {
  //   const history = useHistory();
  //   const store = useSelector((state) => state[dataApi.reducerPath]);
  //   const dispatch = useDispatch();
  // const { data, error, isLoading } = useGetAllHostelsQuery();

  // React.useEffect(() => {
  //   console.log("h is", data, isLoading, error);
  // }, []);
  const userVerified = useSelector((state) => state.login.verifyUser);

  const searchedHostel = useSelector((state) => state.hostels.data);

  // const { data, error, isLoading, isSuccess, refetch } =
  //   useGetAllHostelsQuery();
  const hostelsData = useSelector((state) => state.hostels.allHostels);

  // useEffect(() => {
  //   console.log(hostelsData);
  // });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("home loaded");

  //   console.log("----------");
  //   console.log(props);
  //   console.log(searchedHostel);
  // });
  return (
    <div>
      {userVerified.success ? (
        <Container fluid>
          <Row>
            <Col>
              <Map hostels={hostelsData}></Map>
            </Col>
            <Col xs lg="2" className="dashCol">
              <Dashboard></Dashboard>
            </Col>
          </Row>
          {searchedHostel && (
            <HomepageModal
              show={true}
              onHide={() => dispatch(selectedHostel(null))}
              data={searchedHostel}
            ></HomepageModal>
          )}
        </Container>
      ) : (
        <h1>
          user not verified go back to <Link to={"/login"}>login </Link>
        </h1>
      )}
    </div>
  );
};

export default Home;
