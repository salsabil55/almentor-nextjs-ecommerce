import React, { Fragment } from "react";
import ServiceItem from "./ServiceItem";
import Link from "next/link";

import Courses from "../../courses/page";

function ServicesList({ serviceList }) {
  return (
    <Fragment>
      {/* <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 p-10"> */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 p-2 lg:p-10">
        {serviceList.map((list) => (
          <ServiceItem service={list} key={list.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="border text-white pl-7 pr-7 pt-3 pb-3 rounded shadow-lg">
          {" "}
          <Link href="/courses">See All Courses</Link>
        </button>
      </div>
    </Fragment>
  );
}

export default ServicesList;
