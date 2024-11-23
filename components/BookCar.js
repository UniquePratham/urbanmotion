import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Select,
    SimpleGrid,
    Text,
  } from "@chakra-ui/react";
  
  const cars = [
    {
      id: 1,
      image: "/car1.png", // Replace with actual car image URLs
      name: "Hyundai Solaris",
      description: "4 seated car for you",
      price: 229,
      rating: 5,
    },
    {
      id: 2,
      image: "/car2.png",
      name: "Hyundai Solaris",
      description: "4 seated car for you",
      price: 229,
      rating: 5,
    },
    {
      id: 3,
      image: "/car3.png",
      name: "Hyundai Solaris",
      description: "4 seated car for you",
      price: 229,
      rating: 5,
    },
  ];
  
  const BookCar = () => {
    return (
      <Box bg="#10141e" color="white" py="8" px="6">
        <Box textAlign="center" mb="6">
          <Heading as="h1" fontSize="2xl">
            Book your <Text as="span" color="#00db00">car today!</Text>
          </Heading>
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
          <Select
            placeholder="Rating"
            bg="white"
            color="gray.800"
            w="200px"
            _hover={{ borderColor: "#00db00" }}
          />
          <Button bg="#00db00" color="white" _hover={{ bg: "cyan.400" }}>
            Search
          </Button>
        </Flex>
        
        <SimpleGrid columns={[1, null, 3]} spacing="6">
          {cars.map((car) => (
            <Box
              key={car.id}
              bg="gray.900"
              p="6"
              borderRadius="md"
              boxShadow="lg"
              _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
              transition="all 0.3s ease"
            >
              <Image src={car.image} alt={car.name} borderRadius="md" />
              <Flex mt="4" align="center" justify="space-between">
                <Text fontSize="lg" fontWeight="bold">{car.name}</Text>
                <Flex gap="1">
                  {[...Array(car.rating)].map((_, index) => (
                    <Box
                      key={index}
                      w="4px"
                      h="4px"
                      bg="yellow.400"
                      borderRadius="full"
                    />
                  ))}
                </Flex>
              </Flex>
              <Text mt="2" color="gray.400">{car.description}</Text>
              <Text mt="2" fontSize="xl" fontWeight="bold" color="#00db00">
                ${car.price} <Text as="span" fontSize="sm">/Day</Text>
              </Text>
              <Button
                mt="4"
                bg="#00db00"
                color="white"
                w="full"
                _hover={{ bg: "cyan.400" }}
              >
                Book Now
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };
  
  export default BookCar;
  