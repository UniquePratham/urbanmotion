import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SignUp = () => {
  return (
    <Flex minH="100vh" bg="gray.900">
      {/* Left Side */}
      <MotionBox
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={8}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading color="white" mb={4}>
          Create an Account
        </Heading>
        <Text color="gray.400" mb={8}>
          Sign up to explore more opportunities!
        </Text>
        <Input
          placeholder="Full Name"
          variant="filled"
          bg="gray.800"
          border="none"
          color="white" // Added white text color
          mb={4}
          _hover={{ bg: "gray.700" }}
        />
        <Input
          placeholder="Email"
          variant="filled"
          bg="gray.800"
          border="none"
          color="white" // Added white text color
          mb={4}
          _hover={{ bg: "gray.700" }}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          bg="gray.800"
          border="none"
          color="white" // Added white text color
          mb={6}
          _hover={{ bg: "gray.700" }}
        />
        <Button colorScheme="green" w="100%" mb={6}>
          Sign Up
        </Button>
        <Text color="gray.400">
          Already have an account?{" "}
          <Link color="green.400" href="/signin">
            Login Here
          </Link>
        </Text>
      </MotionBox>

      {/* Right Side */}
      <MotionBox
        flex="1"
        bgGradient="linear(to-r, green.400, green.600)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={8}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading color="white" mb={4}>
          Welcome Back!
        </Heading>
        <Text color="white" textAlign="center" mb={8}>
          Already have an account? Log in to access your opportunities!
        </Text>
        <Button
          bg="white"
          color="green.500"
          _hover={{ bg: "gray.200" }}
          as="a"
          href="/signin"
        >
          Login
        </Button>
      </MotionBox>
    </Flex>
  );
};

export default SignUp;
