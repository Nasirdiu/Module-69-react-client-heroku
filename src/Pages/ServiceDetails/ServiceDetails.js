import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useServiceDetails";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service]=useServiceDetails(serviceId)
  return (
    <div>
      <h1> Service Details:-{service.name}</h1>
      <div className="text-center">
        <Link to={`/cheekout/${serviceId}`}>
          <button className="btn btn-info">cheek out</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetails;
