import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import TestimonialSection from "@/components/TestimonialSection";
import BookCar from "@/components/BookCar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <HeroSection />
      <TestimonialSection />
      <BookCar />
    </>
  );
};

export default Home;
