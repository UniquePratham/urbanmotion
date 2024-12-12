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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Fetch users from the API on component mount
    axios
      .get(
        "https://urban-motion-backend.vercel.app/api/customers/all-customers"
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to fetch users. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, []);

  const toggleDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <Box
      w="full"
      p={5}
      bg="gray.800"
      color="white"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading size="lg" mb={8}>
        Manage Users
      </Heading>

      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Driving License</Th>
            <Th>Verification Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.drivingLicenseId}</Td>
              <Td>{user.isVerified ? "Verified" : "Not Verified"}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => toggleDetails(user)}
                >
                  More Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for user details */}
      {selectedUser && isModalOpen && (
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
        >
          <Heading size="md" mb={4}>
            User Details
          </Heading>
          <Text>
            <strong>Name:</strong> {selectedUser.name}
          </Text>
          <Text>
            <strong>Email:</strong> {selectedUser.email}
          </Text>
          <Text>
            <strong>Driving License ID:</strong> {selectedUser.drivingLicenseId}
          </Text>
          <Text>
            <strong>Verification Type:</strong> {selectedUser.verificationType}
          </Text>
          <Text>
            <strong>Verification ID:</strong> {selectedUser.verificationId}
          </Text>
          <Text>
            <strong>Status:</strong>{" "}
            {selectedUser.isVerified ? "Verified" : "Not Verified"}
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

export default ManageUsers;
