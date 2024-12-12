import React, { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useToast,
  Image,
  HStack,
  VStack,
  Heading,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import axios from "axios";

const Bookings = () => {
  const [customerData, setCustomerData] = useState(null);
  const [carBooked, setCarBooked] = useState(null);
  const [carId, setCarId] = useState("");
  const [returnDate, setReturnDate] = useState(null);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");

    const fetchCustomerData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
          const data = await response.json();
          return data.data; // Return the customer data
        } catch (error) {
          toast({
            title: "Error Fetching Data",
            description: "Unable to fetch customer data.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.error("Failed to fetch customer data:", error);
          return null;
        }
      }
      return null;
    };

    const fetchCarDetails = async (carId) => {
      try {
        const response = await axios.get(
          `https://urban-motion-backend.vercel.app/api/cars/car?registrationNumber=${carId}`
        );
        if (response && response.data) {
          setCarBooked(response.data.data);
        } else {
          console.error('Response data is undefined.');
        }
      } catch (error) {
        toast({
          title: "Error Fetching Data",
          description: "Unable to fetch car details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      const customerData = await fetchCustomerData();
      if (customerData && customerData.carCurrentlyBookedId) {
        setCustomerData(customerData); // Update state
        setCarId(customerData.carCurrentlyBookedId);
        fetchCarDetails(customerData.carCurrentlyBookedId); // Fetch car details
      } else {
        setIsLoading(false); // Stop isLoading if no car is booked
      }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    if (carBooked) {
      calculateReturnDate(); // Calculate return date when carBooked is updated
    }
  }, [carBooked]);


  const calculateReturnDate = () => {
    if (!carBooked) return;

    const duration = parseInt(carBooked.durationGivenFor); // Extract number from string
    const handedOnDate = new Date(carBooked.handedOn);

    // Add the extracted duration to the handedOnDate
    handedOnDate.setDate(handedOnDate.getDate() + duration);

    // Set the calculated date in the state
    setReturnDate(handedOnDate.toLocaleString());
  };


  const handleReturnClick = () => {
    if (!carBooked) {
      return; // No car booked
    }
    setShowModal(true); // Show the modal for rating
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value)); // Set selected rating
  };

  const handleSubmitReturn = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating to return the car.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
        bgColor: "red.600",
        color: "white",
      });
      return;
    }

    setIsLoading(true); // Show isLoading spinner while submitting the request

    // Prepare the request payload
    const requestBody = {
      registrationNumber: carBooked.registrationNumber,
      rating: rating,
    };

    // Log the request payload for debugging
    console.log(
      "Request Payload for Car Return:",
      JSON.stringify(requestBody, null, 2)
    );

    try {
      const response = await fetch(
        "https://urban-motion-backend.vercel.app/api/cars/return-car",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setCarBooked(null);
        toast({
          title: "Car Returned",
          description:
            "Thank you for your feedback! Your car has been returned.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          bgColor: "teal.500",
          color: "white",
        });
      } else {
        toast({
          title: "Error",
          description:
            result.message || "Something went wrong while returning the car.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          bgColor: "red.600",
          color: "white",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description:
          "There was an issue connecting to the server. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
        bgColor: "red.600",
        color: "white",
      });
    } finally {
      setIsLoading(false); // Hide isLoading spinner after request is completed
      setShowModal(false); // Close the modal
    }
  };

  return (
    <div>
      {isLoading ? (
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
      ) : carBooked ? (
        <HStack flexDirection={{ base: "column-reverse", md: "unset" }}>
          <VStack
            p={{base:2,md:5}}
            boxShadow="md"
            borderRadius="lg"
            bg="gray.800"
            height={{base:"80vh",md:"105vh"}}
            alignItems="center"
            flexDirection={{ base: "column", md: "column" }}
            width={{ base: "100%", md: "50%" }}
            spacing={10}
          >
            <Box textAlign="center" mb={2} display={{base:"none",md:"unset"}}>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/booking.png" alt="" h="50px" mr={2} />
                <Heading as="h1" size="lg" color="white" ml={2} mt={{ base: 6, md: 4 }}>
                  Your <span style={{ color: "#00db00" }}> Car Booking</span> Details
                </Heading>
              </Box>
              <Text color="gray.400">
                You can view the currently booked car here.
              </Text>
            </Box>
            {/* Use a wrapper box to align all text items */}
            <VStack width="100%" spacing={{ base: 2, md: 4 }} fontSize={{base:"sm",md:"md"}}>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/model.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Car Model:</span> </Text><span>{carBooked.model}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/car-fuel-type32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Car Fuel Type:</span> </Text> <span>{carBooked.carType}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
              <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/id.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Registration Number:</span> </Text>
                <span>{carBooked.registrationNumber}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
              <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/year32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Car Booked Time:</span>{" "} </Text>
                <span>{new Date(carBooked.handedOn).toLocaleString()}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
              <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Weekly Pricing:</span></Text> <span>{carBooked.carPricing.weekly}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
              <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Monthly Pricing:</span> </Text> <span>{carBooked.carPricing.monthly}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Quarterly Pricing:</span>{" "}</Text>
                <span>{carBooked.carPricing.quarterly}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" mb={2} alignItems="center">
                <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/Calendar 32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Duration Booked For:</span>{" "}</Text>
                <span>{carBooked.durationGivenFor}</span>
              </Text>
              <Text display="flex" justifyContent={{base:"space-between",md:"space-between"}} width="100%" alignItems="center">
                <Text display="flex" justifyContent="left" width={{base:"40%",md:"40%"}} alignItems="center">
                  <Image src="/Resources/mileage.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                  <span>Return Date:</span>{" "}</Text>
                <span>{returnDate}</span>
              </Text>
            </VStack>
            <Button
              colorScheme="green"
              bg="gray.600"
              color="#00db00"
              _hover={{ color: "white", bg: "rgba(0,200,0,0.6)" }}
              onClick={handleReturnClick}
              p={{ base: 6, md: 6 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <Image
                src="/Resources/Return.png"
                alt=""
                h="50px"
                borderRadius="3"
                p="4px"
                zIndex={2}
              />
              <span>Return Car</span>
            </Button>
          </VStack>

          <Box p={5} boxShadow="md" borderRadius="lg" bg="gray.800" height={{ base: "55vh", md: "105vh" }} display={{ base: "flex", md: "flex" }} justifyContent="center" alignItems="center" flexDirection="column" width={{ base: "100%", md: "50%" }}>
          <Box textAlign="center" mb={2} display={{base:"unset",md:"none"}} mt={4}>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/booking.png" alt="" h="50px" mr={2} />
                <Heading as="h1" size="lg" color="white" ml={2} mt={{ base: 6, md: 4 }}>
                  Your <span style={{ color: "#00db00" }}> Car Booking</span> Details
                </Heading>
              </Box>
              <Text color="gray.400">
                You can view the currently booked car here.
              </Text>
            </Box>
            <Image
              src="/car3.png" // Placeholder image (can be dynamic later)
              alt=""
              boxSize="500px"
              objectFit="contain"
              borderRadius="md"
              _hover={{
                transform: "scale(1.01) scaleX(-1)",
                transition: "0.03s ease-in transform",
              }}
              cursor="pointer"
            />
            <Text display="flex" justifyContent="center" width="100%" fontSize={{base:"xl",md:"3xl"}} color="#00db00">
              {carBooked.model}
            </Text>
          </Box>
        </HStack>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Image src="/Resources/BookingBlue.png" alt="" h="150px" mb={2} />
                  <Alert status="info" borderRadius="xl"
          color="black" width="50%">
                    <AlertIcon />
                    No booking found.
                  </Alert>
        </Box>
      )}

      {/* Rating Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rate Your Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder="Select rating" onChange={handleRatingChange}>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleSubmitReturn}
              disabled={rating === 0}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Bookings;
