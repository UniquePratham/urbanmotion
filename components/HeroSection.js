import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

const HeroSection = () => {
  const images = ["/car1.png", "/car2.png"];
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="100vh"
      bg="black"
      color="white"
      align="center"
      justify="space-between"
      pl="80px" // Accounts for sidebar width
      pr="2rem"
    >
      {/* Left Content */}
      <Box flex="1" textAlign={{ base: "center", md: "left" }} p="2rem">
        <Heading
          fontSize={{ base: "4xl", md: "7xl" }}
          textTransform="uppercase"
          mb="6"
        >
          <Text as="span" color="white">
            Easiest Car{" "}
          </Text>
          <Text as="span" color="#00db00">
            Rentals
          </Text>
        </Heading>
        <Text fontSize="2xl" textTransform="uppercase" color="#00db00" mb="6">
          Find the Best Car For Rent Today
        </Text>
        <Text fontSize="lg" mb="6" maxW="400px" lineHeight="1.8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button
          bgGradient="linear(to-r, #00db00, green.600)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, #00db00, green.500)",
            transform: "scale(1.1)",
            transition: "0.3s",
          }}
          size="lg"
          textTransform="uppercase"
        >
          Book Now
        </Button>
      </Box>

      {/* Right Content */}
      <Box flex="1" position="relative" textAlign="center">
        <Image
          src={images[currentImage]}
          alt="Car"
          boxSize="80%"
          mx="auto"
          filter="drop-shadow(0px 0px 20px green)"
        />
        <Flex
          position="absolute"
          bottom="10%"
          left="50%"
          transform="translateX(-50%)"
          align="center"
          gap="2rem"
        >
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Previous"
            border="2px solid white"
            borderRadius="50%"
            bg="transparent"
            color="white"
            _hover={{
              bg: "rgba(0, 255, 0, 0.2)",
              transform: "scale(1.1)",
              transition: "0.3s",
            }}
            onClick={handlePrev}
          />
          <Text fontWeight="bold" textTransform="uppercase">
            Location
          </Text>
          <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next"
            border="2px solid white"
            borderRadius="50%"
            bg="transparent"
            color="white"
            _hover={{
              bg: "rgba(0, 255, 0, 0.2)",
              transform: "scale(1.1)",
              transition: "0.3s",
            }}
            onClick={handleNext}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default HeroSection;
