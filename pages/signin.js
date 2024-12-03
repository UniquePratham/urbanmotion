import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "https://urban-motion-backend.vercel.app/api/verify-customer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: result.message || "Logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(result.message || "Invalid login credentials.");
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
      >
        <Heading color="white" mb={6} textAlign="center">
          Sign In
        </Heading>
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
          type="password"
          placeholder="Password"
          bg="gray.700"
          color="white"
          mb={6}
          _hover={{ bg: "gray.600" }}
          onChange={handleInputChange}
        />
        <Button colorScheme="green" w="100%" onClick={handleSignIn}>
          Sign In
        </Button>
        <Text color="gray.400" mt={4} textAlign="center">
          Don&apos;t have an account?{" "}
          <Link color="green.400" href="/signup">
            Sign Up Here
          </Link>
        </Text>
      </MotionBox>
    </Flex>
  );
};

export default SignIn;
