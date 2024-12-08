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
  HStack,
  Image
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
      p={{base:2,md:6}}
      bg="gray.800"
      borderRadius="lg"
      boxShadow="lg"
      maxW="800px"
      mx="auto"
    >
      <Box textAlign="center" mb={6}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Image src="/Resources/add-car40.png" alt="" h="50px" mr={2} />
          <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
            Add Car
          </Heading>
        </Box>
        <Text color="gray.400">
          Fill in the details below to add a new car to your inventory.
        </Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <HStack spacing={{base:4,md:16}} width="100%" justifyContent="center" alignItems="center" flexDirection={{base:"column",md:"unset"}}>
          <VStack spacing={{base:2,md:8}} width={{base:"100%",md:"40%"}}>
            <FormControl isRequired>
              <FormLabel>Registration Number</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/id.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Input
                  placeholder="Enter registration number"
                  name="registrationNumber"
                  value={carDetails.registrationNumber}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Model</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/model.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Input
                  placeholder="Enter car model"
                  name="model"
                  value={carDetails.model}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Car Type</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/VehiclesBlue-100.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Select
                  name="carType"
                  defaultValue=""
                  value={carDetails.carType}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                >
                  <option value="" disabled>
                    Select Car Type
                  </option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Electric">Electric</option>
                  <option value="Hatchback">Hatchback</option>
                </Select>
              </Box>
            </FormControl>
          </VStack>
          <VStack  spacing={{base:2,md:8}} width={{base:"100%",md:"40%"}}>
            <FormControl isRequired>
              <FormLabel>Pricing (Quarterly)</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Input
                  type="number"
                  placeholder="Enter quarterly pricing"
                  name="quarterly"
                  value={carDetails.quarterly}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pricing (Monthly)</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Input
                  type="number"
                  placeholder="Enter monthly pricing"
                  name="monthly"
                  value={carDetails.monthly}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pricing (Weekly)</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Input
                  type="number"
                  placeholder="Enter weekly pricing"
                  name="weekly"
                  value={carDetails.weekly}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                />
              </Box>
            </FormControl>
          </VStack>
        </HStack>
        <HStack spacing={{base:4,md:16}}  width="100%" justifyContent="center" alignItems="center" mt={4}>
          <VStack  spacing={{base:2,md:8}} width={{base:"100%",md:"40%"}}>
            <FormControl>
              <FormLabel>Car Image</FormLabel>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/BookingWhite.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <Input type="file" disabled />
              </Box>
              <Text fontSize="sm" color="gray.500">
                Image upload functionality will be added later.
              </Text>
            </FormControl>
            <Button bg="#00db00"
              color="white"
              border="2px solid transparent"
              borderRadius="md"
              fontSize="lg"
              px="5"
              py="4"
              _hover={{
                bg: "white",
                boxShadow: "0 0 15px #00db00, 0 0 30px #00db00",
                border: "2px solid #00db00",
                color: "#00db00",
              }}
              sx={{
                boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)",
                transition: "0.3s ease",
              }} size="lg" width="half" type="submit">
              Submit
            </Button>
          </VStack>
        </HStack>
      </form>
    </Box >
  );
};

export default AddCar;
