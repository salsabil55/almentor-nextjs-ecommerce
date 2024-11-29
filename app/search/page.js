"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import SkeletonService from "../courses/skeletonService";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

import { useUser } from "@clerk/nextjs";

import servicesApi from "../_Utils/servicesApi"; // Adjust the import path as needed
import AOS from "aos";
import { toast } from "react-toastify";
const Page = () => {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serviceList, setServiceList] = useState([]);
  const text = searchParams.get("query");
  const [filter, setFilter] = useState(text); // Initialize filter state
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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

  const notify = () => {
    toast.error("You Must Be Logged in");
  };
  useEffect(() => {
    getService();
  }, []);
  const getService = async () => {
    try {
      // Await the API call to get the latest services
      const response = await servicesApi.getLatestServices();
      const data = response.data;
      setServiceList(data);
      setLoading(false);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  // Handle search input
  const handleSearchChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter services based on title or author
  const filteredServices = serviceList.filter((service) => {
    const title = service?.attributes?.name?.toLowerCase() || { text };
    const author = service?.attributes?.Author?.toLowerCase() || { text };
    return (
      title.includes(filter.toLowerCase()) ||
      author.includes(filter.toLowerCase())
    );
  });
  const filterLength = filteredServices.length;

  // // Wait until the router is ready
  // useEffect(() => {
  //   if (router.isReady) {
  //     setIsReady(true);
  //     const { query: queryParam } = router.query;
  //     setQuery(queryParam || "");
  //   }
  // }, [router.isReady, router.query]);

  // // Fetch data from the API
  // useEffect(() => {
  //   const getService = async () => {
  //     try {
  //       const response = await servicesApi.getLatestServices();
  //       setData(response.data);
  //       console.log("Response:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     }
  //   };

  //   getService();
  // }, []);

  // // Filter data based on query
  // useEffect(() => {
  //   if (query && data.length > 0) {
  //     setFilteredData(
  //       data.filter((item) =>
  //         item.name.toLowerCase().includes(query.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setFilteredData(data); // Show all data if no query
  //   }
  // }, [query, data]);

  // Wait for router readiness

  return (
    <div className="mt-10 p-10 bg-[#1e2121]">
      {!loading && (
        <>
          <div className="mt-3 flex justify-center">
            <h2 className="text-white text-[25px] lg-text-[30px] font-extrabold">
              {t("Discover All Courses")}
            </h2>
          </div>

          <div className="flex justify-center mt-5 flex-col lg:flex-row items-center">
            <input
              placeholder="Search Your course ..."
              value={filter}
              onChange={handleSearchChange} // Update search input
              className="pt-3 pb-3 w-[100%] mb-2 lg:w-[60%] border bg-[#1e2121] rounded pl-4 text-white"
            />
            <button className=" rounded bg-[#bd2130] h-12 w-[100%] lg:w-[100px] text-center pt-3 text-white pr-3 pb-3 lg:pr-7 lg:pl-7 lg:ml-3">
              Search
            </button>
          </div>
        </>
      )}

      <div className="bg-[#141717] w-[full] p-5 hover:shadow-md overflow-hidden mb-8 rounded mt-10 ">
        {!loading ? (
          <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:p-10">
            {/* Display filtered list */}
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#141717] w-full lg:p-5 hover:shadow-md overflow-hidden mb-8 rounded"
              >
                <div
                  id={service.id}
                  className="group bg-[#141717] w-[220px] lg:w-[320px] m-auto relative block overflow-hidden rounded-lg shadow-sm shadow-indigo-100"
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
                >
                  <Image
                    src={service?.attributes?.image?.data?.attributes?.url}
                    lg-width={320}
                    width={220}
                    height={200}
                    alt="Service Image"
                    className="h-56 w-[260px] sm:w-[320px] lg:w-[360px] object-cover transition duration-500 group-hover:scale-105 sm:h-60 bg-black"
                  />
                  <Link href={`/service_details/${service?.id}`}>
                    <div
                      className="relative bg-[#141717] p-2 border rounded"
                      data-aos="fade-zoom-in"
                      data-aos-easing="ease-in-back"
                    >
                      <h3 className="mt-1.5 text-[15px] text-white line-clamp-1">
                        {service?.attributes?.name || "Course"}
                      </h3>
                      <p className="mt-1.5 text-[#a1a1a1] text-[13px]">
                        By {service?.attributes?.Author}
                      </p>
                      <p className="text-white mt-4">
                        <span className="text-white line-through mr-5">
                          8000 SAR /mo
                        </span>
                        {service?.attributes?.price} SAR /mo
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SkeletonService />
        )}
        {filterLength == 0 && (
          <div className="flex justify-center items-center flex-col">
            <Image
              src="https://res.cloudinary.com/dahptqhed/image/upload/v1732441788/not_found_1c68268de7.png"
              alt="no found"
              width={170}
              height={160}
            />
            <h2 className="text-[28px] font-semibold text-white mb-20">
              We couldn't find any search results
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
