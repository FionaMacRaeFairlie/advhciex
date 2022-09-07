import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import Map from "../Map/Map";
import Dashboard from "../DashBoard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import HomepageModal from "./HomepageModal";
import { selectedHostel } from "../../reduxStore/slices/hostelSlice";
import { Link } from "react-router-dom";
import Search from "../Search/Search"

const Home = (props) => {
  const userVerified = useSelector((state) => state.login.verifyUser);

  const searchedHostel = useSelector((state) => state.hostels.data);

  const hostelsData = useSelector((state) => state.hostels.allHostels);

  const dispatch = useDispatch();

  return (
    <div>
      {userVerified.success ? (
        <Container fluid>
          <Row className="row align-items-start">
            <Col className=" col-md-1 col-lg-1">  <Dashboard ></Dashboard></Col>
            <Col className=" col-md-9 col-lg-9">
              <Map hostels={hostelsData}></Map>
            </Col>
            <Col className="col-sm-12 col-md-2 col-lg-2">
            <Search details={hostelsData}/>        
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
