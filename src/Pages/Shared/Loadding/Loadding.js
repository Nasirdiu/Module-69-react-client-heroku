import React from "react";
import { Spinner } from "react-bootstrap";

const Loadding = () => {
  return (
    <div
      style={{ height: "300px" }}
      className="w-100 d-flex justify-content-center align-item-center"
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loadding;
