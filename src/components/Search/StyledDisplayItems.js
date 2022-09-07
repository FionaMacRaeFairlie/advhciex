import React from "react";
import Accordion from "react-bootstrap/Accordion";
import StyledItem from "./StyledItem";

const StyledDisplayItems = ({ itemList,searchTerms }) => {

  return (
    <Accordion style={{width:100+'%'}}>
      {itemList.map((item, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <StyledItem item={item} searchTerms={searchTerms} />
          </Accordion.Item>
        );
      })}
    </Accordion>

  );
};

export default StyledDisplayItems;
