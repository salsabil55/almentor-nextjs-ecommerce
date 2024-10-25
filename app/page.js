import Image from "next/image";
import Hero from "./_components/Hero/Hero";
import PageWithReactModal from "./_components/Modal/ModalPage";
import Services from "./_components/Services/Services";

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <div className="mt-10 p-10">
        <h1 className="text-3xl text-center text-white ">
          {" "}
          Explore inspiring courses online{" "}
        </h1>
      </div>
      <Services />

      <PageWithReactModal />
    </div>
  );
}
