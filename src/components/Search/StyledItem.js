import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import HomepageModal from "../Homepage/HomepageModal";

const StyledItem = ({ item, searchTerms }) => {
  const [isShowing,setShowing]= useState(false);
  return (
    <>
      <div>
        <Accordion.Header>{item.name}</Accordion.Header>
        <Accordion.Body  onClick={() => setShowing(true)} >
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.address}</p>
        </Accordion.Body>
      </div>
     {/* {searchTerms && <HomepageModal
        show={isShowing}
        onHide={() => setShowing(false)}
        data={item}
      ></HomepageModal>}
      {console.log("searchTerms :",searchTerms)} */}
    </>
  );
};

export default StyledItem;
