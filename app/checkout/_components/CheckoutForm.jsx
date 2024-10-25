import React from "react";

import { PaymentElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  // Define custom styles for the PaymentElement
  const paymentElementOptions = {
    style: {
      base: {
        color: "#ffffff", // White text color
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#b3b3b3", // Placeholder color in the input fields
        },
      },
      invalid: {
        color: "#ff4d4f", // Red color for errors
      },
    },
  };

  return (
    <form>
      <div className=" mt-12 mb-12 w-[55%] m-auto h-[100%] bg-[#1e2121e6] p-14 rounded shadow-lg text-white">
        <div className="bg-white p-6 rounded shadow-lg">
          <PaymentElement options={paymentElementOptions} />
        </div>
        <button className="w-full p-2 mt-4 text-white rounded-md bg-[#fd0000]">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
