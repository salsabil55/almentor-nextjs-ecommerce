"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Bookmark } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import Cart from "../Cart/Cart";
import React, { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../../_Context/cartContext";
import cartApi from "../../_Utils/cartApi";
import bookMarkApi from "../../_Utils/bookMarkApi";
import { BookMarkContext } from "../../_Context/bookMarkContext";

function Header() {
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const { booked, setBooked } = useContext(BookMarkContext);

  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    user && getCartItems();
    user && getBookedItems();
  }, [user]);
  const getCartItems = () => {
    cartApi
      .getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        console.log(res?.data?.data);
        res?.data?.data.forEach((cartItem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: cartItem.id,
              serviceDetail: cartItem?.attributes?.services?.data[0],
            },
          ]);
        });
      });
  };
  const getBookedItems = () => {
    bookMarkApi
      .getUserBookItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        res?.data?.data.forEach((bookItem) => {
          setBooked((oldCart) => [
            ...oldCart,
            {
              id: bookItem.id,
              services: bookItem?.attributes?.services?.data[0],
            },
          ]);
        });
      });
  };
  const styles = {
    container: {
      width: "35px", // Adjust size as needed
      height: "35px",
      // Same width and height for a circle
      borderRadius: "50%", // Makes the shape circular
      // backgroundColor: "#2a2e2e", // Light background color
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional shadow
      cursor: "pointer", // Pointer on hover
    },
    icon: {
      width: "20px", // Adjust icon size
      height: "20px",
      color: "white", // Icon color
    },
  };
  return (
    <div>
      <header className="bg-[#1e2121] dark:[#1e2121]">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <Link className="block text-teal-600 dark:text-teal-300" href="/">
            <span className="sr-only">Home</span>
            <Image
              src="https://res.cloudinary.com/dahptqhed/image/upload/v1729065938/almentor_logo_2x_cfebb8e613.png"
              width={124}
              height={24}
              alt="logo"
            />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-[15px] text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Courses
                  </a>
                </li>

                <li>
                  <a
                    className="text-[15px] text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Instructors
                  </a>
                </li>

                <li>
                  <a
                    className="text-[15px] text-gray-500 transition border border-solid rounded pl-5 pr-5 pt-2 pb-2 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Subscribe
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="block rounded-md bg-[#bd2130] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                    href="http://localhost:3000/sign-up"
                  >
                    Sign up
                  </Link>

                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    href="http://localhost:3000/sign-in"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex test-white">
                  <div
                    style={styles.container}
                    className="bg-[#2a2e2e] justify-center items-center"
                  >
                    <p className="text-white bold text-center items-center font-bold text-[20px] h-[inherit]">
                      ع
                    </p>
                  </div>

                  <div className="relative flex  ml-2">
                    <div style={styles.container} className="bg-[#2a2e2e]">
                      <Link href="/bookmark">
                        {" "}
                        <Bookmark style={styles.icon} />
                      </Link>
                    </div>
                    {booked.length > 0 && (
                      <div className="cartIndex absolute top-1 -mt-3 left-6 bg-[#a5030580] w-6 h-6 flex items-center justify-center text-center rounded-full">
                        <span className="text-white text-[12px]">
                          {booked.length}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative flex mr-2 ml-2">
                    <div style={styles.container} className="bg-[#2a2e2e]">
                      <ShoppingCart
                        style={styles.icon}
                        onClick={() => setOpenCart(!openCart)}
                      />
                    </div>
                    {cart.length > 0 && (
                      <div className="cartIndex absolute top-1 -mt-3 left-6 bg-[#a5030580] w-6 h-6 flex items-center justify-center text-center rounded-full">
                        <span className="text-white text-[12px]">
                          {cart.length}
                        </span>
                      </div>
                    )}
                  </div>

                  <UserButton />
                </div>
              )}

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {openCart && <Cart />}
    </div>
  );
}

export default Header;
