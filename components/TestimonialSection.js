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

const TestimonialSection = () => {
  return (
    <Flex
      bg="#000" // Dark background
      color="white"
      p={{ base: "2rem", md: "4rem" }}
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      height="100vh" // Full viewport height
      position="relative"
      overflow="hidden"
    >
      {/* Left Content */}
      <Box
        flex="1"
        p={{ base: "1rem", md: "3rem" }}
        textAlign={{ base: "center", md: "left" }}
        zIndex="10" // Ensure the text is above the images
        maxWidth={{ base: "100%", md: "50%" }}
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
      </Box>

      {/* Right Content */}
      <Box
        flex="1"
        position="relative"
        textAlign="center"
        maxWidth={{ base: "100%", md: "50%" }}
        zIndex="0"
      >
        {/* Image 1 */}
        <Image
          src="/image1.png"
          alt="Car 1"
          width={{ base: "90%", md: "85%" }}
          height="auto"
          objectFit="cover"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          top="10%"
          boxShadow="lg"
        />
        {/* Image 2 */}
        <Image
          src="/image2.png"
          alt="Car 2"
          width={{ base: "90%", md: "85%" }}
          height="auto"
          objectFit="cover"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          top="40%"
          boxShadow="lg"
        />
      </Box>
    </Flex>
  );
};

export default TestimonialSection;
