import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const MainContent = ({ retailerData }) => {
  const bgColor = useColorModeValue("gray.800", "gray.800");

  return (
    <Box flex="1" p={6} bg={bgColor} borderRadius="lg">
      <Heading color="teal.400" mb={4}>
        Welcome, {retailerData?.name || "Retailer"}!
      </Heading>
      <Text color="gray.400" mb={6}>
        Here&apos;s your dashboard where you can manage cars, bookings, account
        settings, and more.
      </Text>
      {retailerData ? (
        <Box color="gray.100">
          <Text>Name: {retailerData.name}</Text>
          <Text>Email: {retailerData.email}</Text>
          {/* You can add more fields relevant to the retailer */}
        </Box>
      ) : (
        <Text>Loading retailer details...</Text>
      )}
    </Box>
  );
};

export default MainContent;
