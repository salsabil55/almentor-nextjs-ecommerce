"use client";
import React, { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import bookMarkApi from "../../_Utils/bookMarkApi";
import { BookMarkContext } from "../../_Context/bookMarkContext";
import SkeletonItem from "../../service_details/_components/skeletonItem";
import useSetup from "../../hooks/useSetup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServiceItem({ service }) {
  const { lng, isDarkMode, t } = useSetup();
  const { user } = useUser();
  const { booked, setBooked } = useContext(BookMarkContext);
  const [loading, setLoading] = useState(true);

  // Check if the service is already booked
  const isBooked = booked.some((bookedItem) => bookedItem.id === service.id);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (service) {
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [service]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on client side
      const storedItems = JSON.parse(
        localStorage.getItem("bookedItems") || "[]"
      );
      setBooked(storedItems);
    }
  }, []); // Runs o

  const handleToggleBook = (item) => {
    const isAlreadyBooked = booked.some(
      (bookedItem) => bookedItem.id === item.id
    );

    if (isAlreadyBooked) {
      // Remove from booked
      const updatedBooked = booked.filter(
        (bookedItem) => bookedItem.id !== item.id
      );
      setBooked(updatedBooked);
      localStorage.setItem("bookedItems", JSON.stringify(updatedBooked));
      toast.error("Item removed from bookmarks!");
    } else {
      // Add to booked
      const updatedBooked = [...booked, item];
      setBooked(updatedBooked);
      localStorage.setItem("bookedItems", JSON.stringify(updatedBooked));
      toast.success("Item added to bookmarks!");
    }
  };

  const notify = () => {
    toast.error("You Must Be Logged in");
  };

  return (
    <div
      className={`w-[360px] lg:w-[360px] m-auto p-5 hover:shadow-md overflow-hidden mb-8 rounded ${
        !isDarkMode ? "bg-[#d1cfcf]" : "bg-[#141717] "
      }`}
    >
      {!loading ? (
        <div
          id={service?.id}
          className="group bg-[#141717] w-[260px] sm:w-[320px] md:w-[280px] lg:w-[300px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          {!user ? (
            <button
              onClick={notify}
              className="absolute end-4 top-3 z-20 rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition"
            >
              <Bookmark />
            </button>
          ) : (
            <button
              onClick={() => handleToggleBook(service)}
              className="absolute end-4 top-3 z-20 border rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition"
            >
              {isBooked ? <Bookmark className="fill-white" /> : <Bookmark />}
            </button>
          )}

          <Image
            src={
              service?.attributes?.image?.data?.attributes?.url ||
              "/fallback.jpg"
            }
            width={280}
            height={200}
            alt={service?.attributes?.name || "Service Image"}
            className="h-56 w-[260px] sm:w-[320px] lg:w-[300px] transition duration-500 group-hover:scale-105"
          />

          <Link href={`/service_details/${service?.id}`}>
            <div
              className={`relative  p-2 border rounded ${
                !isDarkMode ? "bg-[#e5e5e5]" : "bg-[#141717]"
              }`}
            >
              <h3
                className={`mt-1.5 text-[12px] lg:text-[15px] line-clamp-1 ${
                  !isDarkMode ? "text-black font-bold" : "text-white"
                }`}
              >
                {lng === "ar"
                  ? service?.attributes?.name_ar // Display Arabic name for Arabic users
                  : service?.attributes?.name}
              </h3>
              <p
                className={`mt-1.5 text-[13px] line-clamp-1${
                  !isDarkMode ? "text-black" : "text-[#a1a1a1]"
                }`}
              >
                {t("By")}
                <span
                  className={`mr-2 ml-2 ${
                    !isDarkMode ? "text-black" : "text-white"
                  }`}
                >
                  {lng === "ar"
                    ? service?.attributes?.Author_ar // Display Arabic name for Arabic users
                    : service?.attributes?.Author}{" "}
                </span>
              </p>
              <p
                className={`mt-4 ${!isDarkMode ? "text-black" : "text-white"} ${
                  lng === "ar" ? "text-right" : ""
                }`}
                dir={lng === "ar" ? "ltr" : ""}
              >
                <span
                  className={`line-through mr-5 ${
                    !isDarkMode ? "text-black" : "text-white"
                  }`}
                >
                  8000 SAR /mo
                </span>
                {service?.attributes?.price} SAR /mo
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <SkeletonItem />
      )}
    </div>
  );
}

export default ServiceItem;
