import React, { useState, useEffect, Fragment } from "react";
import ServiceItem from "./ServiceItem";
import Link from "next/link";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

function ServicesList({ serviceList }) {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");

    // Event listener for changes to sessionStorage
    const handleStorageChange = () => {
      const updatedTheme = sessionStorage.getItem("theme");
      setIsDarkMode(updatedTheme === "dark");
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <Fragment>
      <div className="mt-10 p-10 flex justify-center">
        <h2 className="text-center text-3xl lg:text-4xl font-bold tracking-tight text-white-900  dark:text-white light:text-black">
          {t("Explore inspiring courses online")}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 p-2 lg:p-10">
        {serviceList.map((list) => (
          <ServiceItem service={list} key={list.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className={`border text-white pl-7 pr-7 pt-3 pb-3 rounded shadow-lg ${
            !isDarkMode ? "bg-[#bd2130]" : ""
          }`}
        >
          <Link href="/courses">{t("See All Courses")}</Link>
        </button>
      </div>
    </Fragment>
  );
}

export default ServicesList;
