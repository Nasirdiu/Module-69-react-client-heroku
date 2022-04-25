import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import auth from "../../../firebace.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Form } from "react-bootstrap";
import { async } from "@firebase/util";
import Loadding from "../../Shared/Loadding/Loadding";
const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const navigate = useNavigate();
  if (loading ) {
    return <Loadding></Loadding>;
  }
  const handleneagtive = () => {
    navigate(`/register`);
  };
  if (user) {
    console.log(user);
  }
  const handleFrom = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    navigate("/home");
  };
  return (
    <div className="register-from">
      <h1 className="text-center text-info mt-3">This is a Register</h1>

      <form onSubmit={handleFrom}>
        <input type="text" name="name" id="" placeholder="your name" required />
        <input
          type="email"
          name="email"
          id=""
          placeholder="your email"
          required
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="your password"
          required
        />
        <input
          onClick={() => setAgree(!agree)}
          type="checkbox"
          name="terms"
          id=""
        />
        {/* <label className={agree ?'ps-2' :'ps-2 text-danger'} htmlFor="terms"> Accept Car Service</label> */}
        <label
          className={agree ? "ps-2 text-primary" : "ps-2 text-danger"}
          htmlFor="terms"
        >
          {" "}
          Accept Car Service
        </label>
        <input
          disabled={!agree}
          className="w-50 mx-auto d-block btn btn-primary"
          type="submit"
          value="Register"
        />
      </form>
      <p>
        All Ready Have And Account And Login?
        <Link
          to="/login"
          onClick={handleneagtive}
          className="text-danger  text-decoration-none"
        >
          Login Now
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
