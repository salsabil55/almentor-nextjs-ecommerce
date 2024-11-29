"use client";
import React, { useEffect, useRef, useState } from "react";
import servicesApi from "../_Utils/servicesApi";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import cookies from "js-cookie";

function InstructorPage() {
  const sliderRef = useRef(null);
  const [slider, setSlider] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);

  const [serviceList, setServiceList] = useState([]);
  const lng = cookies.get("i18next") || "en";

  useEffect(() => {
    getService();
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,
    });
  }, [lng]);

  const getService = async () => {
    const lng = cookies.get("i18next") || "en";

    try {
      // Await the API call to get the latest services
      const response = await servicesApi.getLatestServices(lng);
      const data = response.data;
      setServiceList(data);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const keenSliderActive = document.getElementById("keen-slider-active");
    const keenSliderCount = document.getElementById("keen-slider-count");

    const keenSlider = new KeenSlider(
      "#keen-slider",
      {
        loop: true,
        defaultAnimation: {
          duration: 750,
        },
        slides: {
          origin: "center",
          perView: 1,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 640px)": {
            slides: {
              origin: "center",
              perView: 1.5,
              spacing: 16,
            },
          },
          "(min-width: 768px)": {
            slides: {
              origin: "center",
              perView: 1.75,
              spacing: 16,
            },
          },
          "(min-width: 1024px)": {
            slides: {
              origin: "center",
              perView: 3,
              spacing: 16,
            },
          },
        },
        created(slider) {
          slider.slides[slider.track.details.rel].classList.remove(
            "opacity-40"
          );

          keenSliderActive.innerText = slider.track.details.rel + 1;
          keenSliderCount.innerText = slider.slides.length;
        },
        slideChanged(slider) {
          slider.slides.forEach((slide) => slide.classList.add("opacity-40"));

          slider.slides[slider.track.details.rel].classList.remove(
            "opacity-40"
          );

          keenSliderActive.innerText = slider.track.details.rel + 1;
        },
      },
      []
    );

    const keenSliderPrevious = document.getElementById("keen-slider-previous");
    const keenSliderNext = document.getElementById("keen-slider-next");

    keenSliderPrevious.addEventListener("click", () => keenSlider.prev());
    keenSliderNext.addEventListener("click", () => keenSlider.next());
  });
  return (
    <div>
      <section className="bg-[#1e21214d] text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-white-900 sm:text-5xl">
            Our trusted Instructors
          </h2>

          <div className="mt-8">
            <div id="keen-slider" className="keen-slider">
              {serviceList.map((service) => (
                <div className="keen-slider__slide opacity-40 transition-opacity duration-500">
                  <blockquote
                    className="rounded-lg  p-6 shadow-sm sm:p-8 flex bg-[#1e21214d]"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <Link href={`/service_details/${service?.id}`}>
                      <div className="flex items-center gap-4">
                        <Image
                          alt="instructor Image "
                          src={
                            service?.attributes?.image?.data?.attributes?.url
                          }
                          className="rounded object-fill"
                          width={100}
                          height={100}
                        />

                        <div>
                          <div className="flex items-left flex-col mb-3">
                            <p className="mt-0.5 font-medium text-white-900 text-[17px]">
                              {service?.attributes?.Author}
                            </p>
                            <p className="mt-0.5 font-normal text-white-900 text-[15px]">
                              {service?.attributes?.name}
                            </p>
                          </div>
                          <div className="flex justify-left gap-0.5 text-yellow-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-gray-700">
                        {service?.attributes?.describtion}
                      </p>
                    </Link>
                  </blockquote>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                aria-label="Previous slide"
                id="keen-slider-previous"
                className="text-[#a50305]-600 transition-colors hover:text-gray-900"
              >
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <p className="w-16 text-center text-sm text-[#a50305]-700">
                <span id="keen-slider-active"></span>/
                <span id="keen-slider-count"></span>
              </p>

              <button
                aria-label="Next slide"
                id="keen-slider-next"
                className="text-[#a50305]-600 transition-colors hover:text-gray-900"
              >
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InstructorPage;
