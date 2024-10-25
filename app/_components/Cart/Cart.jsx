"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../../_Context/cartContext";
import Image from "next/image";
import Link from "next/link";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(true);

  return (
    openCart && (
      <div className="absolute right-0 z-10 overflow-auto">
        <div
          className="relative w-screen max-w-sm bg-[#1e2121e6] max-h-[500px] overflow-y-auto mr-10 shadow-lg rounded px-4 py-8 sm:px-6 lg:px-8"
          aria-modal="true"
          role="dialog"
          tabIndex="-1"
        >
          {/* <button className="absolute end-4 top-4 text-white transition hover:scale-110">
          <span className="sr-only">Close cart</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}

          <div className="space-y-6">
            <h2 className="bg-[#1e2121] rounded text-white p-4 bold">
              Courses in Your Cart :
            </h2>
            {cart && (
              <ul className="space-y-4">
                {cart?.map((item) => (
                  <li
                    key={item?.id}
                    className="flex items-center gap-4 border rounded p-3 cursor-pointer bg-[#1e2121]"
                  >
                    {item?.serviceDetail?.attributes?.image?.data?.attributes
                      ?.url ? (
                      <Image
                        src={
                          item?.serviceDetail?.attributes?.image?.data
                            ?.attributes?.url
                        }
                        width={70}
                        height={70}
                        alt="service Detail Banner"
                        className="object-fill rounded "
                      />
                    ) : (
                      <div
                        className={`object-cover w-[70px] h-[70px] bg-slate-200 rounded-lg animate-pulse`}
                      ></div>
                    )}

                    <div>
                      <h3 className="text-sm text-white line-clamp-1">
                        {item?.serviceDetail?.attributes?.name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-white">
                        <div>
                          <dt className="inline">
                            By: {item?.serviceDetail?.attributes?.Author}
                          </dt>
                        </div>

                        <div>
                          <dt className="inline">
                            Price : {item?.serviceDetail?.attributes?.price} /
                            SAR
                          </dt>
                          <dd className="inline">White</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {!cart && <p>No courses in Cart ..</p>}

            <div className="space-y-4 text-center">
              <Link
                href="/cart"
                className="block rounded bg-[#a50305] px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                onClick={() => setOpenCart(!openCart)}
              >
                View my cart ({cart.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Cart;
