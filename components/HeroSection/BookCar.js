import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Select,
  Stack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const BookCar = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carTypeFilter, setCarTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  useEffect(() => {
    // Fetching available cars data
    const fetchCars = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          "https://urban-motion-backend.vercel.app/api/cars/get-available-cars"
        );
        const availableCars = response.data.cars.filter((car) => !car.isHanded);
        setCars(availableCars);
        setFilteredCars(availableCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchCars();
  }, []);

  const handleFilterChange = () => {
    setIsLoading(true); // Show spinner when filters are applied
    let filtered = cars;

    // Filter by car type
    if (carTypeFilter) {
      filtered = filtered.filter((car) => car.carType === carTypeFilter);
    }

    // Filter by rating
    if (ratingFilter) {
      filtered = filtered.filter((car) => car.rating >= ratingFilter);
    }

    // Filter by price
    if (priceFilter) {
      filtered = filtered.filter(
        (car) => car.carPricing.monthly <= priceFilter
      );
    }

    // Filter by fuel type
    if (fuelTypeFilter) {
      filtered = filtered.filter((car) => car.fuelType === fuelTypeFilter);
    }

    setFilteredCars(filtered);
    setIsLoading(false); // Hide spinner after filter is applied
  };

  const calculateStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        stars.push(<Icon as={FaStar} key={i} color="yellow.400" />);
      } else {
        stars.push(<Icon as={FaRegStar} key={i} color="yellow.400" />);
      }
    }

    return stars;
  };

  return (
    <Box p={6} bg="gray.900" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb={6} color="teal.400" textAlign="center">
        Book a Car
      </Heading>

      {/* Filters */}
      <HStack spacing={4} mb={6} justify="center">
        <Select
          placeholder="Select Car Type"
          onChange={(e) => setCarTypeFilter(e.target.value)}
        >
          <option value="Electric">Electric</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
        </Select>

        <Select
          placeholder="Select Rating"
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </Select>

        <Select
          placeholder="Select Fuel Type"
          onChange={(e) => setFuelTypeFilter(e.target.value)}
        >
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
        </Select>

        <Select
          placeholder="Max Monthly Price"
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="20000">₹20000</option>
          <option value="30000">₹30000</option>
          <option value="50000">₹50000</option>
        </Select>

        {/* Go Button */}
        <Button colorScheme="teal" size="md" onClick={handleFilterChange}>
          Go
        </Button>
      </HStack>

      {/* Spinner while cars are loading */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Spinner size="xl" color="teal.400" />
        </Box>
      ) : (
        // Car Listings
        <Box overflowY="scroll" maxH="600px" pb={4}>
          <VStack spacing={6}>
            {filteredCars.map((car) => (
              <Box
                key={car._id}
                p={4}
                bg="gray.800"
                borderRadius="lg"
                boxShadow="md"
                width="100%"
              >
                <HStack spacing={6} align="center" justify="space-between">
                  {/* Car Image */}
                  <Image
                    src="/car3.png" // Placeholder image (can be dynamic later)
                    alt={car.model}
                    boxSize="200px"
                    objectFit="cover"
                    borderRadius="md"
                  />

                  {/* Car Details */}
                  <Box flex="1">
                    <Heading as="h3" size="md" color="teal.400" mb={2}>
                      {car.model}
                    </Heading>
                    <Text color="gray.400" mb={2}>
                      {car.carType} - {car.registrationNumber}
                    </Text>
                    <HStack spacing={1} mb={4}>
                      {calculateStars(car.rating)}
                    </HStack>

                    <Stack direction="row" spacing={4} mb={4}>
                      <Box>
                        <Text color="gray.300" fontSize="sm">
                          Weekly Price
                        </Text>
                        <Text color="teal.400" fontWeight="bold">
                          ₹{car.carPricing.weekly}
                        </Text>
                      </Box>
                      <Box>
                        <Text color="gray.300" fontSize="sm">
                          Monthly Price
                        </Text>
                        <Text color="teal.400" fontWeight="bold">
                          ₹{car.carPricing.monthly}
                        </Text>
                      </Box>
                      <Box>
                        <Text color="gray.300" fontSize="sm">
                          Quarterly Price
                        </Text>
                        <Text color="teal.400" fontWeight="bold">
                          ₹{car.carPricing.quarterly}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Action Buttons */}
                  <Box>
                    {/* Buy Now Button */}
                    <Button
                      colorScheme="teal"
                      size="lg"
                      mb={3}
                      variant="outline"
                      border="2px solid"
                      borderColor="teal.400"
                      _hover={{
                        bg: "teal.400",
                        color: "white",
                        transform: "scale(1.1)",
                        transition: "all 0.3s",
                      }}
                      leftIcon={<FaCheckCircle />}
                    >
                      Buy Now
                    </Button>

                    {/* Add to Cart Button */}
                    <Button
                      colorScheme="blue"
                      size="lg"
                      variant="outline"
                      border="2px solid"
                      borderColor="blue.400"
                      _hover={{
                        bg: "blue.400",
                        color: "white",
                        transform: "scale(1.1)",
                        transition: "all 0.3s",
                      }}
                      leftIcon={<FaShoppingCart />}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default BookCar;
