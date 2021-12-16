import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { render } from "react-dom";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/register.scss";
import "./style/common.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useRegisterMutMutation } from "../../reduxStore/RTKfetch/apiSlice";

const Register = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errors);
  }, []);

  const [registerMut] = useRegisterMutMutation();

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit((data) => {
      registerMut(data);
    })(e);
    history.push("/login");
  };
  return (
    <Container>
      <Row className="row">
        <Col>
          <div className="formContainer">
            <h2>Register here to set up your account</h2>
            <form>
              <FloatingLabel
                controlId="floatingName"
                label="FirstName"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mark"
                  {...register("firstName", {
                    required: true,
                  })}
                />
              </FloatingLabel>
              {errors.firstName?.type === "required" && (
                <span className="errors">First name is required</span>
              )}
              <FloatingLabel
                controlId="floatingSurname"
                label="Surname"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Maye"
                  {...register("surname", { required: true })}
                />
              </FloatingLabel>
              {errors.surname?.type === "required" && (
                <span className="errors">Surname is required</span>
              )}
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
                <span className="errors">
                  Please choose a username for your account
                </span>
              )}
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </FloatingLabel>
              {errors.password?.type === "required" && (
                <span className="errors">
                  Please choose a password for your account
                </span>
              )}
              <br />
              <Button
                className="primButton"
                type="submit"
                onClick={(event) => {
                  onSubmit(event);
                }}
              >
                Start Now
              </Button>
            </form>
            <div className="endLink">
              If you have already registered please login{" "}
              <Link to="/login">here.</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
