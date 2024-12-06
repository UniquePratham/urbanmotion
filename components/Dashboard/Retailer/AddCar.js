import { Box, Heading, Text } from "@chakra-ui/react";

const AddCar = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Add Car
      </Heading>
      <Text>
        Here, you can add new cars to your inventory. Fill in the necessary
        details such as make, model, year, and availability status.
      </Text>
      {/* Add form for adding a car */}
    </Box>
  );
};

export default AddCar;
