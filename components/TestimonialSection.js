import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const TestimonialSection = () => {
  // Create a reference for the component
  const ref = useRef(null);

  // Trigger animation when the component comes into view
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Adds an offset of 50px

  return (
    <Flex
      ref={ref} // Attach ref to the parent container
      bg="#000" // Dark background
      color="white"
      p={{ base: "2rem", md: "4rem" }}
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      height={{ base: "90vh", md: "100vh" }} // Full viewport height
      position="relative"
      overflow="hidden"
      flexDirection={{base:"column-reverse",md:"unset"}}
    >
      {/* Left Content */}
      <MotionBox
        flex="1"
        p={{ base: "1rem", md: "3rem" }}
        textAlign={{ base: "center", md: "left" }}
        zIndex="12" // Ensure the text is above the images
        maxWidth={{ base: "100%", md: "50%" }}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
        transition={{ duration: 1 }}
        position={{ base: "absolute", md: "unset" }}
        top="150"
      >
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }} // Larger heading
          lineHeight="1.3"
          mb="6"
          textTransform="uppercase"
          fontWeight="bold"
        >
          <Text as="span" color="#32CD32">
            Lowest
          </Text>{" "}
          Rental Cars
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mb="4">
          Self-driving cars are the future of safety and efficiency.
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} fontStyle="italic" mb="6">
          “The future of driving is smarter and safer.”
        </Text>
        <Text fontSize="lg" fontWeight="bold" mb="2">
          Adam Brian
        </Text>
        <Text fontSize="sm" mb="4">
          Blogger
        </Text>
        <Flex
          align="center"
          justify={{ base: "center", md: "flex-start" }}
          mb="6"
        >
          {[...Array(5)].map((_, index) => (
            <Icon
              as={StarIcon}
              key={index}
              color="#FFBF00"
              boxSize={{ base: 4, md: 5 }}
              mr="1"
            />
          ))}
        </Flex>
        <Avatar src="/profile.png" name="Adam Brian" />
      </MotionBox>

      {/* Right Content */}
      <Box
        flex="1"
        position="relative"
        textAlign="center"
        maxWidth={{ base: "100%", md: "50%" }}
        zIndex="0"
        height="100%" // Ensure this box takes up the full height
      >
        {/* Image 1 */}
        <MotionImage
          src="/image1.png"
          alt="Car 1"
          width={{ base: "90%", md: "50%" }} // Adjust the width for responsiveness
          height={{ base: "22rem", md: "33.5rem" }}
          objectFit="cover"
          position={{ base: "relative", md: "absolute" }}
          left={{ base: "-20", md: "0%" }}
          top={{ base: "0%", md: "5%" }} // Distance from the top
          boxShadow="lg"
          zIndex="10" // Ensures this is above the second image
          margin={4}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
          transition={{ duration: 1.2 }}
          opacity="0.9"
          borderRadius="1rem"
        />
        {/* Image 2 */}
        <MotionImage
          src="/image2.png"
          alt="Car 2"
          width={{ base: "90%", md: "50%" }} // Adjust the width for responsiveness
          height={{ base: "22rem", md: "33.5rem" }}
          objectFit="cover"
          right={{ base: "-20", md: "-5%" }} // Slightly shifted to the right
          position={{ base: "relative", md: "absolute" }}
          bottom={{ base: "25%", md: "5%" }} // Lower positioning
          boxShadow="lg"
          zIndex="11" // Positioned behind the first image
          margin={4}
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate only when in view
          transition={{ duration: 1.4 }}
          opacity="0.2"
          borderRadius="1rem"
        />
      </Box>
    </Flex>
  );
};

export default TestimonialSection;
