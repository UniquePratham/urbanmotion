import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Select,
  SimpleGrid,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { FaShoppingCart, FaStar, FaSearch } from "react-icons/fa";

const cars = [
  {
    id: 1,
    image: "/car1.png",
    name: "Hyundai Solaris",
    description: "4 seated car for you",
    price: 229,
    originalPrice: 300,
    rating: 4.5,
  },
  {
    id: 2,
    image: "/car2.png",
    name: "Hyundai Solaris",
    description: "4 seated car for you",
    price: 229,
    originalPrice: 300,
    rating: 4.2,
  },
  {
    id: 3,
    image: "/car3.png",
    name: "Hyundai Solaris",
    description: "4 seated car for you",
    price: 229,
    originalPrice: 300,
    rating: 4.7,
  },
  {
    id: 4,
    image: "/car3.png",
    name: "Hyundai Solaris",
    description: "4 seated car for you",
    price: 229,
    originalPrice: 300,
    rating: 4.7,
  },
  {
    id: 5,
    image: "/car3.png",
    name: "Hyundai Solaris",
    description: "4 seated car for you",
    price: 229,
    originalPrice: 300,
    rating: 4.7,
  },
];

const BookCar = () => {
  return (
    <Box bg="#10141e" color="white" ml={{ md: "60px" }} py="8" px="6">
      <Box textAlign="center" mb="6">
        <Heading as="h1" fontSize="4xl" fontWeight="bold" mb="8">
          Book your{" "}
          <Text as="span" color="#00db00">
            car today!
          </Text>
        </Heading>
        <Flex justify="center" align="center" mb="6">
          <InputGroup w="700px">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="Search for cars..."
              bg="white"
              color="gray.800"
              px="4"
              py="2"
              borderRadius="md"
              _focus={{ borderColor: "#00db00" }}
            />
          </InputGroup>
        </Flex>
      </Box>

      <Flex justify="center" gap="4" wrap="wrap" mb="8">
        <Select
          placeholder="Select Brand"
          bg="white"
          color="gray.800"
          w="200px"
          _hover={{ borderColor: "#00db00" }}
        />
        <Select
          placeholder="Select Size"
          bg="white"
          color="gray.800"
          w="200px"
          _hover={{ borderColor: "#00db00" }}
        />
        <Select
          placeholder="Price Range"
          bg="white"
          color="gray.800"
          w="200px"
          _hover={{ borderColor: "#00db00" }}
        />
        <Button bg="#00db00" color="white" _hover={{ bg: "cyan.400" }}>
          Search
        </Button>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing="0"
        mx="auto"
        maxWidth="100%"
      >
        {cars.map((car) => (
          <Box
            key={car.id}
            bg="gray.900"
            p="4"
            mt={4}
            borderRadius="md"
            boxShadow="lg"
            _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
            transition="all 0.3s ease"
            maxW="xs"
            w="100%"
          >
            <Image src={car.image} alt={car.name} borderRadius="md" />
            <Flex mt="4" align="center" justify="space-between">
              <Text fontSize="xl" fontWeight="bold">
                {car.name}
              </Text>
              <Flex gap="1">
                {[...Array(Math.floor(car.rating))].map((_, index) => (
                  <FaStar key={index} color="yellow.400" />
                ))}
                {car.rating % 1 !== 0 && (
                  <FaStar key="half" color="yellow.400" />
                )}
                <Text ml="2" fontSize="sm" color="gray.400">
                  {car.rating.toFixed(1)}
                </Text>
              </Flex>
            </Flex>
            <Text mt="2" color="gray.400">
              {car.description}
            </Text>
            <Text mt="2" fontSize="lg" fontWeight="bold" color="#00db00">
              ${car.price}{" "}
              <Text
                as="span"
                fontSize="sm"
                color="gray.400"
                textDecoration="line-through"
              >
                ${car.originalPrice}
              </Text>
            </Text>

            <Flex mt="4" justify="space-between" align="center">
              <IconButton
                icon={<FaShoppingCart />}
                aria-label="Add to Cart"
                variant="outline"
                colorScheme="teal"
                size="sm"
                _hover={{ bg: "cyan.400" }}
              />
              <Button
                bg="#00db00"
                color="white"
                size="sm"
                w="auto"
                _hover={{ bg: "cyan.400" }}
              >
                Buy Now
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BookCar;
