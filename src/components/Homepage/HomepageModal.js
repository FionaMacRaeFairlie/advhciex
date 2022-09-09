import React, { useState } from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PieChart from "../Chart/Chart";
import "./styles/modalStyle.scss";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import {
//   useGetHostelByIdQuery,
//   usePostRateMutation,
//   usePostReviewMutation,
//   useGetAllHostelsQuery,
// } from "../../reduxStore/RTKfetch/apiSlice";

function HomepageModal(props) {
console.log("props :",props)

  const calcAvg = (elmt) => {
    var sum = 0;
    for (var i = 0; i < elmt.length; i++) {
      sum += parseInt(elmt[i], 10);
    }

    var avg = sum / elmt.length;
    var fixed = avg.toFixed(1)
    return fixed;
  };

  // const [showReviews, setShowReviews] = useState(false);
  const [init, setInit] = useState(true);
  // const [showWriteReview, setShowWriteReview] = useState(false);
  // const [showRate, setShowRate] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const user = useSelector((state) => state.login.verifyUser.user);

  // const [postReview, { isSuccess, status, isLoading }] =     usePostReviewMutation();

  // const { data, error, refetch } = useGetHostelByIdQuery(props.data.id);
  let ratings = props.data.ratings;

  // const [postRate] = usePostRateMutation();

  // const { refetch: allHostelRefetch } = useGetAllHostelsQuery();
  // useEffect(() => {
  //   console.log(data);
  // });

  // const onSubmit = (formData) => {
  //   let dataToSubmit = {
  //     hostelId: props.data.id,
  //     name: user.personalInfo.name,
  //     description: formData.WriteReview,
  //   };
  //   postReview(dataToSubmit);
  //   props.onHide();
  // };

  // const onSubmitRate = (formData) => {
  //   postRate({ hostelId: props.data.id, rate: formData.hostelRate });
  //   allHostelRefetch();
  //   props.onHide();
  // };

  const initState = () => {
    return (
      <div className="modalBodyWrap">
        <span>
          <strong>Address:</strong> {props.data.address}
        </span>
        <span>
          <strong>Post code:</strong> {props.data.postcode}
        </span>
        <span>
          <strong>Phone:</strong> {props.data.phone}
        </span>
        <span>
          <strong>Mail:</strong> {props.data.mail}
        </span>
        <span>
          <strong>Description:</strong> {props.data.description}
        </span>
        <span>
          <strong>Average rating:</strong> {calcAvg(ratings)}
        </span>
        <span>
          <strong>Total ratings:</strong> {ratings.length}
        </span>
        <br />
        <strong style={{ textAlign: "center" }}>
          Total ratings distribution:
        </strong>

        <PieChart data={props.data.ratings}></PieChart>
      </div>
    );
  };

  // const reviews = (d) => {
  //   return d[0].reviews.map((key, val) => {
  //     return (
  //       <div key={val} className="reviewContainer">
  //         <div className="reviewWrap">
  //           <span>Name: {key.reviewer}</span>
  //           <span>Description: {key.review}</span>
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  // const WriteReview = () => {
  //   return (
  //     <form className="writeReviewForm">
  //       <FloatingLabel controlId="writeReviewTextArea" label="WriteReview">
  //         <Form.Control
  //           as="textarea"
  //           placeholder="Write here your review"
  //           style={{ height: "100%" }}
  //           {...register("WriteReview", { required: true })}
  //         />
  //       </FloatingLabel>
  //       {errors.WriteReview?.type === "required" && (
  //         <span className="errors">Please write your review</span>
  //       )}
  //     </form>
  //   );
  // };

  // const RateHostel = () => {
  //   return (
  //     <form>
  //       {["radio"].map((type) => (
  //         <div key={`inline-${type}`} className="mb-3">
  //           <Form.Check
  //             inline
  //             label="1"
  //             name="group1"
  //             type={type}
  //             id={`inline-${type}-1`}
  //             {...register("hostelRate", { required: true })}
  //             value="1"
  //           />
  //           <Form.Check
  //             inline
  //             label="2"
  //             name="group1"
  //             type={type}
  //             id={`inline-${type}-2`}
  //             {...register("hostelRate", { required: true })}
  //             value="2"
  //           />
  //           <Form.Check
  //             inline
  //             label="3"
  //             name="group1"
  //             type={type}
  //             id={`inline-${type}-3`}
  //             {...register("hostelRate", { required: true })}
  //             value="3"
  //           />
  //           <Form.Check
  //             inline
  //             label="4"
  //             name="group1"
  //             type={type}
  //             id={`inline-${type}-4`}
  //             {...register("hostelRate", { required: true })}
  //             value="4"
  //           />
  //           <Form.Check
  //             inline
  //             label="5"
  //             name="group1"
  //             type={type}
  //             id={`inline-${type}-5`}
  //             {...register("hostelRate", { required: true })}
  //             value="5"
  //           />
  //           <br />
  //           {errors.hostelRate?.type === "required" && (
  //             <span className="errors">Please select an option</span>
  //           )}
  //         </div>
  //       ))}
  //     </form>
  //   );
  // };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.data.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {init &&  */}
        {initState()}

          {/* {showReviews && reviews(data)}

          {showWriteReview && <WriteReview />}

          {showRate && <RateHostel />} */}
        </Modal.Body>
        {/* <Modal.Footer>
          {init && (
            <>
              <Button
                className="primButton"
                onClick={() => {
                  setInit(false);
                  setShowReviews(true);
                  refetch();
                }}
              >
                View reviews
              </Button>

              <Button
                className="primButton"
                onClick={() => {
                  setShowRate(true);
                  setInit(false);
                }}
              >
                Rate this hostel
              </Button>
            </>
          )}

          {!showWriteReview && (
            <Button
              className="primButton"
              onClick={() => {
                setShowWriteReview(true);
                setShowReviews(false);
                setInit(false);
                setShowRate(false);
              }}
            >
              Write a review
            </Button>
          )}

          {showWriteReview && (
            <Button
              className="primButton"
              onClick={handleSubmit((formData) => onSubmit(formData))}
              type="submit"
            >
              Post Review
            </Button>
          )}

          {showRate && (
            <Button
              className="primButton"
              onClick={handleSubmit((formData) => onSubmitRate(formData))}
              type="submit"
            >
              Post your rating
            </Button>
          )}
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default HomepageModal;
