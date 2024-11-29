import Hero from "./_components/Hero/Hero";
import OfferPage from "./_components/Offer/OfferPage";
import PageWithReactModal from "./_components/Modal/ModalPage";
import Services from "./_components/Services/Services";
import { ToastContainer } from "react-toastify";
import InstructorPage from "./instructor/page";

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <div className="mt-10 p-10 flex justify-center">
        <h2 className="text-center text-3xl lg:text-4xl font-bold tracking-tight text-white-900 text-white">
          Explore inspiring courses online
        </h2>
      </div>
      <Services />
      <OfferPage />
      <InstructorPage />
      <PageWithReactModal />
      <ToastContainer />
    </div>
  );
}
