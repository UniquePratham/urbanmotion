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
    description: "4-seater car for you",
    price: 229,
    originalPrice: 300,
    rating: 4.5,
  },
  {
    id: 2,
    image: "/car2.png",
    name: "Hyundai Solaris",
    description: "Compact and stylish",
    price: 249,
    originalPrice: 320,
    rating: 4.2,
  },
  {
    id: 3,
    image: "/car3.png",
    name: "Hyundai Tucson",
    description: "Luxury SUV for adventure",
    price: 299,
    originalPrice: 400,
    rating: 4.7,
  },
  {
    id: 4,
    image: "/car3.png",
    name: "Toyota Corolla",
    description: "Reliable sedan for city life",
    price: 189,
    originalPrice: 250,
    rating: 4.8,
  },
  {
    id: 4,
    image: "/car3.png",
    name: "Toyota Corolla",
    description: "Reliable sedan for city life",
    price: 189,
    originalPrice: 250,
    rating: 4.8,
  },
  {
    id: 4,
    image: "/car3.png",
    name: "Toyota Corolla",
    description: "Reliable sedan for city life",
    price: 189,
    originalPrice: 250,
    rating: 4.8,
  },
];

const BookCar = () => {
  return (
    <Box
      bgColor="#0f131c"
      color="#10141e"
      py="12"
      px={{ base: "4", lg: "12" }}
      backgroundImage="url('/green_bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      // backgroundBlendMode="overlay"
    >
      {/* Heading and Search Section */}
      <Box textAlign="center" mb="8">
        <Heading
          as="h1"
          color="white"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          mb="6"
        >
          Book Your{" "}
          <Text as="span" color="#00db00">
            Car Today!
          </Text>
        </Heading>
        <Flex justify="center" align="center" mb="8">
          <InputGroup maxW="700px" w="100%">
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

      {/* Filters Section */}
      <Flex justify="center" gap="4" wrap="wrap" mb="8" mx="auto" maxW="1000px">
        <Select
          placeholder="Select Brand"
          bg="white"
          color="gray.800"
          w={{ base: "100%", md: "200px" }}
          _hover={{ borderColor: "#00db00" }}
        />
        <Select
          placeholder="Select Size"
          bg="white"
          color="gray.800"
          w={{ base: "100%", md: "200px" }}
          _hover={{ borderColor: "#00db00" }}
        />
        <Select
          placeholder="Price Range"
          bg="white"
          color="gray.800"
          w={{ base: "100%", md: "200px" }}
          _hover={{ borderColor: "#00db00" }}
        />
        <Button bg="#00db00" color="white" _hover={{ bg: "cyan.400" }}>
          Search
        </Button>
      </Flex>

      {/* Cars Grid Section */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        spacing="6"
        mx="auto"
        maxWidth={{ base: "100%", lg: "80%" }}
      >
        {cars.map((car) => (
          <Box
            key={car.id}
            bg="rgba(15, 19, 28, 0.8)" // Semi-transparent dark color
            p="6"
            borderRadius="md"
            boxShadow="lg"
            border="1px solid rgba(0, 219, 0, 0.6)" // Greenish border with opacity
            backdropFilter="blur(10px)" // Glass effect
            _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
            transition="all 0.3s ease"
            maxW="sm"
            mx="auto"
            w="100%"
          >
            <Image src={car.image} alt={car.name} borderRadius="md" />
            <Flex mt="4" align="center" justify="space-between">
              <Text fontSize="xl" fontWeight="bold" color="white">
                {car.name}
              </Text>
              <Flex gap="1">
                {[...Array(Math.floor(car.rating))].map((_, index) => (
                  <FaStar key={index} color="yellow.400" />
                ))}
                {car.rating % 1 !== 0 && (
                  <FaStar key="half" color="yellow.400" />
                )}
                <Text ml="2" fontSize="sm" color="gray.300">
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
                color="gray.500"
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
                colorScheme="green"
                size="sm"
                _hover={{ bg: "green.100" }}
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
