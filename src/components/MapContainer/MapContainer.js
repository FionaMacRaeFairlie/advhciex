import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import HomepageModal from "../Homepage/HomepageModal";

const MapContainer = (props) => {
  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }
  const [isShowing,setShowing]= useState(true);

const locations=props.data;

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 57.329341, lng: -4.471393
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyB0HrMLMkZNJ0NnlrlZNfjnMZlCyTWFpEI'>
       <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={8}
          center={defaultCenter}>
 {
            locations.map(item => {
              console.log(" item :",item.name)
              console.log(" item location:",item.location)
              return (
               
              <Marker key={item.name} 
                position={item.location}
                onClick={() => onSelect(item)}
              />
              )
            })
         }
        {
            selected.location && 
            (<>
              {/* <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
             */}
            <HomepageModal
        show={isShowing}
        // onHide={() => setShowing(false)}
        onHide={() => setSelected({})}
        data={selected}
      ></HomepageModal>
            </>
            )
         }
     </GoogleMap>
     </LoadScript>
     
  )
}
export default MapContainer;