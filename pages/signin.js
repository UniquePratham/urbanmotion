import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex
      minH="100vh"
      bg="gray.900"
      direction={{ base: "column", md: "row" }} // Stack on small screens
    >
      {/* Left Side */}
      <MotionBox
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 0 }} // Add padding for small screens
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        bg={{ base: "gray.800", md: "transparent" }} // Dim background on mobile
        borderRadius={{ base: "md", md: "none" }} // Add rounded corners for mobile
      >
        <Heading color="white" mb={4} fontSize={{ base: "2xl", md: "4xl" }}>
          Login to Your Account
        </Heading>
        <Text color="gray.400" mb={6} fontSize={{ base: "sm", md: "md" }}>
          Login using social networks
        </Text>
        <Flex
          justify="center"
          mb={6}
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Button
            leftIcon={<FaFacebook />}
            colorScheme="facebook"
            bg="#4267B2"
            _hover={{ bg: "#365899" }}
            width={{ base: "full", md: "auto" }}
          >
            Facebook
          </Button>
          <Button
            leftIcon={<FaGoogle />}
            colorScheme="red"
            bg="#DB4437"
            _hover={{ bg: "#C33D2E" }}
            width={{ base: "full", md: "auto" }}
          >
            Google
          </Button>
          <Button
            leftIcon={<FaLinkedin />}
            colorScheme="linkedin"
            bg="#0077B5"
            _hover={{ bg: "#005B93" }}
            width={{ base: "full", md: "auto" }}
          >
            LinkedIn
          </Button>
        </Flex>
        <Text color="gray.400" mb={4} fontSize={{ base: "sm", md: "md" }}>
          OR
        </Text>
        <Input
          color="white"
          placeholder="Email"
          variant="filled"
          bg="gray.800"
          border="none"
          mb={4}
          _hover={{ bg: "gray.700" }}
        />
        <Flex position="relative" mb={6} w="100%">
          <Input
            color="white"
            placeholder="Password"
            variant="filled"
            bg="gray.800"
            border="none"
            type={showPassword ? "text" : "password"}
            pr="4rem"
            _hover={{ bg: "gray.700" }}
          />
          <Icon
            as={showPassword ? FaEyeSlash : FaEye}
            position="absolute"
            top="50%"
            right="1rem"
            transform="translateY(-50%)"
            color="gray.400"
            cursor="pointer"
            _hover={{ color: "white" }}
            onClick={togglePasswordVisibility}
          />
        </Flex>
        <Button colorScheme="green" w="full" mb={6}>
          Sign In
        </Button>
        <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
          Forgot Password?{" "}
          <Link color="green.400" href="#">
            Click Here
          </Link>
        </Text>
        <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} mt={4}>
          Don&apos;t have an account?{" "}
          <Link color="green.400" href="/signup">
            Sign Up Here
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
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 0 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading color="white" mb={4} fontSize={{ base: "2xl", md: "4xl" }}>
          New Here?
        </Heading>
        <Text
          color="white"
          textAlign="center"
          mb={8}
          fontSize={{ base: "sm", md: "md" }}
        >
          Sign up and discover a great amount of new opportunities!
        </Text>
        <Button
          as={Link}
          href="/signup"
          bg="white"
          color="green.500"
          _hover={{ bg: "gray.200" }}
          width={{ base: "full", md: "auto" }}
        >
          Sign Up
        </Button>
      </MotionBox>
    </Flex>
  );
};

export default SignIn;
