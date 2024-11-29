import { Box, Text, Flex } from "@chakra-ui/react";

const DiscountBanner = () => {
  return (
    <Box
      bgGradient="linear(to-r, green.500, green.700)"
      color="white"
      p={8}
      borderRadius="md"
      boxShadow="xl"
      textAlign="center"
    >
      <Text fontSize="3xl" fontWeight="bold">
        Black Friday Discounts
      </Text>
      <Text fontSize="xl" mt={2}>
        Up to{" "}
        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>50%</span> off
        on luxury rentals!
      </Text>
    </Box>
  );
};

export default DiscountBanner;
