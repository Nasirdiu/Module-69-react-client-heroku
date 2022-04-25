import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebace.init";
import Loadding from "../../Shared/Loadding/Loadding";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequireAuth = ({ children }) => {
  const [user, loadding] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  if (loadding) {
    return <Loadding></Loadding>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Your Email Is Not Verified</h3>
        <p className="text-success">Please Verified Your Email address</p>

        <button
          className="btn btn-info"
          onClick={async () => {
            await sendEmailVerification();
            toast("Sent email");
          }}
        >
          Verify email
        </button>
        <ToastContainer />
      </div>
    );
  }
  return children;
};

export default RequireAuth;
