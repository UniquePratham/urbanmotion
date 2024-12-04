import { VStack, Button } from "@chakra-ui/react";

const DashboardActions = () => {
  return (
    <VStack spacing={4} mt={6}>
      <Button colorScheme="teal" w="full">
        My Bookings
      </Button>
      <Button colorScheme="teal" w="full">
        Book a Car
      </Button>
      <Button colorScheme="teal" w="full">
        Account Settings
      </Button>
    </VStack>
  );
};

export default DashboardActions;
