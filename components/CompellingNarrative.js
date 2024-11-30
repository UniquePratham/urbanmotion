import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CompellingNarrative = () => (
  <MotionBox
    as="section"
    h="100vh"
    py={16}
    px={8}
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex h="full" alignItems="center">
      <Box w="50%">
        <Heading fontSize="5xl" color="white">
          Our{" "}
          <Text as="span" color="#00db00">
            Journey
          </Text>
        </Heading>
        <Text fontSize="xl" mt={4}>
          Founded with the vision to make mobility effortless and affordable,
          our car rental service has become a cornerstone for thousands of happy
          customers. Our journey began in a small garage and has expanded to
          serve across the nation.
        </Text>
      </Box>
      <Image
        src="/journey.webp"
        alt="Our journey"
        w="50%"
        borderRadius="md"
        boxShadow="xl"
      />
    </Flex>
  </MotionBox>
);

export default CompellingNarrative;
