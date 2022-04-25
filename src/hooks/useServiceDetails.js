import { useEffect, useState } from "react";

const useServiceDetails = (serviceId) => {
  const [serices, setServices] = useState({});
  useEffect(() => {
    const url = `https://agile-crag-49954.herokuapp.com/service/${serviceId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [serviceId]);
  return [serices];
};

export default useServiceDetails;
