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
  WrapItem,
  Input,
  useToast,
  IconButton,
  Checkbox,
  Flex
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaFilter,
  FaSortUp,
  FaRedo
} from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/router";


const BookCar = () => {
  const router = useRouter();
  const toast = useToast(); // To display toast messages
  const [cars, setCars] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  let [carBooked, setCarBooked] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carModelFilter, setCarModelFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [isVisible, setIsVisible] = useState(true); // State to track Visibility
  const [isChecked, setIsChecked] = useState(false); // State to track Checkbox

  useEffect(() => {
    // Fetching available cars data
    const fetchCustomerData = async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (sessionId) {
        try {
          const response = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
          const data = await response.json();
          return data.data; // Return the customer data
        } catch (error) {
          console.error("Failed to fetch customer data:", error);
          return null;
        }
      }
      return null;
    };
    const fetchDataBeforeBooking = async () => {
      const customerData = await fetchCustomerData();
      if (customerData && customerData._id) {
        setCustomerData(customerData); // Update state
      }
    };
    fetchCars();
    fetchDataBeforeBooking();
  }, []);

  const fetchCars = async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(
        "https://urban-motion-backend.vercel.app/api/cars/get-available-cars"
      );
      const availableCars = response.data.cars.filter((car) => !car.isHanded);
      setCars(availableCars);
      setFilteredCars(availableCars.slice(0, 6));
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };

  const handleFilterChange = () => {
    setIsLoading(true); // Show spinner when filters are applied
    let filtered = cars;

    // Filter by car type
    if (carModelFilter) {
      filtered = filtered.filter((car) => car.carType === carModelFilter);
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
      filtered = filtered.filter((car) => car.carType === fuelTypeFilter);
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
    const userType = localStorage.getItem("userType");
    if (userType) {
      if (userType === "customer") {
        if (customerData) {
          if (customerData.carCurrentlyBookedId) {
            toast({
              title: "Car Already Booked",
              description: "Please return the current car before booking a new one.",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
            return;
          }
          carBooked = car;
          setCarBooked(car);
          const handleInputChange = (e) => {
            car.durationGivenFor = `${e.target.value} days`;
            setCarBooked(car);
          };
          if (carBooked) {
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
                    p={{ base: 2, md: 6 }}
                    bg="black"
                    borderRadius="xl"
                    fontSize={{ base: "md", md: "lg" }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    boxShadow="xl"
                    width={{ base: "350px", md: "500px" }}
                    marginTop="48"
                  >
                    <Text mb={4} fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
                      Do you want to book {carBooked.model}?
                    </Text>
                    <Input
                      size={{ base: "xs", md: "md" }}
                      placeholder="For how many days would you like to book this car?"
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
                            const response = await axios.post(
                              "https://urban-motion-backend.vercel.app/api/cars/book-car",
                              { registrationNumber: carBooked.registrationNumber, customerId: customerData._id, durationGivenFor: carBooked.durationGivenFor }
                            );

                            if (response.status === 200) {
                              setIsLoading(true);
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
                            setTimeout(() => {
                              setIsLoading(false);
                              fetchCars();
                            }, 5000);
                          } catch (error) {
                            console.error("Error booking car:", error);
                          }
                          fetchCars();
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
          }
        } else {
          toast({
            title: "Warning",
            description: "Please log in to our website first to proceed with booking a car.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => {
            router.push("/signin");
          }, 500);
        }
      }
      else if (userType === "retailer") {
        toast({
          title: "Warning",
          description: "You are a retailer. Please sign in with a Customer ID to book a car.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
      else {
        toast({
          title: "Warning",
          description: "You are an admin. Please sign in with a Customer ID to book a car.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleToggle = () => {
    setIsVisible((prev) => !prev); // Toggle visibility state
  };
  const onToggle = (isChecked) => {
    if (isChecked) {
      setFilteredCars(cars);
    }
    else {
      setFilteredCars(cars.slice(0, 6));
    }
  };

  const handleResetorClearFilter = () => {
    // Reset the value of all select elements with specific IDs
    setCarModelFilter("");
    setRatingFilter("");
    setFuelTypeFilter("");
    setPriceFilter("");
    fetchCars();
  };

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onToggle(newValue);
  };

  return (
    <>
      <Box p={{ base: 4, md: 12 }} ml={{ base: 0, md: 8 }} bg="gray.900" boxShadow="lg" maxH={{ base: isVisible ? "600px" : "200px", md: isVisible ? "460px" : "200px" }}>
        <Heading as="h1" size="lg" mb={2} color="white" textAlign="center">
          Book <span style={{ color: "#00db00" }}>Your Favourite Cars</span> Today!
        </Heading>
        <Text color="gray.400" textAlign="center" mb={4}>
          You can search and book a car, with or without filters.
        </Text>

        <VStack flexDir={{ base: "row", md: "column" }} style={{ display: isVisible ? "flex" : "none" }}>
          <HStack spacing={{ base: 4, md: 44 }} mb={{ base: 4, md: 2 }} mt={{ base: 0, md: 2 }} justifyContent={{ base: "space-between", md: "space-around" }} alignItems={{ base: "unset", md: "center" }} flexDirection={{ base: "column", md: "unset" }}>
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
          <HStack spacing={4} mb={{ base: 4, md: 2 }} justify="center" flexDirection={{ base: "column", md: "unset" }} style={{ display: isVisible ? "flex" : "none" }}>
            <Select
              onChange={(e) => setCarModelFilter(e.target.value)}
              defaultValue=""
              value={carModelFilter}
              bg="gray.100"
              color="black"
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.7)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <option value="" disabled>
                Select Car Model
              </option>
              <option value="Tesla">Tesla</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Mercedes">Mercedes</option>
              <option value="BMW">BMW</option>
            </Select>

            <Select
              onChange={(e) => setRatingFilter(e.target.value)}
              defaultValue=""
              value={ratingFilter}
              bg="gray.100"
              color="black"
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.7)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
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
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.7)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </Select>

            <Select
              onChange={(e) => setPriceFilter(e.target.value)}
              defaultValue=""
              value={priceFilter}
              bg="gray.100"
              color="black"
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.7)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
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
        <HStack justifyContent="center" alignItems="center" mb={4} style={{ display: isVisible ? "flex" : "none" }}><Button
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
        <HStack justifyContent="center" alignItems="center" mb={3} mt={2} style={{ display: isVisible ? "flex" : "none" }}>
          <Checkbox
            colorScheme="green"
            size="lg"
            isChecked={isChecked}
            onChange={handleCheckboxChange}
          >
            <Text color="gray.100">
              Show All Available Cars
            </Text>
          </Checkbox>
        </HStack>
        <HStack justifyContent="center" alignItems="center" mb={3} mt={2} style={{ display: isVisible ? "flex" : "none" }}>
          <IconButton
            aria-label="Menu"
            icon={<FaRedo />}
            display={{ base: "flex", md: "flex" }}
            bg="transparent"
            color="#00db00"
            fontSize="24px"
            _hover={{
              color: "gray.500",
            }}
            onClick={handleResetorClearFilter}
            transition="transform 0.2s"
            transform={!isVisible ? "rotate(360deg)" : "rotate(0deg)"}
          />
        </HStack>
        <HStack justifyContent="center" alignItems="center" mb={3} mt={2} display={{ base: "flex", md: "flex" }}>
          <IconButton
            aria-label="Menu"
            icon={isVisible ? <FaSortUp /> : <FaFilter />}
            display={{ base: "flex", md: "flex" }}
            bg="transparent"
            color="#00db00"
            fontSize="24px"
            _hover={{
              color: "gray.500",
            }}
            onClick={handleToggle}
            transition="transform 0.2s"
            transform={!isVisible ? "rotate(360deg)" : "rotate(0deg)"}
          />
        </HStack>
      </Box>

      {/* Spinner while cars are loading */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bg="gray.900"
          p={16}
          minH="200px"
          width="100%"
        >
          <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
          <Spinner size="xl" color="green" />
        </Box>
      ) : filteredCars.length === 0 ? (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
        <Text color="greenyellow" mb={2}>
          Sorry, no cars match your filters. Please try adjusting your search criteria.
        </Text>
      </Box>) : (
        // Car Listings
        <Box maxH={{ base: "auto", md: "auto" }} p={6} bg="gray.900" pl={{ base: "6", md: 16 }} width="100%" borderRadius={0}>
          <Wrap spacing={6} justify="center">
            {filteredCars.map((car) => (
              <WrapItem
                mt={2}
                key={car._id}
                p={{ base: 2, md: 4 }}
                bg="gray.700"
                borderRadius="lg"
                boxShadow="md"
                width={{ base: "90%", md: "30%" }}
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
                  <Box width="250px"
                    height="150px"
                    overflow="hidden"
                    borderRadius="8px"
                    _hover={{
                      transform: "scale(1.01) scaleX(-1)",
                      transition: "transform 0.3s ease-in",
                    }}>
                    {car.carImage ? (<CldImage
                      src={car.carImage}
                      alt="Car Image"
                      width="250"
                      height="150"
                      style={{
                        width: "250px",
                        height: "150px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />) : (<Image
                      src="/dummy_car.png"
                      alt={car.model}
                      boxSize={{ base: "150px", md: "200px" }}
                      objectFit="contain"
                      borderRadius="md"
                      _hover={{
                        transform: "scale(1.01) scaleX(-1)",
                        transition: "0.03s ease-in transform",
                      }}
                      cursor="pointer"
                      mx="auto"
                    />
                    )}
                  </Box>

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
                    <Flex justifyContent={{ base: "center", md: "unset" }} width="100%">
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
                    </Flex>
                  </Box>
                </HStack>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </>
  );
};

export default BookCar;
