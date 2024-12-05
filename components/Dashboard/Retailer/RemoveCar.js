import { Box, Heading, Text } from "@chakra-ui/react";

const RemoveCar = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Remove Cars
      </Heading>
      <Text>
        Here, you can remove cars from your inventory. Select the car you wish
        to remove.
      </Text>
      {/* Add form or selection for removing a car */}
    </Box>
  );
};

export default RemoveCar;
