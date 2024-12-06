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
} from "@chakra-ui/react";

const Bookings = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Load booking details from localStorage on initial render
  useEffect(() => {
    const storedBookingDetails = JSON.parse(
      localStorage.getItem("bookingDetails")
    );
    if (storedBookingDetails) {
      setBookingDetails(storedBookingDetails);
    }
  }, []);

  const handleReturnClick = () => {
    if (!bookingDetails) {
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

    setLoading(true); // Show loading spinner while submitting the request

    // Prepare the request payload
    const requestBody = {
      registrationNumber: bookingDetails.car.registrationNumber,
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
        // Remove the car booking from localStorage after successful return
        localStorage.removeItem("bookingDetails");
        setBookingDetails(null); // Clear the booking details

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
      setLoading(false); // Hide loading spinner after request is completed
      setShowModal(false); // Close the modal
    }
  };

  return (
    <div>
      {bookingDetails ? (
        <Box p={5} boxShadow="md" borderRadius="lg" bg="gray.700">
          <Text fontSize="xl" fontWeight="bold">
            Your Car Booking Details
          </Text>
          <Text>Car: {bookingDetails.car.model}</Text>
          <Text>
            Registration Number: {bookingDetails.car.registrationNumber}
          </Text>
          <Text>
            Pick-up Time: {new Date(bookingDetails.pickupTime).toLocaleString()}
          </Text>
          <Button mt={4} colorScheme="teal" onClick={handleReturnClick}>
            <span>Return Car</span>
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Text fontSize="xl" fontWeight="">
            No bookings found
          </Text>
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
              colorScheme="blue"
              isLoading={loading}
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
