"use client";
import React, { useEffect, useState } from "react";
import ServicesList from "./ServicesList";
// import servicesApi from "@/app/_Utils/servicesApi";
import servicesApi from "../../_Utils/servicesApi";

function Services() {
  const [serviceList, setServiceList] = useState([]);
  // Fetch the product when the component mounts
  useEffect(() => {
    getService();
  }, []);

  // Define the function to get the product data
  const getService = async () => {
    try {
      // Await the API call to get the latest services
      const response = await servicesApi.getLatestServices();
      setServiceList(response.data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return <ServicesList serviceList={serviceList} />;
}

export default Services;
