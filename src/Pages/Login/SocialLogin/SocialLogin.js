import React from "react";
import google from "../../../images/google.jpg";
import facebook from "../../../images/fb.jpg";
import github from "../../../images/ggg.png";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebace.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loadding from "../../Shared/Loadding/Loadding";
const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  if (user || user1) {
    navigate(from, { replace: true });
  }

  let errorElement;
  if (error || error1) {
    errorElement = (
      <div>
        <p className="text-danger">
          Error: {error?.message} {error1?.message}
        </p>
      </div>
    );
  }
  if (loading || loading1) {
    return <Loadding></Loadding>;
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-info w-50"></div>
        <p className="m-2 px-2">Or</p>
        <div style={{ height: "1px" }} className="bg-info w-50"></div>
      </div>
      {errorElement}
      <div>
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-info w-50 d-block mx-auto  my-2"
        >
          <img style={{ width: "24px" }} src={google} alt="" />
          <span className="px-2">Google Sing in</span>
        </button>
      </div>
      <div>
        <button className="btn btn-info w-50 d-block mx-auto  my-2">
          <img style={{ width: "24px" }} src={facebook} alt="" />
          <span className="px-2">Facebook Sing in</span>
        </button>
      </div>
      <div>
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-info w-50 d-block mx-auto"
        >
          <img style={{ width: "24px" }} src={github} alt="" />
          <span className="px-2">github Sing in</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
