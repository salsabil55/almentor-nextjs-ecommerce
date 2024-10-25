import React, { Fragment } from "react";
import ServiceItem from "./ServiceItem";

function ServicesList({ serviceList }) {
  return (
    <Fragment>
      {/* <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 p-10"> */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 p-10">
        {serviceList.map((list) => (
          <ServiceItem service={list} key={list.id} />
        ))}
      </div>
    </Fragment>
  );
}

export default ServicesList;
