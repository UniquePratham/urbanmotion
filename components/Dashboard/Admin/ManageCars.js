import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  useToast,
  IconButton,
  Collapse,
  CollapseButton,
  Text,
  Box as ChakraBox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // For animations
import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"; // Icons for toggling filter
import axios from "axios";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [carData, setCarData] = useState({
    carType: "",
    model: "",
    registrationNo: "",
    status: "Available",
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); // For tracking which row is expanded
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // Car selected for modal view
  const toast = useToast();

  useEffect(() => {
    // Fetch cars from the API on component mount
    fetch("https://urban-motion-backend.vercel.app/api/cars/all-cars")
      .then((response) => response.json())
      .then((data) => {
        console.log("Cars data:", data);
        setCars(data.cars);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const removeCar = (index) => {
    setCars((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: "Car Removed",
      description: "The car has been removed successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

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

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleDetails = (index, car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <VStack
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      spacing={6}
      w="full"
      maxW="1200px"
      mx="auto"
      p={5}
      boxShadow="lg"
      borderRadius="lg"
      bg="gray.800"
      color="white"
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Image src="/Resources/Vehicles.png" alt="" h="50px" />
        <Heading as="h1" size="lg" color="#00db00" ml={2} mt={2}>
          Manage Cars
        </Heading>
      </Box>

      <Box
        w="full"
        p={5}
        height="90vh"
        bg="gray.700"
        borderRadius="md"
        boxShadow="md"
        overflowY="scroll"
      >
        <Heading size="md" mb={4}>
          Car List
        </Heading>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Car Type</Th>
              <Th>Model</Th>
              <Th>R. No</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cars.map((car, index) => (
              <Tr key={index}>
                <Td>{car.carType}</Td>
                <Td>{car.model}</Td>
                <Td>{car.registrationNumber}</Td>
                <Td>
                  {car.handedTo ? (
                    <span style={{ color: "red" }}>Booked</span>
                  ) : (
                    <span style={{ color: "green" }}>Available</span>
                  )}
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => toggleDetails(index, car)}
                  >
                    More Details
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleDelete(car)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for car details */}
      {selectedCar && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>Car Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <strong>Price:</strong> {selectedCar.price}
              </Text>
              <Text>
                <strong>Handed On:</strong> {selectedCar.handedOn}
              </Text>
              <Text>
                <strong>Other Details:</strong>{" "}
                {selectedCar.otherDetails || "No additional details"}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};

export default ManageCars;
