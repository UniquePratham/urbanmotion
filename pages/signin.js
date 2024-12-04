import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Link,
  useToast,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Others/Footer";
import Navbar from "@/components/Others/Navbar";

const MotionBox = motion(Box);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [adminPassphrase, setAdminPassphrase] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      // Determine the endpoint based on userType
      let endpoint = "";
      if (userType === "customer") {
        endpoint = "/api/customers/verify-customer";
      } else if (userType === "retailer") {
        endpoint = "/api/retailers/verify-retailer";
      } else if (userType === "admin") {
        // Check admin passphrase (in case the backend requires one)
        if (adminPassphrase !== "urbancars") {
          throw new Error("Invalid admin passphrase.");
        }
        endpoint = "/api/admins/verify-admin";
      }

      // Prepare form data (without userType)
      const formData = { email, password };

      // Log the JSON and the endpoint to the console
      console.log(
        "Posting to endpoint:",
        `https://urban-motion-backend.vercel.app${endpoint}`
      );
      console.log("Posted JSON:", JSON.stringify(formData));

      // Make POST request to the appropriate endpoint
      const response = await fetch(
        `https://urban-motion-backend.vercel.app${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Log response status and body
      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("Response JSON:", result);

      // Check if the response is successful and contains the sessionId
      // Inside handleSignIn function in SignIn component
      // Inside handleSignIn function in SignIn component
      if (response.ok && result.verified) {
        toast({
          title: "Success",
          description: "Logged in successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Store user type in localStorage
        localStorage.setItem("userType", userType);
        if (result.sessionId) {
          localStorage.setItem("sessionId", result.sessionId);
          console.log("Session ID stored in localStorage:", result.sessionId);
        }

        // Redirect to the dashboard page after successful login
        router.push("/dashboard");
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
    <>
      <Navbar />
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
          <Select
            bg="gray.700"
            color="white"
            mb={4}
            _hover={{ bg: "gray.600" }}
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="retailer">Retailer</option>
            <option value="admin">Admin</option>
          </Select>
          <Input
            placeholder="Email"
            bg="gray.700"
            color="white"
            mb={4}
            _hover={{ bg: "gray.600" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            bg="gray.700"
            color="white"
            mb={4}
            _hover={{ bg: "gray.600" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {userType === "admin" && (
            <Input
              type="password"
              placeholder="Admin Passphrase"
              bg="gray.700"
              color="white"
              mb={4}
              _hover={{ bg: "gray.600" }}
              value={adminPassphrase}
              onChange={(e) => setAdminPassphrase(e.target.value)}
            />
          )}
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
      <Footer />
    </>
  );
};

export default SignIn;
