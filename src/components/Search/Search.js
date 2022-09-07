import React, { useState } from "react";
import StyledDisplayItems from "./StyledDisplayItems";


function Search({ details }) {
  const [searchField, setSearchField] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);

  const filtered = details.filter((entry) => {
    return entry.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if(e.target.value !="") setSearchTrue(true)
  };

  return (
      <div>
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Search ..."
              onChange={handleChange}
            />
          </div>
         <StyledDisplayItems itemList={filtered} searchTerms={searchTrue} />   
      </div>
  
  );
}

export default Search;

