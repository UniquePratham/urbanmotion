import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CoreValues = () => (
  <MotionBox
    as="section"
    h="100vh"
    py={16}
    px={8}
    initial={{ opacity: 0, y: -100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex h="full" alignItems="center">
      <Box w="50%">
        <Heading fontSize="5xl" color="white">
          Our{" "}
          <Text as="span" color="#00db00">
            Core Values
          </Text>
        </Heading>
        <Text fontSize="xl" mt={4}>
          We believe in:
          <ul>
            <li>
              <strong>Integrity:</strong> Building trust with honesty and
              transparency.
            </li>
            <li>
              <strong>Customer First:</strong> Prioritizing your needs.
            </li>
            <li>
              <strong>Innovation:</strong> Driving progress through technology.
            </li>
            <li>
              <strong>Sustainability:</strong> Being kind to the planet.
            </li>
          </ul>
        </Text>
      </Box>
      <Image
        src="/values.webp"
        alt="Core Values"
        w="50%"
        borderRadius="md"
        boxShadow="xl"
      />
    </Flex>
  </MotionBox>
);

export default CoreValues;
