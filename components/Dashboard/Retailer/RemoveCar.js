import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const RemoveCar = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Fetching cars data
    const sessionId = localStorage.getItem("sessionId");
    const fetchRetailerData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
          const data = await response.json();
          return data.data; // Return the customer data
        } catch (error) {
          console.error("Failed to fetch retailer data:", error);
          return null;
        }
      }
      return null;
    };

    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const customerData = await fetchRetailerData();
        if (retailerData && retailerData.carsSubmittedIdArray) {
          setCars(retailerData.carsSubmittedIdArray); // Update state
        }
      }
      catch (error) {
        console.error("Error fetching cars:", error);
        toast({
          title: "Error",
          description: "Failed to fetch cars. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (car, index) => {
    const registrationNumber = car.registrationNumber;

    try {
      // Delete the car from the backend
      await axios.delete(
        `https://urban-motion-backend.vercel.app/api/cars/delete-car?registrationNumber=${registrationNumber}`
      );

      // Remove the car from the UI
      setCars((prevCars) => prevCars.filter((_, i) => i !== index));

      toast({
        title: "Deleted",
        description: `Car with registration number ${registrationNumber} has been successfully deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting car:", error);
      toast({
        title: "Error",
        description: "Failed to delete the car. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} bg="gray.900" borderRadius="lg" boxShadow="lg">
      <Box textAlign="center" mb={6}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Image src="/Resources/car_return48.png" alt="" h="50px" mr={2} />
          <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
            Remove Car
          </Heading>
        </Box>
        <Text color="gray.400">
          Check your inventory below and remove unwanted cars from your inventory.
        </Text>
      </Box>

      {isLoading ? (
        <Spinner color="teal.400" size="xl" />
      ) : (
        <VStack
          spacing={6}
          align="stretch"
          maxHeight="100vh"
          overflowY="auto"
          pr={4}
        >
          {cars.map((car, index) => (
            <Box
              key={car.registrationNumber}
              p={4}
              bg="gray.800"
              borderRadius="md"
              boxShadow="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack spacing={4}>
                <Image
                  src={car.image || "https://via.placeholder.com/100"}
                  alt={car.model}
                  boxSize="100px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    {car.model}
                  </Text>
                  <Text fontSize="md" color="gray.300">
                    {car.registrationNumber}
                  </Text>
                </VStack>
              </HStack>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(car, index)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default RemoveCar;
