import { Box, Heading, Text } from "@chakra-ui/react";

const CarsReturned = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Cars Returned
      </Heading>
      <Text>
        Here you can view the cars that have been returned by customers.
      </Text>
      {/* Add list or table for displaying returned cars */}
    </Box>
  );
};

export default CarsReturned;
