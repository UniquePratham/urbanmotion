import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MissionStatement = () => (
  <MotionBox
    as="section"
    h="100vh"
    py={16}
    px={8}
    initial={{ opacity: 0, x: 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Flex
      h="full"
      alignItems="center"
      flexDirection={{ base: "column-reverse", md: "row" }}
    >
      <Image
        src="/mission.png"
        alt="Mission"
        w="50%"
        borderRadius="md"
        boxShadow="xl"
      />
      <Box w="50%" textAlign="right">
        <Heading fontSize="5xl" color="#00db00">
          Our{" "}
          <Text as="span" color="white">
            Mission
          </Text>
        </Heading>
        <Text fontSize="xl" mt={4}>
          To provide seamless, reliable, and sustainable mobility solutions that
          prioritize customer satisfaction and environmental responsibility.
          Every step we take is to make your travel simpler and better.
        </Text>
      </Box>
    </Flex>
  </MotionBox>
);

export default MissionStatement;
