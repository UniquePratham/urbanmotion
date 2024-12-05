import { Box, Heading, Text } from "@chakra-ui/react";

const CarsBooked = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Cars Booked
      </Heading>
      <Text>
        Here you can see the list of all cars that have been booked by
        customers.
      </Text>
      {/* Add list or table for displaying booked cars */}
    </Box>
  );
};

export default CarsBooked;
