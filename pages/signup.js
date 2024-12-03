import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "customer", // Default account type
  });
  const [additionalData, setAdditionalData] = useState({
    drivingLicenseId: "",
    verificationType: "aadhar",
    verificationId: "",
  });
  const toast = useToast();

  // General input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Additional data input change handler for customers
  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign Up button handler
  const handleSignUp = async () => {
    const apiEndpoints = {
      customer: "https://urban-motion-backend.vercel.app/api/customers/add-customer",
      retailer: "https://urban-motion-backend.vercel.app/api/retailers/add-retailer",
      admin: "https://urban-motion-backend.vercel.app/api/admins/add-admin",
    };

    // Prepare the payload based on the account type
    const payload =
      formData.accountType === "customer"
        ? { ...formData, ...additionalData }
        : formData;

    // Log the payload in JSON format to the terminal
    console.log("Payload being posted:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(apiEndpoints[formData.accountType], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: result.message || "Account created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(result.message || "Error during signup.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      bg="gray.900"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        px={6}
        py={8}
        borderRadius="lg"
        bg="gray.800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        width="100%"
        maxWidth="400px"
      >
        <Heading color="white" mb={6} textAlign="center">
          Create an Account
        </Heading>
        <Select
          name="accountType"
          bg="gray.700"
          color="white"
          mb={4}
          _hover={{ bg: "gray.600" }}
          onChange={handleInputChange}
        >
          <option value="customer">Customer</option>
          <option value="retailer">Retailer</option>
          <option value="admin">Admin</option>
        </Select>
        <Input
          name="name"
          placeholder="Full Name"
          bg="gray.700"
          color="white"
          mb={4}
          _hover={{ bg: "gray.600" }}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          placeholder="Email"
          bg="gray.700"
          color="white"
          mb={4}
          _hover={{ bg: "gray.600" }}
          onChange={handleInputChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          bg="gray.700"
          color="white"
          mb={6}
          _hover={{ bg: "gray.600" }}
          onChange={handleInputChange}
        />

        {/* Conditional fields for Customers */}
        {formData.accountType === "customer" && (
          <>
            <Input
              name="drivingLicenseId"
              placeholder="Driving License ID"
              bg="gray.700"
              color="white"
              mb={4}
              _hover={{ bg: "gray.600" }}
              onChange={handleAdditionalChange}
            />
            <Select
              name="verificationType"
              bg="gray.700"
              color="white"
              mb={4}
              _hover={{ bg: "gray.600" }}
              onChange={handleAdditionalChange}
            >
              <option value="aadhar">Aadhar</option>
              <option value="pan">PAN</option>
            </Select>
            <Input
              name="verificationId"
              placeholder="Verification ID"
              bg="gray.700"
              color="white"
              mb={4}
              _hover={{ bg: "gray.600" }}
              onChange={handleAdditionalChange}
            />
          </>
        )}

        <Button colorScheme="green" w="100%" onClick={handleSignUp}>
          Sign Up
        </Button>
      </MotionBox>
    </Flex>
  );
};

export default SignUp;
