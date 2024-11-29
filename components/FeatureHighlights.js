import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaDollarSign, FaCar, FaHeadset } from "react-icons/fa";

const FeatureHighlights = () => {
  const features = [
    { icon: FaDollarSign, title: "Affordable Rates" },
    { icon: FaCar, title: "Wide Selection of Cars" },
    { icon: FaHeadset, title: "24/7 Customer Support" },
  ];

  return (
    <Flex
      bg="gray.800"
      color="white"
      py={8}
      px={4}
      justify="space-around"
      wrap="wrap"
      gap={6}
      borderRadius="md"
    >
      {features.map((feature, index) => (
        <Box
          key={index}
          textAlign="center"
          p={4}
          borderWidth="1px"
          borderColor="green.500"
          borderRadius="lg"
          boxShadow="lg"
          w="250px"
        >
          <Icon as={feature.icon} boxSize={8} color="green.400" />
          <Text fontWeight="bold" fontSize="xl" mt={4}>
            {feature.title}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default FeatureHighlights;
