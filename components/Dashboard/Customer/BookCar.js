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
  useToast, // Import useToast hook for displaying toasts
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter for redirection

const BookCar = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carTypeFilter, setCarTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const toast = useToast(); // To display toast messages
  const router = useRouter(); // Hook for redirection

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
  }, [router]); // Re-run if router changes

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

  const handleBooking = async (car, toast, onClose) => {
    toast({
      title: "Confirm Booking",
      description: `Do you want to book ${car.model}?`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
      render: ({ onClose }) => (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            color="white"
            p={6}
            bg="teal.500"
            borderRadius="md"
            fontSize="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="xl"
            width="auto"
          >
            <Text mb={4} fontSize="xl" fontWeight="bold">
              Do you want to book {car.model}?
            </Text>
            <HStack spacing={6}>
              <Button
                colorScheme="green"
                size="lg"
                onClick={async () => {
                  try {
                    // Send request to book the car
                    const response = await axios.post(
                      "https://urban-motion-backend.vercel.app/api/cars/book-car",
                      { registrationNumber: car.registrationNumber }
                    );

                    if (response.status === 200) {
                      // Store the registration number in local storage
                      localStorage.setItem(
                        "carRegistrationNumber",
                        car.registrationNumber
                      );

                      // Optionally store full booking details in local storage
                      localStorage.setItem(
                        "bookingDetails",
                        JSON.stringify(response.data)
                      );

                      // Show success toast after booking the car
                      toast({
                        title: "Booking Confirmed",
                        description: `You have successfully booked the ${car.model}. You can view the status in the Bookings tab of your dashboard.`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                        render: () => (
                          <Box
                            color="white"
                            p={6}
                            bg="green.500"
                            borderRadius="md"
                            fontSize="lg"
                            boxShadow="xl"
                          >
                            <Text>
                              You have successfully booked the {car.model}. You
                              can view the status in the Bookings tab of your
                              dashboard.
                            </Text>
                          </Box>
                        ),
                      });
                    }
                  } catch (error) {
                    console.error("Error booking car:", error);
                  }
                  onClose();
                }}
              >
                Yes
              </Button>
              <Button colorScheme="red" size="lg" onClick={onClose}>
                No
              </Button>
            </HStack>
          </Box>
        </motion.div>
      ),
    });
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
          color="white" // Ensure input text is white
        >
          <option value="Electric">Electric</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
        </Select>

        <Select
          placeholder="Select Rating"
          onChange={(e) => setRatingFilter(e.target.value)}
          color="white" // Ensure input text is white
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
          color="white" // Ensure input text is white
        >
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
        </Select>

        <Select
          placeholder="Max Monthly Price"
          onChange={(e) => setPriceFilter(e.target.value)}
          color="white" // Ensure input text is white
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
                    </Stack>

                    {/* Book Now Button */}
                    <Button
                      leftIcon={<FaShoppingCart />}
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => handleBooking(car, toast)} // Call booking handler
                    >
                      Book Now
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
