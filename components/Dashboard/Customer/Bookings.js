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
  Heading
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
        <HStack>
          <VStack
            p={5}
            boxShadow="md"
            borderRadius="lg"
            bg="gray.800"
            height="100vh"
            alignItems="center"
            flexDirection="column"
            width="50%"
            spacing={10}
          >
            <Box textAlign="center" mb={6}>
              <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <Image src="/Resources/booking.png" alt="" h="50px" mr={2} />
                <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
                  Your Car Booking Details
                </Heading>
              </Box>
              <Text color="gray.400">
                You can view the currently booked car here.
              </Text>
            </Box>
            {/* Use a wrapper box to align all text items */}
            <VStack width="100%" spacing={8}>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/model.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Car Model:</span> </Text><span>{bookingDetails.car.model}</span>
              </Text>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/car-fuel-type32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Car Fuel Type:</span> </Text> <span>{bookingDetails.car.carType}</span>
              </Text>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/id.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Registration Number:</span> </Text>
                <span>{bookingDetails.car.registrationNumber}</span>
              </Text>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/year32.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Pick-up Time:</span>{" "} </Text>
                <span>{new Date(bookingDetails.car.handedOn).toLocaleString()}</span>
              </Text>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Weekly Pricing:</span></Text> <span>{bookingDetails.car.carPricing.weekly}</span>
              </Text>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Monthly Pricing:</span> </Text> <span>{bookingDetails.car.carPricing.monthly}</span>
              </Text>
              <Text display="flex" justifyContent="space-between" width="100%">
              <Text display="flex" justifyContent="left" width="40%">
              <Image src="/Resources/rental-price-per-day321.png" alt="" h="30px" mr={3} borderRadius={"lg"} />
                <span>Quarterly Pricing:</span>{" "}</Text>
                <span>{bookingDetails.car.carPricing.quarterly}</span>
              </Text>
            </VStack>
            <Button
              mt={4}
              colorScheme="green"
              bg="gray.600"
              color="#00db00"
              _hover={{ color: "white", bg: "#00db00" }}
              onClick={handleReturnClick}
            >
              <span>Return Car</span>
            </Button>
          </VStack>

          <Box p={5} boxShadow="md" borderRadius="lg" bg="gray.800" height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="50%">
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
            <Text display="flex" justifyContent="center" width="100%" fontSize="3xl" color="#00db00">
              {bookingDetails.car.model}
            </Text>
          </Box>
        </HStack>
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
              colorScheme="green"
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
