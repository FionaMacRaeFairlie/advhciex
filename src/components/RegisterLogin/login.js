import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/register.scss";
import "./style/common.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllHostelsQuery,
  useGetAuthorizationQuery,
  useLazyGetAuthorizationQuery,
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

  const [toBeValidated, setTobeValidated] = useState();

  const { data, error, isLoading, isSuccess, refetch } =
    useGetAuthorizationQuery(toBeValidated, {
      refetchOnMountOrArgChange: true,
    });

  const [trigger] = useLazyGetAuthorizationQuery();

  const user = useSelector((state) => state.login.verifyUser);

  const { data: hostelsData } = useGetAllHostelsQuery();

  useEffect(() => {
    if (user.success) {
      history.push("/homepage");
    }
  }, [user]);
  const onSubmit = (formData) => {
    setTobeValidated({
      username: formData.username,
      password: formData.password,
    });

    //  trigger(toBeValidated);
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
              {errors.username?.type === "required" && (
                <span className="errors">Please enter your username</span>
              )}

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </FloatingLabel>
              {errors.password?.type === "required" && (
                <span className="errors">Please enter your password</span>
              )}
              <br />
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
