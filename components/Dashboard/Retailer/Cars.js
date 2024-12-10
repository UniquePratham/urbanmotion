import { Box, Heading, Text } from "@chakra-ui/react";

const CarsReturned = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        My Cars
      </Heading>
      <Text>
        Here you can view the all the cars that are in your inventory.
      </Text>
      {/* Add list or table for displaying returned cars */}
    </Box>
  );
};

export default CarsReturned;
