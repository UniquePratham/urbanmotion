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
  const [retailerData, setRetailerData] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchRetailerData();
  }, [])


  const handleImageDelete = async (public_id) => {
    try {
      const response = await fetch("/api/delete_image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: public_id }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Image deleted successfully:", result);
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };


  const fetchRetailerData = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      try {
        const response = await axios.get(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
        const data = await response.data;
        setRetailerData(data.data);
      } catch (error) {
        console.error("Failed to fetch retailer data:", error);
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const fetchCar = async () => {
        try {
          // Get the car details from the backend
          const response = await axios.get(
            `https://urban-motion-backend.vercel.app/api/cars/car?registrationNumber=${registrationNumber}`
          );
          const data = await response.data;
          return data.data;
        } catch (error) {
          console.error("Error getting car details:", error);
          return null
        }
      };
      const car = await fetchCar();
      await fetchRetailerData();
      if (retailerData.carsSubmittedIdArray.includes(car._id) && !car.isHanded) {
        toast({
          title: "Confirm Deleting Your Car",
          description: `Do you really want to delete ${car.model}?`,
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
                  Do you want to delete {car.model}?
                </Text>
                <HStack spacing={6}>
                  <Button
                    colorScheme="green"
                    size="lg"
                    onClick={async () => {
                      try {
                        handleImageDelete(car.carImage);
                        // Delete the car from the backend
                        const response = await axios.delete(
                          `https://urban-motion-backend.vercel.app/api/cars/delete-car?registrationNumber=${registrationNumber}`
                        );

                        if (response.status === 200) {

                          // Show success toast after booking the car
                          toast({
                            title: "Car Deleted Successfully",
                            description: `Car ${car.model} with registration number ${registrationNumber} has been successfully deleted.`,
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
                                  Car {car.model} with registration number {registrationNumber} has been successfully deleted.
                                </Text>
                              </Box>
                            ),
                          });
                        }
                      } catch (error) {
                        setRegistrationNumber("");
                        console.error("Error deleting car:", error);
                        toast({
                          title: "Error",
                          description: "Failed to delete the car. Please try again.",
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                      onClose();
                      setRegistrationNumber("");
                    }}
                  >
                    Yes
                  </Button>
                  <Button colorScheme="red" size="lg" onClick={() => {
                    toast({
                      title: "Car Not Deleted",
                      description: "The deletion process was canceled.",
                      status: "info",
                      duration: 5000,
                      isClosable: true,
                    });
                    setRegistrationNumber("");
                    onClose();
                  }}>
                    No
                  </Button>
                </HStack>
              </Box>
            </motion.div>
          ),
        });
      }
      else if (car.isHanded) {
        toast({
          title: "Car Deletion Not Allowed",
          description: "This car is currently booked. Please wait until the booking period ends to remove it from your inventory.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setRegistrationNumber("");
      setIsLoading(false);
    } catch (error) {
      setRegistrationNumber("");
      console.error("Error deleting car:", error);
      toast({
        title: "Error",
        description: "Failed to delete the car. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (<>
    {isLoading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        position="absolute"
        bg="rgba(0,0,0,0.5)"
        zIndex={3}
        width="97.5%"
        borderRadius="lg"
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={60} />
        <Spinner size="xl" color="green" />
      </Box>
    )}
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
  </>
  );
};

export default RemoveCar;
