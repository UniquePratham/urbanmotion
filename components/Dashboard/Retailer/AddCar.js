import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const AddCar = () => {
  const [carDetails, setCarDetails] = useState({
    registrationNumber: "",
    model: "",
    carType: "",
    quarterly: "",
    monthly: "",
    weekly: "",
  });
  const [ownerId, setOwnerId] = useState("");
  const toast = useToast();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      setOwnerId(sessionId);
    } else {
      toast({
        title: "Error",
        description: "Owner ID (sessionId) not found in local storage.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      registrationNumber: carDetails.registrationNumber,
      owner: ownerId,
      model: carDetails.model,
      carType: carDetails.carType,
      carPricing: {
        quarterly: Number(carDetails.quarterly),
        monthly: Number(carDetails.monthly),
        weekly: Number(carDetails.weekly),
      },
    };

    console.log("JSON being sent:", JSON.stringify(carData, null, 2));

    try {
      const response = await axios.post(
        "https://urban-motion-backend.vercel.app/api/cars/add-car",
        carData
      );
      toast({
        title: "Car added successfully!",
        description: "The car has been added to your inventory.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCarDetails({
        registrationNumber: "",
        model: "",
        carType: "",
        quarterly: "",
        monthly: "",
        weekly: "",
      });
    } catch (error) {
      toast({
        title: "Error adding car",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="full"
      p={6}
      bg="gray.900"
      borderRadius="lg"
      boxShadow="lg"
      maxW="800px"
      mx="auto"
    >
      <Heading as="h1" size="lg" mb={4} color="teal.400" textAlign="center">
        Add Car
      </Heading>
      <Text mb={6} color="gray.400" textAlign="center">
        Fill in the details below to add a new car to your inventory.
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Registration Number</FormLabel>
            <Input
              placeholder="Enter registration number"
              name="registrationNumber"
              value={carDetails.registrationNumber}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Model</FormLabel>
            <Input
              placeholder="Enter car model"
              name="model"
              value={carDetails.model}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Car Type</FormLabel>
            <Select
              placeholder="Select car type"
              name="carType"
              value={carDetails.carType}
              onChange={handleInputChange}
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Hatchback">Hatchback</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Pricing (Quarterly)</FormLabel>
            <Input
              type="number"
              placeholder="Enter quarterly pricing"
              name="quarterly"
              value={carDetails.quarterly}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Pricing (Monthly)</FormLabel>
            <Input
              type="number"
              placeholder="Enter monthly pricing"
              name="monthly"
              value={carDetails.monthly}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Pricing (Weekly)</FormLabel>
            <Input
              type="number"
              placeholder="Enter weekly pricing"
              name="weekly"
              value={carDetails.weekly}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Car Image</FormLabel>
            <Input type="file" disabled />
            <Text fontSize="sm" color="gray.500">
              Image upload functionality will be added later.
            </Text>
          </FormControl>
          <Button colorScheme="teal" size="lg" width="full" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddCar;
