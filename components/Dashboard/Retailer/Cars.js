import { Box, Heading, Text, Grid, GridItem, Spinner, Alert, AlertIcon, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [retailerData, setRetailerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Fetch all cars
        const carRes = await fetch("https://urban-motion-backend.vercel.app/api/cars/all-cars");
        const carData = await carRes.json();
        console.log("car Data : ", carData);

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
        } else {
          setError("Session ID not found. Please log in again.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch car data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
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

  return (
    <Box p={4} bg="gray.800" borderRadius="md" boxShadow="md">
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
      {cars.length > 0 ? (
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          {cars.map((car) => (
            <GridItem
              key={car._id}
              p={4}
              bg="gray.700"
              border="1px solid #00db00"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
              transition="all 0.3s"
            >
              <Grid templateColumns="1fr 2fr" gap={4} alignItems="center">
                {/* Left Column: Car Image */}
                <Box>
                  <Image
                    src={car.carImage || "car3.png"}
                    alt="Car Image"
                    style={{
                      width: "250px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    boxSize={{ base: "unset", md: "300px" }} // Adjust size as needed
                    objectFit="contain"
                  />
                </Box>

                {/* Right Column: Car Details */}
                <Box>
                  <Heading as="h3" size="xl" color="#00db00" mb={2} >
                    {car.model || "Car Name"}
                  </Heading>
                  <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                    <Text fontSize="sm">
                      <Text as="span" color="lightgreen">Registration No:</Text> {car.registrationNumber}
                    </Text>
                    <Text fontSize="sm">
                      <Text as="span" color="lightgreen">Is Handed:</Text> {car.isHanded ? "Yes" : "No"}
                    </Text>
                    <Text fontSize="sm">
                      <Text as="span" color="lightgreen">Handed To:</Text> {car.handedTo || "N/A"}
                    </Text>
                    <Text fontSize="sm">
                      <Text as="span" color="lightgreen">Car Type:</Text> {car.carType || "N/A"}
                    </Text>
                    <Text fontSize="sm">
                      <Text as="span" color="lightgreen">Duration Given:</Text> {car.durationGivenFor || "N/A"}
                    </Text>
                    <Text fontSize="sm">
                      <Text as="span" color="lightgreen">Rating:</Text> {car.rating || "No rating yet"}
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
      ) : (
        <Text>No cars found in your inventory.</Text>
      )}
    </Box>
  );
};

export default Cars;
