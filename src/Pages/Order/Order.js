import { async } from "@firebase/util";
import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import AxiosPrivet from "../../Api/AxiosPrivet";
import auth from "../../firebace.init";

const Order = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrder = async () => {
      const email = user.email;
      const url = `https://agile-crag-49954.herokuapp.com/order?email=${email}`;
      try {
        const { data } = await AxiosPrivet.get(url, {});
        setOrders(data);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getOrder();
  }, [user]);
  return (
    <div>
      <h1>Order {orders.length}</h1>
    </div>
  );
};

export default Order;
