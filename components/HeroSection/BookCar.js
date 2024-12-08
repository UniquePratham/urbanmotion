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
  Wrap,
  WrapItem
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
    <Box p={{base:4,md:12}} ml={{base:0,md:8}} bg="gray.900" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb={6} color="white" textAlign="center">
        Book <span  style={{ color: "#00db00" }}>Your Favourite Cars</span> Today!
      </Heading>

      <VStack flexDir={{ base: "row", md: "column" }}>
        <HStack spacing={{ base: 4, md: 44 }} mb={6} mt={{ base: 0, md: 2 }} justifyContent={{ base: "space-between", md: "space-around" }} alignItems={{ base: "unset", md: "center" }} flexDirection={{ base: "column", md: "unset" }}>
          <Box display="flex" alignItems="center">
            <Image src="/Resources/available-car32.png" alt="Select Car Type" boxSize="40px" />
          </Box>
          <Box display="flex" alignItems="center">
            <Image src="/Resources/rating_cars.png" alt="Select Rating" boxSize="40px" />
          </Box>
          <Box display="flex" alignItems="center">
            <Image src="/Resources/car-fuel-type32.png" alt="Select Fuel Type" boxSize="40px" />
          </Box>
          <Box display="flex" alignItems="center">
            <Image src="/Resources/money 321.png" alt="Select Max Monthly Price" boxSize="40px" />
          </Box>
        </HStack>

        {/* Filters */}
        <HStack spacing={4} mb={6} justify="center" flexDirection={{ base: "column", md: "unset" }}>
          <Select
            onChange={(e) => setCarTypeFilter(e.target.value)}
            defaultValue=""
            value={carTypeFilter}
            bg="gray.100"
            color="black"
          >
            <option value="" disabled>
              Select Car Type
            </option>
            <option value="Electric">Electric</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
          </Select>

          <Select
            onChange={(e) => setRatingFilter(e.target.value)}
            defaultValue=""
            value={ratingFilter}
            bg="gray.100"
            color="black"
          >
            <option value="" disabled>
              Select Rating
            </option>
            <option value="1">1 Star ⭐</option>
            <option value="2">2 Stars ⭐⭐</option>
            <option value="3">3 Stars ⭐⭐⭐</option>
            <option value="4">4 Stars ⭐⭐⭐⭐</option>
            <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
          </Select>

          <Select
            onChange={(e) => setFuelTypeFilter(e.target.value)}
            bg="gray.100"
            color="black"
            defaultValue=""
            value={fuelTypeFilter}
          >
            <option value="" disabled>
              Select Fuel Type
            </option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
          </Select>

          <Select
            onChange={(e) => setPriceFilter(e.target.value)}
            defaultValue=""
            value={priceFilter}
            bg="gray.100"
            color="black"
          >
            <option value="" disabled>
              Select Max Monthly Price
            </option>
            <option value="20000">₹20000</option>
            <option value="30000">₹30000</option>
            <option value="50000">₹50000</option>
          </Select>


        </HStack>
      </VStack>
      {/* Go Button */}
      <HStack justifyContent="center" alignItems="center" mb={4}><Button
        display={{ base: "flex", md: "unset" }}
        alignItems="center"
        fontSize="20px"
        color="black"
        px="4px"
        pt="4px"
        w={{ base: "20%", md: "5%" }}
        borderRadius="md"
        bg="white"
        zIndex={3}
        _hover={{
          bg: "gray.500",
          color: "#00db00",
          transform: "scale(1.05)",
          transition: "0.2s ease-in-out",
        }}
        flexDirection="column-reverse"
        size="md" onClick={handleFilterChange}>
        <Image
          src="/Resources/search-car48.png"
          alt=""
          borderRadius="3"
          p="4px"
          pt="2"
          mt={{ base: "-4", md: "-5" }}
          zIndex={2}
        />
      </Button></HStack>

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
          <Wrap spacing={6} justify="center">
            {filteredCars.map((car) => (
              <WrapItem
                mt={2}
                key={car._id}
                p={{ base: 2, md: 4 }}
                bg="gray.700"
                borderRadius="lg"
                boxShadow="md"
                width={{ base: "90%", md: "45%" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="3px solid gray.300"
                _hover={{
                  transform: "scale(1.005)",
                  transition: "0.1s ease-in-out",
                }}
              >
                <HStack spacing={{ base: 2, md: 6 }} align="center" justify="space-between" flexDir={{ base: "column", md: "unset" }}>
                  {/* Car Image */}
                  <Image
                    src="/car3.png" // Placeholder image (can be dynamic later)
                    alt={car.model}
                    boxSize="200px"
                    objectFit="contain"
                    borderRadius="md"
                    _hover={{
                      transform: "scale(1.01) scaleX(-1)",
                      transition: "0.03s ease-in transform",
                    }}
                    cursor="pointer"
                  />

                  {/* Car Details */}
                  <Box flex="1" >
                    <Heading as="h3" size="md" color="rgba(0,300,0,1)" mb={2} fontFamily="mono">
                      {car.model}
                    </Heading>
                    <Text color="greenyellow" mb={2}>
                      {car.carType} - {car.registrationNumber}
                    </Text>
                    <HStack spacing={1} mb={4}>
                      {calculateStars(car.rating)}
                    </HStack>

                    <HStack flexDir={{ base: "column", md: "unset" }} spacing={4} mb={4}>
                      <Box>
                        <Text color="gray.300" fontSize="sm">
                          Weekly Price
                        </Text>
                        <Text color="green.400" fontWeight="bold">
                          ₹{car.carPricing.weekly}
                        </Text>
                      </Box>

                      <Box>
                        <Text color="gray.300" fontSize="sm">
                          Monthly Price
                        </Text>
                        <Text color="green.400" fontWeight="bold">
                          ₹{car.carPricing.monthly}
                        </Text>
                      </Box>
                    </HStack>

                    {/* Book Now Button */}
                    <Button
                      leftIcon={<FaShoppingCart />}
                      colorScheme="green"
                      variant="outline"
                      bg="gray.200"
                      _hover={{ color: "white", bg: "#00db00" }}
                      onClick={() => handleBooking(car, toast)} // Call booking handler
                    >
                      Book Now
                    </Button>
                  </Box>
                </HStack>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </Box>
  );
};

export default BookCar;
