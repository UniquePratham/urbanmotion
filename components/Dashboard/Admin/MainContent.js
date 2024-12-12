import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Button,
  Image,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import Card from "../CommonDashboardComponents/Card";

const MainContent = ({ adminData }) => {
  const bgColor = useColorModeValue("gray.800", "gray.800");

  // State for managing gender and password changes
  const [gender, setGender] = useState("male");
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Function to toggle gender
  const toggleGender = () => {
    setGender((prevGender) => (prevGender === "male" ? "female" : "male"));
  };

  const handleSubmitChangePassword = async () => {
    setIsLoading(true); // Show isLoading spinner while submitting the request
    let payload = {
      email: "shaswata.ssaha@gmail.com",
      position: "Super Admin",
      name: "Shaswata Saha",
      password: "123456",
    };
    const endpoint =
      "https://urban-motion-backend.vercel.app/api/admins/update-admin"; // API endpoint for updating admin details

    console.log("Posting data: ", payload); // Log the data being sent

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update the admin details.");
      }

      const responseData = await response.json();
      console.log("Response data: ", responseData); // Log the response data

      if (responseData.message === "Admin updated successfully.") {
        toast({
          title: "Success",
          description: "Admin details updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Error: ", error.message); // Log any errors
      toast({
        title: "Error",
        description: "An error occurred while updating the admin details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Hide isLoading spinner after request is completed
      setShowModal(false); // Close the modal
    }
  };

  const handleChangePassword = () => {
    if (!adminData) {
      return; // No admin data
    }
    setShowModal(true); // Show modal for password change
  };

  return (
    <>
      <Box
        flex="1"
        p={6}
        bg={bgColor}
        borderRadius="lg"
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column-reverse", md: "column" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        alignItems={{ base: "center", md: "flex-start" }}
        maxW="800px"
        minH={{ base: "100vh", md: "100vh" }}
      >
        {/* Welcome Text */}
        <Heading
          color="#00db00"
          p={{ base: 6, md: 0 }}
          mb={4}
          width={{ base: "100vw" }}
          fontSize={{ base: "3xl", md: "4xl" }}
        >
          Welcome, <Box as="br" /> {adminData?.name || "Admin"}!
        </Heading>
        <Text color="gray.400" mb={6} display={{ base: "unset", md: "none" }}>
          Here&apos;s your admin dashboard where you can manage users, settings,
          and more.
        </Text>

        {/* Admin Details */}
        {adminData ? (
          <Box color="gray.100" mb={2} mt={2}>
            <Text>Email: {adminData.email}</Text>
          </Box>
        ) : (
          <Text>Loading admin details...</Text>
        )}

        {/* Gender Section Positioned in Top-Right */}
        <Flex
          direction="column"
          align="center"
          position={{ base: "unset", md: "absolute" }}
          top={8}
          right={6}
          p={4}
          bg="gray.700"
          borderRadius="lg"
          shadow="lg"
          w="240px"
        >
          <Image
            src={
              gender === "male"
                ? "/Resources/DefaultMale.png"
                : "/Resources/DefaultFemale.png"
            }
            alt={gender === "male" ? "Male Profile" : "Female Profile"}
            boxSize="80px"
            borderRadius="full"
            border="2px solid #00db00"
            shadow="md"
            mb={4}
          />
          {adminData ? <Text mb={2}>{adminData.name}</Text> : null}
          <Button
            bg="#00db00"
            color="white"
            _hover={{ bg: "white", color: "#00db00" }}
            size="sm"
            onClick={toggleGender}
          >
            Switch to {gender === "male" ? "Female" : "Male"}
          </Button>
        </Flex>

        {/* Button to open Change Password Modal */}
        <Flex
          direction="column"
          align="center"
          position={{ base: "unset", md: "absolute" }}
          top={60}
          right={6}
          p={4}
          bg="gray.700"
          borderRadius="lg"
          shadow="lg"
          w="240px"
          mb={{ base: 4, md: 0 }}
        >
          <Button
            bg="#00db00"
            color="white"
            _hover={{ bg: "white", color: "#00db00" }}
            size="sm"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Flex>

        {/* Admin Card */}
        {adminData ? (
          <Card userType="Admin" userData={adminData} />
        ) : (
          <Card userType="loading" userData={null} />
        )}
      </Box>

      {/* Modal for Change Password */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter your current password"
              value={currentPassword || ""}
              onChange={(e) => setCurrentPassword(e.target.value)}
              size={{ base: "md", md: "lg" }}
              bg="gray.200"
              color="black"
              border="none"
              type="password"
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              width="100%"
            />
            <Input
              placeholder="Enter your new password"
              value={newPassword || ""}
              onChange={(e) => setNewPassword(e.target.value)}
              size={{ base: "md", md: "lg" }}
              bg="gray.200"
              color="black"
              mt={2}
              border="none"
              type="password"
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              width="100%"
            />
            <Input
              placeholder="Confirm your new password"
              value={confirmNewPassword || ""}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              size={{ base: "md", md: "lg" }}
              bg="gray.200"
              color="black"
              border="none"
              mt={2}
              type="password"
              _focus={{
                outline: "none",
                bg: "rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
              }}
              width="100%"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleSubmitChangePassword}
              disabled={
                currentPassword === null ||
                newPassword === null ||
                confirmNewPassword === null
              }
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainContent;
