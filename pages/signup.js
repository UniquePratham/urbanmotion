import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Link,
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
    verificationType: "aadhar", // Default verification type
    verificationId: "",
  });
  const toast = useToast();

  // General input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Additional data input change handler
  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign Up button handler
  const handleSignUp = async () => {
    const apiEndpoints = {
      customer:
        "https://urban-motion-backend.vercel.app/api/customers/add-customer",
      retailer:
        "https://urban-motion-backend.vercel.app/api/retailers/add-retailer",
      admin: "https://urban-motion-backend.vercel.app/api/admins/add-admin",
    };

    const { accountType, ...filteredFormData } = formData; // Remove accountType
    const payload = {
      ...filteredFormData,
      drivingLicenseId: additionalData.drivingLicenseId,
      verificationType: additionalData.verificationType,
      verificationId: additionalData.verificationId,
    };

    if (!payload.verificationId) {
      toast({
        title: "Error",
        description: "Verification ID is required for all account types.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

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
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        px={{ base: 6, md: 8 }}
        py={8}
        borderRadius="lg"
        bg="gray.800"
        boxShadow="lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        width="100%"
        maxWidth="400px"
        textAlign="center"
      >
        <Heading color="white" mb={6}>
          Create an Account
        </Heading>
        <Text color="gray.400" mb={4}>
          Sign up to start your journey with us!
        </Text>
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
        <Input
          name="drivingLicenseId"
          placeholder="Driving License ID (optional)"
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
        <Button colorScheme="green" w="100%" mb={4} onClick={handleSignUp}>
          Sign Up
        </Button>
        <Text color="gray.400" fontSize="sm">
          Already have an account?{" "}
          <Link color="teal.300" href="/signin">
            Log in
          </Link>
        </Text>
      </MotionBox>
    </Flex>
  );
};

export default SignUp;
