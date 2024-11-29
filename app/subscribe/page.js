"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const { user } = useUser();

  const getTotalAmount = () => {
    let totalAmount = 1000;

    return totalAmount;
  };

  return (
    <>
      <div className="flex m-2 lg:m-10 items-center justify-center flex-col">
        <h2 className="text-white text-[28px] font-bold">Invest in yourself</h2>
      </div>
      <div className="flex justify-between w-[80%] m-[auto] items-center text-center max-[767px]:flex-wrap">
        <div className="text-white m-2 lg:m-10 p-8 bg-[#1e21214d] shadow-lg rounded">
          <h2 className="text-white text-[25px] font-bold text-center mb-3">
            Monthly Plan
          </h2>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>More than 1,000 video
            courses in Arabic.
          </p>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>
            Taught by renowned experts in the Arab world.
          </p>
          <div className="border rounded text-center p-4 mt-5">
            <p>89 SAR/month</p>
            <p>Charged monthly</p>
          </div>
          {!user && (
            <Link href="/sign-up">
              <button className="mt-6 border hover:bg-[#bd2130] text-white rounded p-3">
                Subscribe Now
              </button>
            </Link>
          )}
          {user && (
            <button
              onClick={() =>
                router.push(`/checkout?amount=${getTotalAmount()}`)
              }
              className="mt-6 border hover:bg-[#bd2130] text-white rounded p-3"
            >
              Subscribe Now
            </button>
          )}
        </div>

        <div className="text-white m-2 lg:m-10 p-8 bg-[#1e21214d] shadow-lg rounded relative">
          <div className="absolute bg-[#bd2130] w-[50px] h-[50px] rouded text-[12px] flex items-center right-0 -top-6 rounded-[50%]">
            <span>Save 56%</span>
          </div>
          <h2 className="text-white text-[25px] font-bold  mb-3">
            Yearly Plan
          </h2>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>Unlimited access to
            all courses on web and Android app.
          </p>
          <p>
            <span className="text-[#bd2130] mr-2">*</span>
            Certificates upon courses completion.
          </p>
          <div className="border rounded text-center p-4 mt-5">
            <p className="line-through">89 SAR</p>
            <p>Only 39 SAR/month</p>
          </div>
          <button className="mt-6 bg-[#bd2130] text-white rounded p-3">
            Subscribe Now
          </button>
        </div>
      </div>
    </>
  );
}

export default page;