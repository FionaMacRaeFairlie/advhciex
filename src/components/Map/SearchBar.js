import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import HomepageModal from "../Homepage/HomepageModal";
import SearchModal from "../Homepage/searchModal";
import "./styles/barStyle.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const SearchBar = (dataToFilter) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  //const [query, setQueryData] = useState();
  //const { data, error, isLoading, isSuccess, isUninitialized } = useGetHostelSearchQuery(query);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [showHostelModal, setShowHostelModal] = useState(false);

  const searchedHostel = useSelector((state) => state.hostels.data);

  const onSubmit = (formData) => {
    console.log(formData);
    console.log("hey bar click");
    console.log("bar comp hostel", searchedHostel);
    // useGetHostelSearchQuery(formData.searchBar);
    // console.log(data, isLoading, error, isSuccess, isUninitialized);
    //MANUALLY FETCHING COUSE HOOK INVALID IN FUNCTION NEED TO SOLVE THIS
    fetch("/hostels/search/" + formData.searchBar)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModalData(data);
        setShowModal(true);
      });
  };

  useEffect(() => {
    console.log("bar comp hostel", searchedHostel);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="searchForm">
        <Row className="barRow">
          <Col>
            <FloatingLabel controlId="searchBar" label="search an hostel!">
              <Form.Control
                type="text"
                placeholder="Search.."
                {...register("searchBar", { required: true })}
              />
            </FloatingLabel>
          </Col>
          <Col xs lg="2">
            <Button className="primButton" type="submit">
              search
            </Button>
          </Col>
        </Row>
      </form>
      {showModal && (
        <SearchModal
          show={showModal}
          onHide={() => setShowModal(false)}
          //btnClick={()=>{}}
          data={modalData}
          title={"The following hostels were found!"}
        ></SearchModal>
      )}
    </div>
  );
};

export default SearchBar;