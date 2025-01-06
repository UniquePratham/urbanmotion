import { Box, Heading, Text, Grid, GridItem, Spinner, Alert, AlertIcon, Image, IconButton, useToast, Icon, HStack, VStack, Select, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CldImage } from 'next-cloudinary';
import { CopyIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaFilter,
  FaSortUp,
  FaRedo,
  FaSave,
  FaEdit
} from "react-icons/fa";


const Cars = () => {
  const [cars, setCars] = useState([]);
  const [retailerData, setRetailerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("");
  const [isVisible, setIsVisible] = useState(true); // State to track visibility
  const [isFiltered, setIsFiltered] = useState(false); // State to track visibility
  const toast = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      // Fetch all cars
      const carRes = await fetch("https://urban-motion-backend.vercel.app/api/cars/all-cars");
      const carData = await carRes.json();

      // Fetch retailer data using session ID
      const sessionId = localStorage.getItem("sessionId");
      if (sessionId) {
        const retailerRes = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
        const retailerData = await retailerRes.json();
        setRetailerData(retailerData);
        // Filter cars based on retailer's carSubmittedArray
        const carsSubmittedIdArray = retailerData.data.carsSubmittedIdArray || [];
        const filteredCars = carData.cars.filter((car) => carsSubmittedIdArray.includes(car._id));
        setCars(filteredCars);
        setFilteredCars(filteredCars);
      } else {
        setError("Session ID not found. Please log in again.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch car data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
        mt={64}
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
        <Spinner size="xl" color="green" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  const handleFilterChange = () => {
    setIsLoading(true); // Show spinner when filters are applied
    setIsFiltered(true);
    let filtered = cars;

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

    // Show a message if no cars match the filters
    if (filtered.length === 0) {
      setError("No cars match the applied filters.");
    }
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

  const onCopy = () => {
    toast({
      title: "Car Registration Number Copied.",
      description: "Car Registration Number Copied Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggle = () => {
    setIsVisible((prev) => !prev); // Toggle visibility state
  };
  const handleResetorClearFilter = () => {
    // Reset the value of all select elements with specific IDs
    setIsFiltered(false);
    setIsLoading(true);
    setRatingFilter("");
    setFuelTypeFilter("");
    setPriceFilter("");
    fetchCars();
  };


  const handleEditClick = () => {
    setIsFlipped(!isFlipped);
    setIsEditable(!isEditable);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box p={4} bg="gray.800" borderRadius="md" boxShadow="md" maxH="100vh" overflowY="scroll">
      <Box textAlign="center" mb={6}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Image src="/Resources/Vehicles.png" alt="" h="50px" mr={2} />
          <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
            My Cars
          </Heading>
        </Box>
        <Text color="gray.400">
          Here you can view the all the cars that are in your inventory.
        </Text>
      </Box>
      {/* Filters */}
      {filteredCars.length > 0 && (
        <>
          <VStack flexDir={{ base: "row", md: "column" }} style={{ display: isVisible ? "flex" : "none" }}>
            <HStack spacing={{ base: 4, md: 44 }} mb={2} mt={{ base: 0, md: 2 }} justifyContent={{ base: "space-between", md: "space-around" }} alignItems={{ base: "unset", md: "center" }} flexDirection={{ base: "column", md: "unset" }}>
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
            <HStack spacing={4} mb={2} justify="center" flexDirection={{ base: "column", md: "unset" }} style={{ display: isVisible ? "flex" : "none" }}>
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
                <option value="Hybrid">Hybrid</option>
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
          <HStack justifyContent="center" alignItems="center" mb={3} mt={2} style={{ display: isVisible ? "flex" : "none" }}><Button
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
            size="md" onClick={() => {
              handleFilterChange();
              handleToggle();
            }}
          >
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
        </>
      )}
      {filteredCars.length > 0 ? (
        <Grid templateColumns="repeat(auto-fit, minmax(1, 1fr))" gap={4}>
          {filteredCars.map((car) => (
            <GridItem
              key={car._id}
              p={4}
              pb={10}
              bg="gray.700"
              border="1px solid #00db00"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
              transition="all 0.3s"
            >
              <IconButton
                aria-label="Menu"
                // icon={isEditable ? <FaSave /> : <FaEdit />}
                icon={<FaEdit />}
                bg="transparent"
                color="white"
                fontSize={{ base: "16px", md: "24px" }}
                _hover={{
                  color: "#00db00",
                }}
                // onClick={isEditable ? handleSave : handleEditClick}
                position="sticky"
                zIndex={12}
              />
              <Grid templateColumns="1fr 2fr" gap={4} alignItems="center">

                {/* Left Column: Car Image */}
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
                    src="car3.png"
                    alt="Car Image"
                    style={{
                      width: "250px",
                      height: "150px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                    boxSize={{ base: "unset", md: "300px" }} // Adjust size as needed
                    objectFit="contain"
                    _hover={{
                      transform: "scale(1.01) scaleX(-1)",
                      transition: "0.03s ease-in transform",
                    }}
                  />)}

                </Box>

                {/* Right Column: Car Details */}
                <Box>
                  <Heading as="h3" size="xl" color="#00db00" mb={2} >
                    {car.model || "Car Name"}
                  </Heading>
                  <Grid templateColumns="repeat(2, 3fr)" gap={3}>
                    <Text fontSize="sm" mb={2}>
                      <Text as="span" color="lightgreen">Registration No:</Text> {car.registrationNumber}
                      <CopyToClipboard text={car.registrationNumber}>
                        <IconButton
                          icon={<CopyIcon />}
                          size="sm"
                          aria-label="Copy registration number"
                          ml={2} // Add margin-left to space out the button from the text
                          variant="ghost" // Optional: for a subtle button style
                          colorScheme="green" // Optional: set color
                          onClick={onCopy}
                        />
                      </CopyToClipboard>
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <Text as="span" color="lightgreen">Is Handed:</Text> {car.isHanded ? "Yes" : "No"}
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <Text as="span" color="lightgreen">Car Fuel Type:</Text> {car.carType || "N/A"}
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <HStack
                        spacing={1}
                        mb={4}
                        justify={{ base: "center", md: "start" }}
                      >
                        <Text as="span" color="lightgreen">Rating:</Text> {car.rating > 0 ? calculateStars(car.rating) : "No rating yet"}
                      </HStack>
                    </Text>
                  </Grid>
                  <Box mt={2}>
                    <Text fontSize="sm" mb={1} color="lightgreen">
                      Car Pricing:
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                      <Text fontSize="sm">- Weekly: ${car.carPricing?.weekly || "N/A"}</Text>
                      <Text fontSize="sm">- Monthly: ${car.carPricing?.monthly || "N/A"}</Text>
                      <Text fontSize="sm">- Quarterly: ${car.carPricing?.quarterly || "N/A"}</Text>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </GridItem>

          ))}
        </Grid>
      ) : isFiltered ? (<Box
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
      </Box>
      ) : (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="75vh"
        flexDirection="column"
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
        <Text color="greenyellow" mb={2}>
          No cars found in your inventory. Add a new car from Add Car Section to get started!
        </Text>
      </Box>)}
    </Box>
  );
};

export default Cars;
