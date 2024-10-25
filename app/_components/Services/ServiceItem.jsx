"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import servicesApi from "../../_Utils/servicesApi";
import bookMarkApi from "../../_Utils/bookMarkApi";
import { BookMarkContext } from "../../_Context/bookMarkContext";

// import { Star } from "lucide-react";
function ServiceItem({ service }) {
  const { user } = useUser();

  const { booked, setBooked } = useContext(BookMarkContext);
  const [bookedColor, setbookedColor] = useState(false);
  const handleAddToBook = (id) => {
    if (!user) {
      router.push("/sign-in");
    } else {
      // Check if the service is already in the cart
      const isServiceInCart = booked.some(
        (item) => item?.service?.id === service?.id
      );

      if (isServiceInCart) {
        alert("This Course is already In BookMark List.");
        return; // Exit the function to prevent adding it again
      }

      const data = {
        data: {
          username: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          services: [service?.id],
        },
      };

      console.log(data);

      // Ensure cartApi.addToCart exists and is a function

      bookMarkApi
        .addToBook(data)
        .then((res) => {
          console.log("cart created successfully", res.data.data);
          console.log(service);
          setbookedColor(true);
          setBooked((oldCart) => [
            ...oldCart,
            {
              id: res?.data?.data?.id,
              ...service, // Spreads all existing properties in `service`
              attributes: {
                // Ensure `booked` is within `attributes` if required
                ...service.attributes,
                booked: true, // Updates only the `booked` attribute
              },
            },
          ]);
          console.log(booked);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <div className="bg-[#141717] w-[full] p-5 hover:shadow-md overflow-hidden mb-8 rounded">
      <div
        id={service?.id}
        className="group bg-[#141717] w-[320px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100"
      >
        {bookedColor && (
          <button
            className="absolute end-4 top-3 z-20 rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition
          "
            onClick={() => handleAddToBook(service?.id)}
          >
            <span className="sr-only">Wishlist</span>

            <BookmarkCheck />
          </button>
        )}
        {!bookedColor && (
          <button
            className="absolute end-4 top-3 z-20 rounded-full bg-[#252a2a] p-1 text-white border-gray-400 transition
          "
            onClick={() => handleAddToBook(service?.id)}
          >
            <span className="sr-only">Wishlist</span>

            <Bookmark />
          </button>
        )}

        <Image
          src={service?.attributes?.image?.data?.attributes?.url}
          width={320}
          height={200}
          alt="Your Image Alt Text"
          className="h-56 object-fit transition duration-500 group-hover:scale-105 sm:h-60"
        />
        <Link href={`/service_details/${service?.id}`}>
          <div className="relative bg-[#141717]  p-2 border rouded">
            <h3 className="mt-1.5 text-[15px] text-white line-clamp-1">
              {service?.attributes?.name}
            </h3>
            <p className="mt-1.5 text-[#a1a1a1] text-[13px]">
              By {service?.attributes?.Author}
            </p>

            <p className="text-white mt-4">
              <span className="text-white line-through mr-5">
                {" "}
                8000 SAR /mo
              </span>
              {service?.attributes?.price} SAR /mo
            </p>
            {/* <p className="mt-1.5 line-clamp-2 text-white overflow-hidden h-[50px]">
              {service?.attributes?.description[0]?.children[0].text}
            </p> */}
            {/* 
            <form className="mt-4 flex gap-4 ">
              <button className=" block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                Add to Cart
              </button>

              <button
                type="button"
                className="block w-full rounded bg-[#bd2130] px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Buy Now
              </button>
            </form> */}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ServiceItem;
