import React from "react";
import Accordion from "react-bootstrap/Accordion";

const StyledItem = ({ item }) => {
  return (
    <>
      <div>
        <Accordion.Header>{item.name}</Accordion.Header>
        <Accordion.Body  >
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.address}</p>
        </Accordion.Body>
      </div>
    </>
  );
};

export default StyledItem;
