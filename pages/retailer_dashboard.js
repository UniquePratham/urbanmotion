// pages/retailer-dashboard.js
import {
    Box,
    Flex,
    Text,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    useToast,
    HStack,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import { useState } from "react";
  
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);
  
  export default function RetailerDashboard() {
    const toast = useToast();
    const [cars, setCars] = useState([]);
    const [form, setForm] = useState({
      number: "",
      model: "",
      category: "",
      status: "",
      price: "",
    });
  
    // Handle form input changes
    const handleInputChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    // Add Car
    const addCar = () => {
      if (!form.number || !form.model || !form.category || !form.status || !form.price) {
        toast({
          title: "All fields are required.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      setCars([...cars, form]);
      toast({
        title: "Car added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setForm({ number: "", model: "", category: "", status: "", price: "" });
    };
  
    // Remove Car
    const removeCar = (index) => {
      const updatedCars = cars.filter((_, i) => i !== index);
      setCars(updatedCars);
      toast({
        title: "Car removed successfully!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    };
  
    return (
      <Flex h="100vh" bg="gray.900" color="white" flexDir="column" p={6}>
        {/* Header */}
        <Text fontSize="2xl" fontWeight="bold" mb={6} color="#00db00">
          Retailer Dashboard
        </Text>
  
        {/* Add Car Form */}
        <MotionBox
          bg="gray.800"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          whileHover={{ scale: 1.02 }}
          transition="all 0.3s ease"
          mb={8}
        >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Add New Car
          </Text>
          <VStack spacing={4} align="start">
            <Input
              placeholder="Car Number"
              bg="gray.700"
              border="none"
              name="number"
              value={form.number}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Car Model"
              bg="gray.700"
              border="none"
              name="model"
              value={form.model}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Category (SUV, Sedan, etc.)"
              bg="gray.700"
              border="none"
              name="category"
              value={form.category}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Status (Available/Unavailable)"
              bg="gray.700"
              border="none"
              name="status"
              value={form.status}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Rental Price ($)"
              bg="gray.700"
              border="none"
              name="price"
              value={form.price}
              onChange={handleInputChange}
            />
            <MotionButton
              bg="#00db00"
              color="white"
              _hover={{ bg: "#00a700" }}
              whileHover={{ scale: 1.05 }}
              transition="all 0.2s ease"
              onClick={addCar}
            >
              Add Car
            </MotionButton>
          </VStack>
        </MotionBox>
  
        {/* Car Details Table */}
        <MotionBox
          bg="gray.800"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          whileHover={{ scale: 1.02 }}
          transition="all 0.3s ease"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Added Cars
          </Text>
          {cars.length > 0 ? (
            <Table variant="simple" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th>Car Number</Th>
                  <Th>Model</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th>Rental Price</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cars.map((car, index) => (
                  <Tr key={index}>
                    <Td>{car.number}</Td>
                    <Td>{car.model}</Td>
                    <Td>{car.category}</Td>
                    <Td>{car.status}</Td>
                    <Td>${car.price}</Td>
                    <Td>
                      <MotionButton
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        whileHover={{ scale: 1.05 }}
                        transition="all 0.2s ease"
                        onClick={() => removeCar(index)}
                      >
                        Remove
                      </MotionButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text color="gray.400">No cars added yet.</Text>
          )}
        </MotionBox>
      </Flex>
    );
  }
  