import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const AdminDashboard = () => {
  return (
    <Box p={6} bg="gray.800" borderRadius="lg">
      <Heading color="white" mb={4}>
        Admin Dashboard
      </Heading>
      <Text color="gray.400" mb={6}>
        Welcome to the admin dashboard. Manage users, view analytics, and
        perform other administrative tasks.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="red" w="full">
          Manage Users
        </Button>
        <Button colorScheme="red" w="full">
          View Analytics
        </Button>
        <Button colorScheme="red" w="full">
          Site Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;
