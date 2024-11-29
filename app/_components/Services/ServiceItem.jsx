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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServiceItem({ service }) {
  const { user } = useUser();
  // const router = useRouter();
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
    const storedItems = JSON.parse(localStorage.getItem("bookedItems") || "[]");
    if (storedItems) {
      setBooked(storedItems);
    }
  }, [setBooked]);

  const handleBooked = () => {
    // Calling toast method by passing string
    toast.error("You Already Booked in");
  };
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
    <div className="bg-[#141717] w-[320px] lg:w-[360px] m-auto p-5 hover:shadow-md overflow-hidden mb-8 rounded">
      {!loading ? (
        <div
          id={service?.id}
          className="group bg-[#141717] w-[260px] sm:w-[320px] md:w-[280px] lg:w-[320px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100"
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
              className="absolute end-4 top-3 z-20 rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition"
            >
              {isBooked ? <Bookmark className="fill-white" /> : <Bookmark />}
            </button>
          )}

          <Image
            src={
              service?.attributes?.image?.data?.attributes?.url ||
              "/fallback.jpg"
            }
            width={300}
            height={200}
            alt={service?.attributes?.name || "Service Image"}
            className="h-56 w-[260px] sm:w-[320px] lg:w-[360px] transition duration-500 group-hover:scale-105"
          />

          <Link href={`/service_details/${service?.id}`}>
            <div className="relative bg-[#141717] p-2 border rounded">
              <h3 className="mt-1.5 text-[12px] lg:text-[15px] text-white line-clamp-1">
                {service?.attributes?.name}
              </h3>
              <p className="mt-1.5 text-[#a1a1a1] text-[13px]">
                By {service?.attributes?.Author}
              </p>
              <p className="text-white mt-4">
                <span className="text-white line-through mr-5">
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
