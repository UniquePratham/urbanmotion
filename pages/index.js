import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import TestimonialSection from "@/components/TestimonialSection";
import BookCar from "@/components/BookCar";
import DiscountBanner from "@/components/DiscountBanner";
import FeatureHighlights from "@/components/FeatureHighlights";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <HeroSection />
      <TestimonialSection />
      <DiscountBanner />
      <FeatureHighlights />
      <BookCar />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Home;
