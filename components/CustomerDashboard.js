import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const CustomerDashboard = () => {
  return (
    <Box p={6} bg="gray.800" borderRadius="lg">
      <Heading color="white" mb={4}>
        Customer Dashboard
      </Heading>
      <Text color="gray.400" mb={6}>
        Welcome to your dashboard, here you can track your orders, browse
        products, and manage your account.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="teal" w="full">
          My Orders
        </Button>
        <Button colorScheme="teal" w="full">
          Browse Products
        </Button>
        <Button colorScheme="teal" w="full">
          Account Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default CustomerDashboard;
