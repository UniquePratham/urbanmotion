import Footer from "@/components/Others/Footer";
import Navbar from "@/components/Others/Navbar";
import { Box, Heading, SimpleGrid, Flex, Text, Icon } from "@chakra-ui/react";
import {
  FaCar,
  FaMoneyBillWave,
  FaUserShield,
  FaClock,
  FaRoute,
  FaTools,
  FaGasPump,
  FaAward,
  FaMapMarkedAlt,
} from "react-icons/fa";

const Perks = () => {
  const perks = [
    {
      icon: FaCar,
      title: "Wide Range of Cars",
      description:
        "Choose from economy, luxury, or specialty vehicles to suit your needs.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Affordable Prices",
      description:
        "Enjoy competitive rates without compromising on quality or comfort.",
    },
    {
      icon: FaUserShield,
      title: "Comprehensive Insurance",
      description:
        "Drive with peace of mind with our complete insurance coverage.",
    },
    {
      icon: FaClock,
      title: "24/7 Availability",
      description:
        "Book and pick up your car anytime, anywhere for ultimate convenience.",
    },
    {
      icon: FaRoute,
      title: "Flexible Routes",
      description: "Drive freely without restrictions on mileage or routes.",
    },
    {
      icon: FaTools,
      title: "Well-Maintained Vehicles",
      description:
        "Our fleet is regularly serviced to ensure a safe and smooth ride.",
    },
    {
      icon: FaGasPump,
      title: "Fuel Options",
      description:
        "Choose between pre-filled tanks or pay-as-you-go for maximum flexibility.",
    },
    {
      icon: FaAward,
      title: "Loyalty Rewards",
      description: "Earn points and discounts with every rental.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Multiple Pickup Locations",
      description:
        "Pick up your car from a location that’s convenient for you.",
    },
  ];

  return (
    <>
      <Navbar />
      <Box pt="150px" bg="gray.900" minH="100vh" pb={16} px={8}>
        <Heading textAlign="center" color="white" mb={12}>
          Perks At{" "}
          <Text as="span" color="#00db00">
            UrbanMotion
          </Text>
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {perks.map((perk, index) => (
            <Flex
              key={index}
              direction="column"
              align="center"
              bg="gray.800"
              p={8}
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: "scale(1.05)", bg: "gray.700" }}
            >
              <Icon as={perk.icon} w={16} h={16} color="#00db00" mb={4} />
              <Heading fontSize="xl" color="white" mb={2}>
                {perk.title}
              </Heading>
              <Text fontSize="md" color="gray.300" textAlign="center">
                {perk.description}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
};

export default Perks;
