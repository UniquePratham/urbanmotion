import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const BookHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [retailerData, setRetailerData] = useState(null);

  const toast = useToast();

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setRetailerData(data.data);
        })
        .catch((err) => console.error("Failed to fetch customer data:", err));
    } else {
      toast({
        title: "Error",
        description: "Owner ID (sessionId) not found in local storage.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    try {
      const response = await axios.post(
        `https://urban-motion-backend-liart.vercel.app/api/bookings/retailer?retailerId=${retailerData._id}`
      );
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch booking history:", error);
      toast({
        title: "Error",
        description: "Failed to fetch booking history. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          opacity="0.5"
          position="absolute"
          bg="black"
          zIndex={3}
          width="97.5%"
          borderRadius="lg"
        >
          <Image src="/Resources/car-rent.png" alt="Loading" h="50px" mb={6} />
          <Spinner size="xl" color="green" />
        </Box>
      )}
      <Box
        p={6}
        bg="gray.800"
        borderRadius="lg"
        boxShadow="xl"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDir="column"
        color="white"
      >
        <Box textAlign="center" mb={6}>
          <Heading as="h1" size="xl" color="#00db00" mb={4}>
            Booking History
          </Heading>
          <Text color="gray.400">
            View your past bookings and their details below.
          </Text>
        </Box>
        <VStack spacing={4} w="100%" maxW="600px">
          {bookings.length === 0 ? (
            <Text color="gray.400">No bookings found.</Text>
          ) : (
            bookings.map((booking) => (
              <Box
                key={booking._id}
                bg="gray.700"
                borderRadius="md"
                p={4}
                w="100%"
                boxShadow="md"
              >
                <Text fontWeight="bold" mb={2}>
                  Model: {booking.carModel}
                </Text>
                <Text mb={2}>Registration: {booking.registrationNumber}</Text>
                <Text mb={2}>
                  Start Date: {booking.startDate}
                </Text>
                <Text mb={2}>
                  End Date: {booking.endDate}
                </Text>
                <Text>Price: {booking.price}</Text>
              </Box>
            ))
          )}
        </VStack>
      </Box>
    </>
  );
};

export default BookHistory;
