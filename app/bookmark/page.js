"use client";
import React, { useContext, useEffect } from "react";
import { BookMarkContext } from "../_Context/bookMarkContext";
import Image from "next/image";
import bookMarkApi from "../_Utils/bookMarkApi";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

function bookMarkPage() {
  const { user } = useUser();
  const { booked, setBooked } = useContext(BookMarkContext);
  // Retrieve and parse data from localStorage
  let bookedItems = [];

  try {
    const rawData = localStorage.getItem("bookedItems");
    bookedItems = JSON.parse(rawData) || []; // Parse and provide a fallback if null
  } catch (error) {
    console.error("Error parsing bookedItems from localStorage:", error);
    bookedItems = []; // Fallback to an empty array if parsing fails
  }

  // Ensure bookedItems is an array
  if (Array.isArray(bookedItems)) {
    // Safely use .map
    bookedItems.map((item) => {
      console.log("Booked Item:", item);
    });
  } else {
    console.error("bookedItems is not an array:", bookedItems);
  }

  const deleteItem = (id) => {
    try {
      // Retrieve and parse bookedItems from localStorage
      const rawData = localStorage.getItem("bookedItems");
      const bookedItems = JSON.parse(rawData) || [];

      if (!Array.isArray(bookedItems)) {
        console.error("Invalid data in bookedItems. Resetting to empty array.");
        localStorage.setItem("bookedItems", JSON.stringify([]));
        setBooked(bookedItems);
        return;
      }

      // Filter out the item with the matching id
      const updatedItems = bookedItems.filter((item) => item.id !== id);
      setBooked(updatedItems);

      // Save the updated list back to localStorage
      localStorage.setItem("bookedItems", JSON.stringify(updatedItems));

      console.log(`Item with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item from bookedItems:", error);
    }
  };

  // useEffect(() => {
  //   user && getBookedItems();
  // }, [user]);

  // const getBookedItems = () => {
  //   bookMarkApi
  //     .getUserBookItems(user.primaryEmailAddress.emailAddress)
  //     .then((res) => {
  //       const bookedItems = res?.data?.data.map((bookItem) => ({
  //         id: bookItem.id,
  //         services: bookItem?.attributes?.services?.data[0],
  //       }));
  //       setBooked(bookedItems); // Set all items at once to avoid duplication
  //     });
  // };

  // const deleteItem = (id) => {
  //   bookMarkApi
  //     .deleteBookItem(id)
  //     .then((res) => {
  //       console.log(res?.data?.data);
  //       if (res)
  //         setBooked((oldCart) =>
  //           oldCart.filter((item) => item.id !== res?.data?.data.id)
  //         );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <section>
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-between flex-wrap">
        <div className="mx-auto w-[100%] lg:w-[80%] border rounded p-2 lg:p-6 overflow-y-auto h-[430px]">
          <header className="text-left">
            <h1 className="text-l font-bold text-white sm:text-3xl">
              Booked Marked Courses
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {bookedItems?.map((item) => (
                <li
                  key={item?.id}
                  className="flex items-center gap-2 lg:gap-4 bg-[#1e21214d] rounded p-3"
                >
                  {/* Use Link only around items you want to be clickable for navigation */}
                  <Link href={`service_details/${item?.services?.id}`}>
                    <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
                      <Image
                        src={item?.attributes?.image?.data?.attributes?.url}
                        width={70}
                        height={70}
                        alt="service Detail Banner"
                        className="object-fill rounded h-[70px] w-[70px] lg:w-[70px]"
                      />
                      <div>
                        <h3 className="text-[10px] lg:text-[16px] text-white">
                          {item?.attributes?.name}
                        </h3>
                        <dl className="mt-0.5 space-y-px text-[10px] text-white">
                          <div>
                            <dt className="inline">By: </dt>
                            <dd className="inline">
                              {item?.attributes?.Author}
                            </dd>
                          </div>
                          <div>
                            <dt className="inline">Category: </dt>
                            <dd className="inline">
                              {item?.attributes?.Category}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-1 items-center justify-end gap-2 mr-5 flex-wrap">
                    <button
                      className="text-white transition hover:text-red-600"
                      onClick={() => deleteItem(item.id)}
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

          {bookedItems.length === 0 && (
            <p className="text-white text-[20px] shadow-lg rounded flex justify-center bg-[#1e21214d] p-5 h-40 items-center">
              Your Booked List Empty
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
export default bookMarkPage;
