"use client";
// import ServicesList from "@/app/_components/Services/ServicesList";
import ServicesList from "../../_components/Services/ServicesList";
// import servicesApi from "@/app/_Utils/servicesApi";
import servicesApi from "../../_Utils/servicesApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ServiceBanner from "../_components/ServiceBanner";
import ServiceDetInfo from "../_components/ServiceDetInfo";
import ServiceInfo from "../_components/ServiceInfo";

function ServiceDetail({ params }) {
  const path = usePathname();

  const [serviceDetail, setServiceDetail] = useState({});
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    getServicesById_();
  }, [params?.serviceId]);
  const getServicesById_ = () => {
    servicesApi.getServicesById(params?.serviceId).then((res) => {
      setServiceDetail(res.data);
      getServicesByCategory_(res.data);
    });
  };
  const getServicesByCategory_ = (serivce) => {
    servicesApi
      .getServicesByCategory(serivce?.attributes.Category)
      .then((res) => {
        console.log(res.data);
        setServiceList(res.data);
      });
  };
  return (
    <div className="px-10 py-10 md:px-28 bg-black">
      {/* <Breadcrumb path={path} /> */}
      <div className="mt-10 flex flex-col md:flex-row justify-items-center justify-evenly items-start">
        <div className="bg-black w-480 h-450">
          <ServiceBanner serviceDetail={serviceDetail} />
        </div>
        <ServiceInfo serviceDetail={serviceDetail} />
      </div>

      <ServiceDetInfo serviceDetail={serviceDetail} />
      <div className="mt-16 w-[100%]">
        <p className="text-white mb-5 text-[20px]">Similr Courses</p>
        <ServicesList serviceList={serviceList} />
      </div>
    </div>
  );
}

export default ServiceDetail;
