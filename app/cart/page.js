"use client";
import React, { useContext } from "react";
import { CartContext } from "../_Context/cartContext";
import Image from "next/image";
import cartApi from "../_Utils/cartApi";
import { useRouter } from "next/navigation";

function cartPage() {
  const router = useRouter();

  const { cart, setCart } = useContext(CartContext);
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount =
        totalAmount + Number(item?.serviceDetail?.attributes?.price);
    });
    return totalAmount;
  };
  const deleteItem = (id) => {
    cartApi
      .deleteCartItem(id)
      .then((res) => {
        if (res)
          setCart((oldCart) =>
            oldCart.filter((item) => item.id !== res?.data?.data.id)
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deleteItem = (id) => {
  //   cartApi
  //     .deleteCartItem(id)
  //     .then((res) => {
  //       if (res)
  //         setCart((oldCart) =>
  //           oldCart.filter((item) => item.id !== res?.data?.data?.id)
  //         );
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };
  return (
    <section>
      <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-between flex-wrap">
        <div className="mx-auto lg:w-[60%] w-[100%] mb-3 border rounded p-6 overflow-y-auto h-[430px]">
          <header className="text-left">
            <h1 className="text-l font-bold text-white sm:text-3xl">
              Courses Cart List
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart?.map((item) => (
                <li
                  key={item?.id}
                  className="flex items-center gap-4 bg-[#1e21214d] rounded p-3"
                >
                  <Image
                    src={
                      item?.serviceDetail?.attributes?.image?.data?.attributes
                        ?.url
                    }
                    width={70}
                    height={70}
                    alt="service Detail Banner"
                    className="object-fill rounded "
                  />

                  <div>
                    <h3 className="text-[16px] text-white">
                      {" "}
                      {item?.serviceDetail?.attributes?.name}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-white">
                      <div>
                        <dt className="inline">By:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.serviceDetail?.attributes?.Author}
                        </dd>
                      </div>

                      <div>
                        <dt className="inline">Category:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.serviceDetail?.attributes?.Category}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">
                          {" "}
                          {item?.serviceDetail?.attributes?.price}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2 mr-5">
                    <button
                      className="text-white transition hover:text-red-600"
                      onClick={() => deleteItem(item?.id)}
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border w-[100%] lg:w-[30%] text-white rounded p-6 h-[100%] overflow-hidden">
          <p>Order Summary</p>
          <div className="mt-8 flex justify-end">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-white">
                <div className="flex mb-5">
                  <input
                    placeholder="Apply Coupon Code"
                    className="bg-[#090a0ae6] text-[13px] rounded w-[100%] p-3 mr-3"
                  />
                  <button className="rounded text-white border border-[#591c1c66] text-[12px] pl-5 pr-5 pb-2 pt-2">
                    Apply
                  </button>
                </div>

                <div className="flex justify-between mb-2 pb-2 pt-2">
                  <dt>Subtotal</dt>

                  <dd>{getTotalAmount()} SAR</dd>
                </div>

                <div className="flex justify-between pb-2 pt-2">
                  <dt>VAT</dt>
                  <dd>25 SAR</dd>
                </div>

                <div className="flex justify-between pb-3 pt-2 mb-5">
                  <dt>Discount</dt>
                  <dd>-20 SAR</dd>
                </div>

                <div className="flex justify-between pb-3 pt-2 mb-5">
                  <dt>Discount</dt>
                  <dd className="">-20 SAR</dd>
                </div>

                <div className="flex justify-between text-[17px] font-semibold border-t pt-5 border-gray-100">
                  <dt>Total (Inclusive of VAT)</dt>
                  <dd>{getTotalAmount()} SAR </dd>
                </div>
              </dl>

              <div className="flex w-[100%] items-center">
                <button
                  onClick={() =>
                    router.push(`/checkout?amount=${getTotalAmount()}`)
                  }
                  className="block w-[100%] text-center rounded bg-[#fd0000] px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default cartPage;
