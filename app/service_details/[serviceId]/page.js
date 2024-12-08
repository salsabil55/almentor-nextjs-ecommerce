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
import i18n from "../../i18n";
import cookies from "js-cookie";
function ServiceDetail({ params }) {
  const lng = cookies.get("i18next") || "en";
  const [lnges, setlnges] = useState(i18n.language); // Track current language
  const [isChanging, setIsChanging] = useState(false); // Track language change
  const path = usePathname();

  const [serviceDetail, setServiceDetail] = useState({});
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    getServicesById_();
  }, [params?.serviceId, lng]);
  const getServicesById_ = () => {
    servicesApi.getServicesById(params?.serviceId).then((res) => {
      setServiceDetail(res.data);
      console.log(res.data);
      console.log(lng);
    });
  };
  const handleLanguageChange = (language) => {
    setIsChanging(true); // Start animation
    setlnges(language); // Update language state

    setTimeout(() => {
      setIsChanging(false); // End animation
    }, 500); //
  };
  i18n.on("languageChanged", handleLanguageChange); // Listen for language changes

  return (
    <div className="px-10 py-10 md:px-28 bg-black">
      {/* <Breadcrumb path={path} /> */}
      <div className="mt-10 flex flex-col md:flex-row justify-items-center justify-evenly items-start">
        <div className="bg-black w-480 h-450">
          <ServiceBanner serviceDetail={serviceDetail} />
        </div>
        <ServiceInfo serviceDetail={serviceDetail} lng={lng} />
      </div>

      <ServiceDetInfo serviceDetail={serviceDetail} lng={lng} />
    </div>
  );
}

export default ServiceDetail;
