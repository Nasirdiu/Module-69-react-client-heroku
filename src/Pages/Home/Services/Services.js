import React, { useEffect, useState } from "react";
import "./Services.css";
import repair1 from "../../../images/reper1.jpg";
import Service from "../Home/Service/Service";
const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`https://agile-crag-49954.herokuapp.com/service`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div id="services" className="container">
      <h1 className="services-title mt-5">Our Services</h1>
      <div className="servies-container">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
