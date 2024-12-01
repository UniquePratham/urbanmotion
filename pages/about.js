import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompellingNarrative from "../components/CompellingNarrative";
import MissionStatement from "../components/MissionStatement";
const CoreValues = dynamic(() => import("../components/CoreValues"), {
  ssr: false,
});
import MeetOurTeam from "../components/MeetOurTeam";
import SocialProof from "../components/SocialProof";
import CallToAction from "../components/ContactUs";

const AboutPage = () => {
  return (
    <Box bg="black" color="white" minH="100vh" overflowX="hidden" position={{base:"relative",md:"unset"}} top="50px">
      <Navbar />
      <CompellingNarrative />
      <MissionStatement />
      <CoreValues />
      <MeetOurTeam />
      <SocialProof />
      <CallToAction />
      <Footer />
    </Box>
  );
};

export default AboutPage;
