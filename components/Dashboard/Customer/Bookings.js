import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const Bookings = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Retrieve the stored booking details from localStorage
    const storedBookingDetails = JSON.parse(
      localStorage.getItem("bookingDetails")
    );

    if (storedBookingDetails) {
      setBookingDetails(storedBookingDetails);
    } else {
      toast({
        title: "No Booking Found",
        description: "You have not made any bookings yet.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, []);

  return (
    <Box p={6} bg="gray.900" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb={6} color="teal.400" textAlign="center">
        Your Bookings
      </Heading>

      {/* Display booking details if available */}
      {bookingDetails ? (
        <VStack spacing={6} align="stretch">
          <Box p={4} bg="gray.800" borderRadius="lg" boxShadow="md">
            <HStack spacing={4} align="center">
              {/* Car Booking Details */}
              <Box flex="1">
                <Heading as="h3" size="md" color="teal.400" mb={2}>
                  {bookingDetails.car.model}
                </Heading>
                <Text color="gray.400" mb={2}>
                  Registration Number: {bookingDetails.car.registrationNumber}
                </Text>
                <Text color="gray.400" mb={2}>
                  Car Type: {bookingDetails.car.carType}
                </Text>

                <Text color="teal.400" fontWeight="bold" mb={2}>
                  Price: ₹{bookingDetails.car.carPricing.monthly}
                </Text>

                <HStack spacing={1}>
                  <FaCheckCircle color="green.400" />
                  <Text color="green.400" fontWeight="bold">
                    Booking Confirmed!
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>
        </VStack>
      ) : (
        <Text color="gray.400" textAlign="center">
          No bookings to display.
        </Text>
      )}
    </Box>
  );
};

export default Bookings;
