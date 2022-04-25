import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useServiceDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebace.init";
import axios from "axios";

const CheekOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user] = useAuthState(auth);
  /*   const [user, setUser] = useState({
    name: "Hero Alom",
    email: "hero@gmail.com",
    address: "Bogra sador",
    phone: "0171111111",
  });
  const handlerAddress = (e) => {
    const { address, ...rest } = user;
    const newAddress = e.target.value;
    const newUser = { address: newAddress, ...rest };
    setUser(newUser);
  }; */

  const handleOderSubmit = (e) => {
    e.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };
    axios
      .post("https://agile-crag-49954.herokuapp.com/order", order)
      .then((res) => {
        const { data } = res;
        if (data.insertedId) {
          alert("Your Order Is Success!!");
          e.target.reset();
        }
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h1>Please Order :{service.name}</h1>
      <form onSubmit={handleOderSubmit}>
        <input
          className="w-100 mb-2"
          type="text"
          value={user?.displayName}
          name="name"
          placeholder="name"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          value={user?.email}
          name="email"
          placeholder="email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          value={service.name}
          name="service"
          placeholder="service"
          readOnly
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          placeholder="address"
          autoComplete="off"
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          placeholder="phone"
          autoComplete="off"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="please Order" />
      </form>
    </div>
  );
};

export default CheekOut;
