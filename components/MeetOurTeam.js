import { Box, Heading, Text, Image, Flex, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MeetOurTeam = () => (
  <MotionBox
    as="section"
    h="100vh"
    py={16}
    px={8}
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex h="full" alignItems="center">
      <Box w="50%">
        <Heading fontSize="5xl" color="#00db00">
          Meet{" "}
          <Text as="span" color="white">
            Our Team
          </Text>
        </Heading>
        <Text fontSize="xl" mt={4}>
          A passionate team of experts driving innovation in car rentals.
        </Text>
      </Box>
      <VStack w="50%">
        <Image
          src="https://source.unsplash.com/800x600/?person,team"
          alt="Team"
          w="60%"
          borderRadius="full"
        />
      </VStack>
    </Flex>
  </MotionBox>
);

export default MeetOurTeam;
