import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

const Modal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [bounce, setBounce] = useState(true); // State for bounce animation

  // Open the modal and trigger the animation once
  useEffect(() => {
    setModalOpen(true);

    // Remove bounce animation after 1 second
    const timer = setTimeout(() => {
      setBounce(false);
    }, 1000); // 1000ms = 1 second

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    // Close modal if the click is outside the modal content
    if (e.target.id === "modalOverlay") {
      handleCloseModal();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Page with Auto-Open Bouncing Modal</h1>
      {isModalOpen && (
        <div
          id="modalOverlay"
          onClick={handleOverlayClick}
          className={`fixed inset-0 flex items-center z-40 justify-center bg-gray-800 bg-opacity-80 transition-opacity duration-500 ease-in ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-black p-6 rounded-lg shadow-lg relative ransform transition-transform duration-700 ease-in ${
              bounce ? "animate-bounce" : ""
            } ${isModalOpen ? "scale-100" : "scale-0"}`}
          >
            <button
              className="absolute x-6 top-1 left-1 text-[17px] text-white w-8 h-8 rounded-full"
              onClick={handleCloseModal}
            >
              X
            </button>
            <Image
              src="https://res.cloudinary.com/dahptqhed/image/upload/v1729165363/poster4_fad04e5a91.jpg"
              width={450}
              height={420}
              alt="service Detail Banner"
              className="transition duration-500 group-hover:scale-105 rounded-lg "
            />

            <div className="flex items-center justify-center text-white">
              <button className="bg-[#D0021B] text-[18px] pr-5 pl-5 pt-3 pb-3 rounded">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;