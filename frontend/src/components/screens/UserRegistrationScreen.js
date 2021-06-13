import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../ui/Message";
import LoadingSpinner from "../ui/LoadingSpinner";
import FormContainer from "../ui/FormContainer";
import { register } from "../../actions/userActions";
import { validateEmail } from "../../util";

const UserRegistrationScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);

  const isEnteredNameInvalid = name.trim() === "" && isNameTouched;
  const isEnteredEmailInvalid = !validateEmail(email) && isEmailTouched;
  const isEnteredPasswordInvalid = password.length < 6 && isPasswordTouched;
  const isEnteredConfirmPasswordInvalid =
    confirmPassword !== password && isConfirmPasswordTouched;

  //Form validation

  let isFormValid = false;
  if (
    !isEnteredNameInvalid &&
    !isEnteredEmailInvalid &&
    !isEnteredPasswordInvalid &&
    !isEnteredConfirmPasswordInvalid
  ) {
    isFormValid = true;
  }

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Form is not valid. Please fill in correct information.");
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <LoadingSpinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          {/* Full name field */}
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className={`${isEnteredNameInvalid && "is-invalid"}`}
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsNameTouched(true)}
          ></Form.Control>
          {isEnteredNameInvalid && (
            <div className="invalid-feedback">Name cannot be empty.</div>
          )}
        </Form.Group>
        {/* Email field */}
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className={`${isEnteredEmailInvalid && "is-invalid"}`}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsEmailTouched(true)}
          ></Form.Control>
          {isEnteredEmailInvalid && (
            <div className="invalid-feedback">Entered email is invalid.</div>
          )}
        </Form.Group>
        {/* Password field */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={`${isEnteredPasswordInvalid && "is-invalid"}`}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsPasswordTouched(true)}
          ></Form.Control>
          {isEnteredPasswordInvalid && (
            <div className="invalid-feedback">
              Password must be minimum of 6 characters.
            </div>
          )}
        </Form.Group>
        {/* Confirm password field */}
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={`${isEnteredConfirmPasswordInvalid && "is-invalid"}`}
            type="password"
            placeholder="Re-type password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setIsConfirmPasswordTouched(true)}
          ></Form.Control>
          {isEnteredConfirmPasswordInvalid && (
            <div className="invalid-feedback">Passwords do not match.</div>
          )}
        </Form.Group>
        <hr />
        <Button type="submit" variant="primary" disabled={!isFormValid}>
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default UserRegistrationScreen;
