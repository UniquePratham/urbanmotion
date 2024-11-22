import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Flex
      direction="column"
      bg="gray.900"
      color="white"
      padding="2rem"
      align="center"
      justify="center"
      textAlign="center"
    >
      {/* Top Section */}
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxW="1200px"
        mb="4"
      >
        <Box textAlign="left">
          <Heading size="lg" mb="2">
            100+
          </Heading>
          <Text>Types of machines</Text>
        </Box>
        <Image
          src="/car.jpg" // Replace with your image path
          alt="Car"
          borderRadius="lg"
          width="50%"
        />
        <Box textAlign="left">
          <Heading size="lg" mb="2">
            20k+
          </Heading>
          <Text>Clients served</Text>
        </Box>
      </Flex>

      {/* Main Content */}
      <Heading size="2xl" mb="4" fontWeight="bold">
        Rent the best cars
      </Heading>
      <Text maxW="700px" mb="6">
        We want you to have a stress-free rental experience, so we make it easy
        to hire a car by providing simple search tools, customer reviews, and
        plenty of pick-up locations across the city.
      </Text>
      <Button
        bg="green.400"
        color="white"
        _hover={{ bg: "green.500" }}
        size="lg"
        mb="6"
      >
        Open Catalog
      </Button>

      {/* Search Section */}
      <Stack
        direction="row"
        bg="gray.800"
        borderRadius="lg"
        padding="1rem"
        spacing="4"
        maxW="800px"
        width="100%"
        align="center"
      >
        <Input placeholder="Choose a location" bg="gray.700" color="white" />
        <Input placeholder="Pick-up date" bg="gray.700" color="white" />
        <Input placeholder="Return date" bg="gray.700" color="white" />
        <Button bg="green.400" color="white" _hover={{ bg: "green.500" }}>
          Search
        </Button>
      </Stack>
    </Flex>
  );
};

export default HeroSection;
    