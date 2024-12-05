import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const MainContent = ({ customerData }) => {
  const bgColor = useColorModeValue("gray.800", "gray.800");

  return (
    <Box flex="1" p={6} bg={bgColor} borderRadius="lg">
      <Heading color="teal.400" mb={4}>
        Welcome, {customerData?.name || "Guest"}!
      </Heading>
      <Text color="gray.400" mb={6}>
        Here&apos;s your dashboard where you can manage bookings, account
        settings, and more.
      </Text>
      {customerData ? (
        <Box color="gray.100">
          <Text>Name: {customerData.name}</Text>
          <Text>Email: {customerData.email}</Text>
        </Box>
      ) : (
        <Text>Loading customer details...</Text>
      )}
    </Box>
  );
};

export default MainContent;
