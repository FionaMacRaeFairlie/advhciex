import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { render } from "react-dom";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/register.scss";
import "./style/common.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  // useEffect(() => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       mail: "yhis@email.com",
  //       password: "1234",
  //       name: "gigi",
  //       surname: "latrottola",
  //     }),
  //   };
  //   fetch("/api/register", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => this.setState({ postId: data.id }));
  // }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        name: data.firstName,
        surname: data.surname,
      }),
    };
    fetch("/register", requestOptions).then(() => {});
    //  .then((response) => response.json())
    // .then((data) => this.setState({ postId: data.id }));
    history.push("/login");
  };
  return (
    <Container>
      <Row className="row">
        <Col>
          <div className="formContainer">
            <h2>Register here to set up your account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel
                controlId="floatingName"
                label="FirstName"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mark"
                  {...register("firstName", { required: true })}
                />
              </FloatingLabel>

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
