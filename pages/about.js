import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CompellingNarrative from "../components/CompellingNarrative";
import MissionStatement from "../components/MissionStatement";
import CoreValues from "../components/CoreValues";
import MeetOurTeam from "../components/MeetOurTeam";
import SocialProof from "../components/SocialProof";
import CallToAction from "../components/ContactUs";

const AboutPage = () => {
  return (
    <Box bg="black" color="white" minH="100vh">
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
