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
  Input
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const RemoveCar = () => {
  const [car, setCar] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
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
          return data.data;
        } catch (error) {
          console.error("Failed to fetch retailer data:", error);
          return null;
        }
      }
      return null;
    };
  }, []);

  const handleDelete = async (car) => {
    const registrationNumber = car.registrationNumber;

    try {
      // Delete the car from the backend
      await axios.delete(
        `https://urban-motion-backend.vercel.app/api/cars/delete-car?registrationNumber=${registrationNumber}`
      );

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
    <Box p={6} bg="gray.800" borderRadius="lg" boxShadow="xl" minH="100vh" justifyContent="center" alignItems="center" display="flex" flexDir="column" bgImage="url('/Resources/failed.png')" bgSize="25% 40%"
      bgRepeat="no-repeat"
      bgPosition="center">
      <Box
        position="absolute"
        top="10"
        left="10"
        right="10"
        bottom="20"
        backgroundColor="gray.800"  // Adjust opacity
        opacity="0.7"
        zIndex="1"
      />
      <Box
        position="relative"
        zIndex="2"
        color="white"
        p="4"
      >
        <Box textAlign="center" mb={6}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
            <Image src="/Resources/car_return48.png" alt="" h="50px" mr={2} />
            <Heading as="h1" size="xl" color="#00db00" ml={2} mt={4}>
              Remove Car
            </Heading>
          </Box>
          <Text color="gray.400">
            Enter the registration number of the car you want to delete and confirm the deletion.
          </Text>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Input
            name="registrationNumber"
            placeholder="Car Registration Number"
            bg="gray.100"
            color="black"
            mb={4}
            width={{ base: "300px", md: "350px" }}
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            _hover={{
              bg: "rgba(255, 255, 255, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            _focus={{
              outline: "none",
              bg: "rgba(255, 255, 255, 0.8)",
              borderColor: "rgba(0, 255, 0, 0.8)",
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
            }}
          />
        </Box>
        <HStack justifyContent="center" alignItems="center" mb={4}>   <Button
          colorScheme="green"
          bg="#00db00"
          color="gray.100"
          _hover={{ color: "#00db00", bg: "gray.100" }}
          onClick={handleDelete}
          p={{ base: 6, md: 6 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Image
            src="/Resources/unavailable-car32.png"
            alt=""
            h="50px"
            borderRadius="3"
            p="4px"
            zIndex={2}
          />
          <span>Return Car</span>
        </Button></HStack>
      </Box>
    </Box>
  );
};

export default RemoveCar;
