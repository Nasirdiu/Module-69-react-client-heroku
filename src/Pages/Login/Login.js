import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebace.init";
import Loadding from "../Shared/Loadding/Loadding";
import SocialLogin from "./SocialLogin/SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../Shared/PageTitle/PageTitle";
import axios from "axios";
import useToken from "../../hooks/useToken";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const navigate = useNavigate();

  const [token] = useToken(user);

  let errorElement;
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const handleFrom = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);
  };

  const handleneagtive = () => {
    navigate(`/register`);
  };

  const restPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("Enter Your Mail Address");
    }
  };
  if (loading) {
    return <Loadding></Loadding>;
  }

  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div className="container w-50 mx-auto">
      <PageTitle title="Login"></PageTitle>
      <h1 className="text-center text-info">Please Login</h1>
      <Form onSubmit={handleFrom}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p>
          Rest Password?
          <Link
            to=""
            onClick={restPassword}
            className="text-danger  text-decoration-none"
          >
            Rest Password
          </Link>
        </p>
        <Button
          className="w-50 mx-auto d-block"
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
      {errorElement}
      <p>
        This is a register?
        <Link
          to="/register"
          onClick={handleneagtive}
          className="text-danger  text-decoration-none"
        >
          Register Now
        </Link>
      </p>

      <SocialLogin></SocialLogin>
      <ToastContainer />
    </div>
  );
};

export default Login;
