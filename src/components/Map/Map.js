import React, { useEffect, useState } from "react";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { useGetAllHostelsQuery } from "../../reduxStore/RTKfetch/apiSlice";
import Button from "react-bootstrap/Button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./styles/mapstyle.scss";
import HomepageModal from "../Homepage/HomepageModal";
import { render } from "react-dom";
import { useHistory } from "react-router";
import SearchBar from "./SearchBar";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 57.543799,
  lng: -5.504566,
};

function Map() {
  const { data, error, isLoading, isSuccess } = useGetAllHostelsQuery();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  //   React.useEffect(() => {
  //     console.log(data);
  //   }, []);
  const [showInfo, setShowInfo] = useState(false);
  const [infoData, setInfoData] = useState();

  const displayMarkers = (d) => {
    return d.map((key, val) => {
      return (
        <Marker
          key={val}
          id={val}
          position={{
            lat: key.location.lat,
            lng: key.location.long,
          }}
          onClick={() => {
            setInfoData(key);
            setShowInfo(false);
            setShowInfo(true);
          }}
        ></Marker>
      );
    });
  };

  return (
    <div>
      {isLoading && "loading"}
      {error && error.message}
      {isSuccess && data && (
        <LoadScript googleMapsApiKey="AIzaSyB0HrMLMkZNJ0NnlrlZNfjnMZlCyTWFpEI">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <SearchBar />
            {displayMarkers(data)}

            {showInfo && (
              <div>
                <InfoWindow
                  position={{
                    lat: infoData.location.lat,
                    lng: infoData.location.long,
                  }}
                  onCloseClick={() => {
                    setShowInfo(false);
                  }}
                >
                  <div className="infoContainer">
                    <span>{infoData.name}</span>
                    <span>
                      <strong>Address:</strong> {infoData.address}
                    </span>
                    <span>
                      <strong>Post code:</strong> {infoData.postcode}
                    </span>
                    <span>
                      <strong>Phone:</strong> {infoData.phone}
                    </span>
                    <Button
                      className="primButton"
                      onClick={() => {
                        setModalData(infoData);
                        setShowModal(true);
                      }}
                    >
                      View more
                    </Button>
                  </div>
                </InfoWindow>
              </div>
            )}
          </GoogleMap>
        </LoadScript>
      )}
      {showModal && (
        <HomepageModal
          show={showModal}
          onHide={() => setShowModal(false)}
          data={modalData}
        ></HomepageModal>
      )}
    </div>
  );
}

export default React.memo(Map);
