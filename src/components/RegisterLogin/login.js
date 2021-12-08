import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/register.scss";
import "./style/common.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth, verifyUser } from "../../reduxStore/slices/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  dataApi,
  useAuthMutation,
  useGetAllHostelsQuery,
  useGetAuthorizationQuery,
} from "../../reduxStore/RTKfetch/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
const Login = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  //const [auth, { isSuccess, status, data, isLoading }] = useAuthMutation();
  const [skipT, setSkip] = useState(true);
  const [toBeValidated, setTobeValidated] = useState();

  const { data, error, isLoading, isSuccess, refetch } =
    useGetAuthorizationQuery(toBeValidated);

  useEffect(() => {}, [toBeValidated]);
  const onSubmit = (formData) => {
    //  console.log(formData);
    // auth({ username: formData.username, password: formData.password });

    // console.log(data, isSuccess, status, isLoading);

    // if (status === "uninitialized" || data === undefined) {
    //   // auth({ username: formData.username, password: formData.password });
    //   console.log("uninitialised");
    //   console.log(data);
    // }

    // if (data.success == true) {
    //   //set user in redux store to retreive it and navigate to dashboard
    //   dispatch(verifyUser(data));
    //   history.push("/homepage");
    // }
    setTobeValidated({
      username: formData.username,
      password: formData.password,
    });
    //setSkip(false);
    //refetch();

    console.log(data, error, isLoading, isSuccess);

    {
      isLoading && console.log("loading");
    }
    {
      error && console.log(error.message);
    }
    {
      isSuccess && data.success && console.log("query data", data);
    }

    if (data.success) {
      //set user in redux store to retreive it and navigate to dashboard
      dispatch(verifyUser(data));
      history.push("/homepage");
    }
  };
  return (
    <Container>
      <Row className="row">
        <Col>
          <div className="formContainer">
            <h2>Login in here to enter your dashboard</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel
                controlId="floatingInput"
                label="username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="beer123"
                  {...register("username", { required: true })}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </FloatingLabel>

              <Button className="primButton" type="submit">
                Start Now
              </Button>
            </form>
            <div className="endLink">
              If you dont have an account please register{" "}
              <Link to="/register">here.</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
