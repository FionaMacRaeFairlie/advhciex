import React, { useEffect, useState } from "react";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import {
  useGetAllHostelsQuery,
  useGetHostelByIdQuery,
  useGetItineraryByUserQuery,
  useLazyGetHostelByIdQuery,
} from "../../reduxStore/RTKfetch/apiSlice";
import Button from "react-bootstrap/Button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./styles/mapstyle.scss";
import HomepageModal from "../Homepage/HomepageModal";
import { render } from "react-dom";
import { useHistory } from "react-router";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { GoogleApiWrapper } from "google-maps-react";
import { computeDistanceBetween } from "spherical-geometry-js";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 57.543799,
  lng: -5.504566,
};

function Map(props) {
  const itinerary = useSelector((state) => state.itinerary.itinerary.stages);

  // const hostelsData = useSelector((state) => state.hostels.allHostels);
  let data = props.hostels;
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();

  const [showInfo, setShowInfo] = useState(false);
  const [infoData, setInfoData] = useState();
  const [mapKey, setMapKey] = useState(0);

  const path = useSelector((state) => state.itinerary.path);

  const options = {
    strokeColor: "black",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const chunk = (array, size) => {
    const chunked_arr = [];
    let copied = [...array]; // ES6 destructuring
    const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
    for (let i = 0; i < numOfChild; i++) {
      chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
  };

  const [queryByHostelId, setQueryByHostelId] = useState();
  // const [trigger, result, lastPromiseInfo] = useLazyGetHostelByIdQuery();
  const {
    data: hostelQueryData,
    error,
    refetch,
  } = useGetHostelByIdQuery(queryByHostelId);

  const renderPathDistanceWindow = () => {
    let arraySlice = chunk(path, 2);
    console.log("chunk array -+->", arraySlice);

    return arraySlice.map((key, val) => {
      console.log(key, val);

      // console.log({
      //   lat: key[val].lat,
      //   lng: key[val].lng,
      // });

      if (key[0] && key[1] != undefined) {
        let subArr = key[val];
        console.log("sub arr is ", key);
        var distance = computeDistanceBetween(
          {
            lat: key[0].lat,
            lng: key[0].lng,
          },
          {
            lat: key[1].lat,
            lng: key[1].lng,
          }
        );
        return (
          <InfoWindow
            key={val}
            position={{
              lat: key[0].lat,
              lng: key[0].lng,
            }}
            onCloseClick={() => {
              // setShowInfo(false);
            }}
          >
            <span>distance is: {distance * 0.001} km</span>
          </InfoWindow>
        );
      }
    });
  };

  useEffect(() => {
    renderPathDistanceWindow();
  }, [path]);

  useEffect(() => {
    // refetch();
    // console.log("user is", user.user);
    if (itinerary != undefined) {
      itinerary.map((key, val) => {
        console.log(key, val);
        setQueryByHostelId(key.hostel);
        setMapKey(mapKey + 1);
        console.log("state path is ------>", path);
      });
    }
  }, [itinerary]);

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
      <LoadScript
        googleMapsApiKey="AIzaSyB0HrMLMkZNJ0NnlrlZNfjnMZlCyTWFpEI"
        libraries={["geometry"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          key={mapKey}
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
                      setShowInfo(false);
                    }}
                  >
                    View more
                  </Button>
                </div>
              </InfoWindow>
            </div>
          )}
          {true && <div>{renderPathDistanceWindow()}</div>}
          <Polyline
            path={path}
            options={options}
            onClick={(a) => console.log(a)}
          />
        </GoogleMap>
      </LoadScript>
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

export default Map;
