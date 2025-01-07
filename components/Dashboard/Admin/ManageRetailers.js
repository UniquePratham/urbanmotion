import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Image
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const ManageRetailers = () => {
  const [retailers, setRetailers] = useState([]); // Initialize as an empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Fetch retailers from the API on component mount
    axios
      .get(
        "https://urban-motion-backend.vercel.app/api/retailers/all-retailers"
      )
      .then((response) => {
        if (response.data && Array.isArray(response.data.retailers)) {
          setRetailers(response.data.retailers); // Set the retailers array
        } else {
          console.error(
            "Expected retailers data in response, but got:",
            response.data
          );
          toast({
            title: "Error",
            description: "Invalid data format received.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching retailers:", error);
        toast({
          title: "Error",
          description: "Failed to fetch retailers. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  const toggleDetails = (retailer) => {
    setSelectedRetailer(retailer);
    setIsModalOpen(true);
  };

  return (
    <Box
      w={{ base: "100%", md: "90%", lg: "100%" }}
      p={5}
      bg="gray.800"
      color="white"
      borderRadius="lg"
      boxShadow="lg"
      mx="auto"
    >
       <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <Image src="/Resources/users1.png" alt="" h="50px" />
            <Heading as="h1" size="lg" color="#00db00" ml={2} mt={2}>
              Manage Retailers
            </Heading>
          </Box>

      <Box overflowX="auto">
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Verification Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {retailers.length > 0 ? (
              retailers.map((retailer, index) => (
                <Tr key={index}>
                  <Td>{retailer.name}</Td>
                  <Td>{retailer.email}</Td>
                  <Td>{retailer.isVerified ? "Verified" : "Not Verified"}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => toggleDetails(retailer)}
                    >
                      More Details
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5}>No retailers found.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for retailer details */}
      {selectedRetailer && isModalOpen && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          p={5}
          bg="gray.700"
          borderRadius="md"
          boxShadow="lg"
          zIndex="overlay"
          width={{ base: "90%", md: "60%", lg: "40%" }}
          maxHeight="80vh"
          overflowY="auto"
        >
          <Heading size="md" mb={4}>
            Retailer Details
          </Heading>
          <Text>
            <strong>Name:</strong> {selectedRetailer.name}
          </Text>
          <Text>
            <strong>Email:</strong> {selectedRetailer.email}
          </Text>
          <Text>
            <strong>Verification Type:</strong>{" "}
            {selectedRetailer.verificationType}
          </Text>
          <Text>
            <strong>Verification ID:</strong> {selectedRetailer.verificationId}
          </Text>
          <Text>
            <strong>Status:</strong>{" "}
            {selectedRetailer.isVerified ? "Verified" : "Not Verified"}
          </Text>
          <Button
            colorScheme="teal"
            mt={4}
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ManageRetailers;
