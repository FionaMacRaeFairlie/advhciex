import React, { useState } from "react";
import StyledDisplayItems from "./StyledDisplayItems";

function Search({ details }) {
  const [searchField, setSearchField] = useState("");

  const filtered = details.filter((entry) => {
    return entry.cafe=="true";
  });

   return (
      <div>
          <div>
            <h3>Hostels with cafe onsite</h3>
          </div>
         <StyledDisplayItems itemList={filtered} />   
      </div>
  
  );
}

export default Search;

