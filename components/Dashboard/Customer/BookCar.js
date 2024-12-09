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
  Wrap,
  WrapItem,
  Input
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
  const [customerData, setCustomerData] = useState(null);
  const [cars, setCars] = useState([]);
  let [carBooked, setCarBooked] = useState(null);
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
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setCustomerData(data.data))
        .catch((err) => console.error("Failed to fetch customer data:", err));
    }
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

  const handleBooking = async (car, toast) => {
    carBooked=car;
    setCarBooked(car);
    const handleInputChange = (e) => {
      car.durationGivenFor = `${e.target.value} days`;
      setCarBooked(car);
    };
    if(carBooked){
    toast({
      title: "Confirm Booking",
      description: `Do you want to book ${carBooked.model}?`,
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
            color="#00db00"
            p={6}
            bg="black"
            borderRadius="xl"
            fontSize="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="xl"
            width="500px"
            marginTop="48"
          >
            <Text mb={4} fontSize="xl" fontWeight="bold">
              Do you want to book {carBooked.model}?
            </Text>
            <Input
              placeholder="For many days, you want to book this car for?"
              onChange={handleInputChange}
              bg="gray.100"
              color="black"
              mb={2}
            />
            <HStack spacing={6}>
              <Button
                colorScheme="green"
                size="lg"
                onClick={async () => {
                  try {
                    // Send request to book the car
                    console.log( `registrationNumber: ${carBooked.registrationNumber}, customerId: ${customerData._id}, durationGivenFor: ${carBooked.durationGivenFor}`);
                    const response = await axios.post(
                      "https://urban-motion-backend.vercel.app/api/cars/book-car",
                      { registrationNumber: carBooked.registrationNumber, customerId: customerData._id, durationGivenFor: carBooked.durationGivenFor}
                    );

                    if (response.status === 200) {

                      // Show success toast after booking the car
                      toast({
                        title: "Booking Confirmed",
                        description: `You have successfully booked the ${carBooked.model}. You can view the status in the Bookings tab of your dashboard.`,
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
                              You have successfully booked the {carBooked.model}. You
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
  };

  return (
    <Box p={{ base: 2, md: 6 }} bg="gray.800" borderRadius={"lg"} boxShadow="lg">
      <Box textAlign="center" mb={6}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Image src="/Resources/add-booking48.png" alt="" h="50px" />
          <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
            Book a Car
          </Heading>
        </Box>
        <Text color="gray.400">
          You can search and book a car, with or without filters.
        </Text>
      </Box>
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
          mt={{ base: "-4", md: "-4" }}
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
          <Spinner size="xl" color="green" />
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
