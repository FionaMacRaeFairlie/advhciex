import React, { useEffect, useRef, useState } from "react";
import { useGetHostelByIdQuery } from "../../reduxStore/RTKfetch/apiSlice";
import Button from "react-bootstrap/Button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./styles/mapstyle.scss";
import HomepageModal from "../Homepage/HomepageModal";
import { useHistory } from "react-router";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { computeDistanceBetween, interpolate } from "spherical-geometry-js";
import { totalDistance } from "../../reduxStore/slices/itinerarySlice";

const containerStyle = {
  width: "100%",
  height: "200vh",
};

const center = {
  lat: 57.543799,
  lng: -5.504566,
};

function Map(props) {
  const itinerary = useSelector((state) => state.itinerary.itinerary.stages);
  let data = props.hostels;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();

  const [showInfo, setShowInfo] = useState(false);
  const [infoData, setInfoData] = useState();
  const [mapKey, setMapKey] = useState(0);

  // const [totalDistance, setTotalDistace] = useState(0);
  const dispatch = useDispatch();

  const path = useSelector((state) => state.itinerary.path);

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

      if (key[0] && key[1] != undefined) {
        let subArr = key[val];
        let distance = computeDistanceBetween(
          {
            lat: key[0].lat,
            lng: key[0].lng,
          },
          {
            lat: key[1].lat,
            lng: key[1].lng,
          }
        );
        dispatch(totalDistance(distance));
        //  console.log("tot dis is:", totalDistance);
        let mid = interpolate(
          {
            lat: key[0].lat,
            lng: key[0].lng,
          },
          {
            lat: key[1].lat,
            lng: key[1].lng,
          },
          0.5
        );
        return (
          <>
            <InfoWindow
              key={val}
              position={{
                lat: mid.latitude,
                lng: mid.longitude,
              }}
              onCloseClick={() => {
                // setShowInfo(false);
              }}
            >
              <span>distance is: {distance * 0.001} km</span>
            </InfoWindow>
          </>
        );
      }
    });
  };

  useEffect(() => {
    renderPathDistanceWindow();
    console.log("path changed aga");
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
          {true &&
           <div>
             {/* {renderPathDistanceWindow()} */}
           </div>}
          {/* <Polyline
            path={path}
            options={options}
            onClick={(a) => console.log(a)}
            ref={polyRef}
          /> */}
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
