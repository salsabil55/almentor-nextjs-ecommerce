import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
function ServiceBanner({ serviceDetail }) {
  const imageUrl = serviceDetail?.attributes?.image?.data?.attributes?.url;
  const pathname = usePathname();
  const firstImg = pathname === "/service_details/1";
  const imageWidth = firstImg ? 480 : 600; // Set a larger size for the first image
  const imageHeight = firstImg ? 450 : 450;
  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={imageWidth}
          height={imageHeight}
          alt="service Detail Banner"
          className="transition duration-500 group-hover:scale-105 rounded-lg "
        />
      ) : (
        <div
          className={`object-cover w-[${imageWidth}px] h-[${imageHeight}px] bg-slate-200 rounded-lg animate-pulse`}
        ></div>
      )}
    </>
  );
}

export default ServiceBanner;
