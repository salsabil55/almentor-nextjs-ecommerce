"use client";
import React, { useContext } from "react";
import {
  ShoppingCart,
  CircleOff,
  TicketPercent,
  Globe,
  Clock,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import SkeletonInfo from "./SkeletonInfo";
import cartApi from "../../_Utils/cartApi";
import { CartContext } from "../../_Context/cartContext";
function ServiceInfo({ serviceDetail }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      // Check if the service is already in the cart
      const isServiceInCart = cart.some(
        (item) => item?.serviceDetail?.id === serviceDetail?.id
      );

      if (isServiceInCart) {
        alert("This Course is already added to your cart.");
        return; // Exit the function to prevent adding it again
      }

      const data = {
        data: {
          username: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          services: [serviceDetail?.id],
        },
      };

      console.log(data);

      // Ensure cartApi.addToCart exists and is a function
      cartApi
        .addToCart(data)
        .then((res) => {
          console.log("cart created successfully", res.data.data);
          console.log(serviceDetail);
          setCart((oldCart) => [
            ...oldCart,
            {
              id: res?.data?.data?.id,
              serviceDetail,
            },
          ]);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <>
      <div className="">
        <div className="flex-wrap lg:h-screen">
          {serviceDetail?.id ? (
            <div className="bg-[#0c0e0e] text-white rounded p-6 ml-12 mb-7 border-stone-400 border  shadow-lg shadow-[#001c25]">
              <h2 className="text-[22px] mb-6">
                {serviceDetail?.attributes?.name}
              </h2>

              {/* <h2 className="text-[15px] mt-5">
            {serviceDetail?.attributes?.description[0]?.children[0].text}
          </h2> */}
              <p className="flex text-blue-600 mb-2">
                <span className="text-white mr-3">By : </span>
                {serviceDetail?.attributes?.Author}
              </p>
              <p className="flex mb-2">
                <Clock className="w-4 mr-3" />
                <span>Duration :</span>
                {serviceDetail?.attributes?.Duration}
              </p>
              <p className="flex mb-2">
                <Globe className="w-4 mr-3" /> Course Language :{" "}
                {serviceDetail?.attributes?.courseLanguage}
              </p>
              <h2 className="text-white-500 text-[15px] flex-col items-center gap-2">
                {serviceDetail?.attributes?.AvailableDiscount ? (
                  <>
                    <div className="flex">
                      <TicketPercent className="text-white-700 text-[15px] w-4" />
                      <p className="ml-3">Available Discount Now</p>
                    </div>
                    <div className="coupon flex-col block">
                      <input
                        className="coupon-text mt-3 border bg-[#e2e8f01a] w-[100%] text-center border-solid rounded pl-10 pr-10 h-11 text-[12px] border-gray-200"
                        type="text"
                        placeholder="Enter Your Coupoun code"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <CircleOff className="w-3" />
                    <p className="ml-3">Not Available Discount Now</p>
                  </div>
                )}
              </h2>
              <h2 className="text-[15px] text-white-950 mt-7 mb-9">
                <span className="text-gray-500">
                  Get access to all courses only for{" "}
                  {serviceDetail?.attributes?.price} SAR /mo
                </span>{" "}
              </h2>
              <button
                onClick={() => handleAddToCart()}
                className="flex gap-2 mb-9 justify-center items-center text-center text-[13px] bg-[#eb2027] rounded-lg text-white w-[100%] pt-2 pb-2"
              >
                <ShoppingCart className="w-4" />
                Subscribe Now
              </button>
            </div>
          ) : (
            <SkeletonInfo />
          )}
        </div>
      </div>
    </>
  );
}

export default ServiceInfo;
