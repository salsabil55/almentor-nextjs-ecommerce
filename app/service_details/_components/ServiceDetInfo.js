import React from "react";
import {
  Calendar,
  Columns2,
  Globe,
  CircleUserRound,
  Clock,
} from "lucide-react";
import ServiceInfo from "./ServiceInfo";
import Image from "next/image";

function ServiceDetInfo({ serviceDetail }) {
  const dateTimeString = serviceDetail?.attributes?.publishedAt;
  const dateObject = new Date(dateTimeString);

  // Extract date components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = dateObject.getDate().toString().padStart(2, "0");

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div className="">
        <div className="">
          <p className="text-white text-[30px] font-bold">Course details</p>
          <div className="text-white flex mt-3">
            <CircleUserRound className="w-5 mr-2" />
            <span className="mr-2">Author : </span>
            <h2 className="text-[18px] text-blue-600">
              {serviceDetail?.attributes?.Author}
            </h2>
          </div>
          <div className="text-white flex mt-3">
            <Globe className="w-4 mr-2" />
            <span className="mr-2">Course Language : </span>
            <h2 className="text-[18px]">
              {serviceDetail?.attributes?.courseLanguage}
            </h2>
          </div>
          <div className="text-white flex mt-3">
            <Clock className="w-4 mr-2" />
            <span>Duration :</span>
            {serviceDetail?.attributes?.Duration}
          </div>

          <div className="text-white flex mt-3">
            <Calendar className="w-4 mr-2" />
            <span className="mr-2">Published At : </span>
            <h2 className="text-[18px]">{`${year}-${month}-${day}`}</h2>
          </div>
          <div className="text-white flex mt-3">
            <Columns2 className="w-4 mr-2" />
            <span className="mr-2">Categories : </span>
            <h2 className="text-[18px]">
              {serviceDetail?.attributes?.Category}
            </h2>
          </div>
        </div>

        <div className=" mt-16 w-[90%]">
          <p className="text-white text-[30px] font-bold">About this course</p>
          <p className="mt-1.5 line-clamp-4 text-white ">
            {serviceDetail?.attributes?.description[0]?.children[0].text}
          </p>
        </div>
      </div>
      {/* <ServiceInfo serviceDetail={serviceDetail} />
       */}
      <div className="flex items-end text-right border-stone-400 border rounded ml-10 p-5 shadow-lg shadow-[#001c25] mr-12">
        <Image
          src="https://res.cloudinary.com/dahptqhed/image/upload/v1729165362/poster2_bdb5cf59cc.jpg"
          width={500}
          height={450}
          className="object-cover"
          alt="course info"
        ></Image>
      </div>
    </div>
  );
}

export default ServiceDetInfo;
