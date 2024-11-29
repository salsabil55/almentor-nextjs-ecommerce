"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Bookmark, Moon, Search, Globe } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import Cart from "../Cart/Cart";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../_Context/cartContext";

import cartApi from "../../_Utils/cartApi";
import { SearchContext } from "../../_Context/SearchContext";
import { BookMarkContext } from "../../_Context/bookMarkContext";
import { slide as Menu } from "react-burger-menu";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

function Header() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const { booked, setBooked } = useContext(BookMarkContext);
  const { searchList, setSearchList } = useContext(SearchContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchList(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      // Redirect to Course page with the search term as a query parameter
      router.push(`/search?query=${encodeURIComponent(searchText)}`);
    }
  };

  const [openCart, setOpenCart] = useState(false);

  const bookedItems = localStorage.getItem("bookedItems");
  const bookedItemLength = bookedItems ? JSON.parse(bookedItems).length : 0;

  const showSettings = (event) => {
    event.preventDefault();
  };

  let en = false;
  let ar = false;
  if (lng === "en") {
    en = true;
  } else {
    ar = true;
  }

  const enLng = () => {
    i18n.changeLanguage("en");
    console.log("enLng");
  };
  const arLng = () => {
    i18n.changeLanguage("ar");
  };
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  useEffect(() => {
    user && getCartItems();
    // user && getBookedItems();
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
  const styles = {
    container: {
      width: "40px", // Adjust size as needed
      height: "40px",
      // Same width and height for a circle
      borderRadius: "50%", // Makes the shape circular
      // backgroundColor: "#2a2e2e", // Light background color
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "3px",
      marginLeft: "3px",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional shadow
      cursor: "pointer", // Pointer on hover
    },
    icon: {
      width: "23px", // Adjust icon size
      height: "23px",
      color: "white", // Icon color
    },
  };

  return (
    <div>
      <header className="bg-[#1e2121] dark:[#1e2121] overflow-hidden">
        <div className="mx-auto relative flex h-16 max-w-screen-xl items-center gap-2 lg:gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rtl:right-0 block rounded  p-1 text-gray-600 transition hover:text-gray-600/75 md:hidden overflow-hidden dark:text-white dark:hover:text-white/75"
          >
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
          <Link className="block text-teal-600 dark:text-teal-300 " href="/">
            <span className="sr-only">Home</span>
            <Image
              src="https://res.cloudinary.com/dahptqhed/image/upload/v1729065938/almentor_logo_2x_cfebb8e613.png"
              width={124}
              height={24}
              alt="logo"
            />
          </Link>
          {mobileMenu && (
            <Menu
              right={ar}
              className={
                ar
                  ? "rtl bg-[#141717] right-0 left-0 text-white top-[11%] w-[100%] overflow-hidden"
                  : " bg-[#141717] left-0 text-white top-[11%] w-[100%] overflow-hidden"
              }
            >
              <nav
                aria-label="Global"
                className="rtl:text-right text-left rtl:mr-4 mt-[9%]"
              >
                <ul className="flex items-left gap-6 text-sm ml-5 flex-col">
                  <li className="mt-1 mb-1">
                    <Link
                      className="text-[20px] text-white transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href="/courses"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      {t("Courses")}
                    </Link>
                  </li>
                  <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                  <li className="mt-1 mb-1">
                    <Link
                      className="text-[20px] text-white  transition  hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href="/instructor"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      {t("Instructors")}
                    </Link>
                  </li>

                  <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                  {!user ? (
                    <>
                      <li className="mt-1 mb-1 flex items-center">
                        <div className="flex">
                          <button
                            className="text-white bold text-center mr-5 ml-10 text-[20px] height-[inherit]"
                            onClick={arLng}
                          >
                            اللغه العربية
                          </button>

                          <button
                            className="text-white bold text-center text-[20px] "
                            onClick={enLng}
                          >
                            <Globe />
                          </button>
                        </div>{" "}
                        {en && (
                          <button
                            className="text-white bold text-center items-center text-[20px] height-[inherit]"
                            onClick={arLng}
                          >
                            AR
                          </button>
                        )}
                        {ar && (
                          <button
                            className="text-white bold text-center items-center text-[20px] "
                            onClick={enLng}
                          >
                            <Globe />
                          </button>
                        )}
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-2 mb-2 flex items-center">
                        <Link
                          className="rounded-md border  mr-3 pl-7 pr-7 pt-2 pb-2 text-[15px] font-medium transition hover:text-teal-600/75 sm:block  dark:hover:text-white/75"
                          href="http://localhost:3000/sign-in"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          {t("Login")}
                        </Link>
                        <Link
                          className="rounded-md border  pl-7 pr-7 pt-2 pb-2 text-[15px] font-medium text-white transition hover:bg-[#1e2121] hover:border"
                          href="http://localhost:3000/sign-up"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          {t("Sign up")}
                        </Link>
                      </li>

                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1">
                        <Link
                          className="text-[20px] text-white pt-2 pb-2 pl-20 pr-20 bg-[#bd2130] transition rounded hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                          href="/subscribe"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          {t("Subscribe")}
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mt-1 mb-1 flex items-center">
                        <Link
                          href="/bookmark"
                          onClick={() => setMobileMenu(!mobileMenu)}
                          className="flex items-center text-[20]"
                        >
                          {" "}
                          <Bookmark />
                          {t("Saved Courses")}
                          <p className="ml-2"></p>
                        </Link>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1 flex items-center">
                        <Link
                          href="/cart"
                          onClick={() => setMobileMenu(!mobileMenu)}
                          className="flex items-center text-[20]"
                        >
                          <ShoppingCart />
                          {t("Subscribtion Courses")}
                          <p className="ml-2"></p>
                          <span className="ml-2">({cart.length})</span>
                        </Link>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1 flex ">
                        <div className="flex">
                          <button
                            className="text-white bold text-center mr-5 ml-10 text-[20px] height-[inherit]"
                            onClick={arLng}
                          >
                            اللغه العربية
                          </button>

                          <button
                            className="text-white bold text-center text-[20px] "
                            onClick={enLng}
                          >
                            <Globe />
                          </button>
                        </div>
                      </li>
                      <hr className="w-[80%] h-[0.5px] border-t-[#d3d3d333] m-[auto]" />

                      <li className="mt-1 mb-1">
                        <Link
                          className="text-[20px] text-white pt-2 pb-2 pl-20 pr-20 bg-[#bd2130] transition rounded hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                          href="/subscribe"
                          onClick={() => setMobileMenu(!mobileMenu)}
                        >
                          {t("Subscribe")}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </Menu>
          )}

          <div className="flex flex-1 items-center justify-end md:justify-between relative">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-[15px] text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/courses"
                  >
                    {t("Courses")}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[15px] text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/instructor"
                  >
                    {t("Instructors")}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[15px] text-gray-500 transition border border-solid rounded pl-5 pr-5 pt-2 pb-2 hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/subscribe"
                  >
                    {t("Subscribe")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-2">
                  {en && (
                    <div className="lg:flex items-center justify-center relative">
                      <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                          placeholder="Search..."
                          className=" hidden lg:block focus:border-none bg-[#1e2121] rounded pl-3 pr-3 pt-2 pb-2 text-white"
                        />
                        <button
                          type="submit"
                          className="flex items-center align-center justify-center"
                        >
                          {" "}
                          <Search
                            style={styles.icon}
                            className="mr-2 absolute cursor-pointer right-[10%]"
                          />{" "}
                        </button>
                      </form>

                      <hr className="hidden lg:block h-[40px] bg-slate-400 w-[0.5px] mr-3 ml-3" />
                    </div>
                  )}

                  {ar && (
                    <div className="lg:flex items-center justify-center relative rtl">
                      <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                          placeholder="ابحث عن دورات تدريبية"
                          className=" hidden lg:block focus:border-none bg-[#1e2121] rounded pl-3 pr-3 pt-2 pb-2 text-white"
                        />
                        <button
                          type="submit"
                          className="flex items-center align-center justify-center"
                        >
                          {" "}
                          <Search
                            style={styles.icon}
                            className="mr-2 absolute cursor-pointer left-[10%]"
                          />{" "}
                        </button>
                      </form>

                      <hr className="hidden lg:block h-[40px] bg-slate-400 w-[0.5px] mr-3 ml-3" />
                    </div>
                  )}
                  <div className="hidden lg:block">
                    <div
                      style={styles.container}
                      className="bg-[#2a2e2e] justify-center items-center"
                    >
                      <Moon style={styles.icon} />
                    </div>
                  </div>
                  <Link
                    className="hidden md:block underline rounded-md px-2 py-2.5 text-[16px] font-medium text-white transitionsm:block dark:text-white dark:hover:text-white/75"
                    href="http://localhost:3000/sign-in"
                  >
                    {t("Login")}
                  </Link>
                  <Link
                    className="hidden md:block rounded-md bg-[#bd2130] px-3 py-2.5 text-[16px] font-medium text-white transition hover:bg-[#1e2121] hover:border"
                    href="http://localhost:3000/sign-up"
                  >
                    {t("Sign up")}
                  </Link>
                </div>
              ) : (
                <div className="flex test-white">
                  {en && (
                    <div className="lg:flex items-center justify-center relative">
                      <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                          placeholder="Search..."
                          className=" hidden lg:block focus:border-none bg-[#1e2121] rounded pl-3 pr-3 pt-2 pb-2 text-white"
                        />
                        <button
                          type="submit"
                          className="flex items-center align-center justify-center"
                        >
                          {" "}
                          <Search
                            style={styles.icon}
                            className="mr-2 absolute cursor-pointer right-[10%]"
                          />{" "}
                        </button>
                      </form>

                      <hr className="hidden lg:block h-[40px] bg-slate-400 w-[0.5px] mr-3 ml-3" />
                    </div>
                  )}

                  {ar && (
                    <div className="lg:flex items-center justify-center relative rtl">
                      <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                          placeholder="ابحث عن دورات تدريبية"
                          className=" hidden lg:block focus:border-none bg-[#1e2121] rounded pl-3 pr-3 pt-2 pb-2 text-white"
                        />
                        <button
                          type="submit"
                          className="flex items-center align-center justify-center"
                        >
                          {" "}
                          <Search
                            style={styles.icon}
                            className="mr-2 absolute cursor-pointer left-[10%]"
                          />{" "}
                        </button>
                      </form>

                      <hr className="hidden lg:block h-[40px] bg-slate-400 w-[0.5px] mr-3 ml-3" />
                    </div>
                  )}
                  <div className="hidden lg:block">
                    <div
                      style={styles.container}
                      className="bg-[#2a2e2e] justify-center items-center"
                    >
                      {en && (
                        <button
                          className="text-white bold text-center items-center text-[20px] height-[inherit]"
                          onClick={arLng}
                        >
                          AR
                        </button>
                      )}

                      {ar && (
                        <button
                          className="text-white bold text-center items-center text-[20px] "
                          onClick={enLng}
                        >
                          EN
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div
                      style={styles.container}
                      className="bg-[#2a2e2e] justify-center items-center"
                    >
                      <Moon style={styles.icon} />
                    </div>
                  </div>
                  <div className=" hidden lg:block">
                    <div className="relative flex ">
                      <div style={styles.container} className="bg-[#2a2e2e]">
                        <Link href="/bookmark">
                          {" "}
                          <Bookmark style={styles.icon} />
                        </Link>
                      </div>
                      {bookedItemLength > 0 && (
                        <div className="cartIndex absolute top-1 -mt-3 left-6 bg-[#a5030580] w-6 h-6 flex items-center justify-center text-center rounded-full">
                          <span className="text-white text-[12px]">
                            {bookedItemLength}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="hidden relative lg:flex mr-2">
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
            </div>
          </div>
        </div>
      </header>
      {openCart && <Cart />}
    </div>
  );
}

export default Header;
