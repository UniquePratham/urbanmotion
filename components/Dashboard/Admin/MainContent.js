import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const MainContent = () => {
  const [adminData, setAdminData] = useState(null);
  const bgColor = useColorModeValue("gray.800", "gray.800");

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      // Simulate fetching admin data based on session ID
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setAdminData(data.data))
        .catch((err) => console.error("Failed to fetch admin data:", err));
    }
  }, []);

  return (
    <Box flex="1" p={6} bg={bgColor} borderRadius="lg">
      <Heading color="teal.400" mb={4}>
        Welcome, {adminData?.name || "Admin"}!
      </Heading>
      <Text color="gray.400" mb={6}>
        Here&apos;s your admin dashboard where you can manage users, retailers,
        cars, and more.
      </Text>

      {adminData ? (
        <Box color="gray.100">
          <Text>Name: {adminData.name}</Text>
          <Text>Email: {adminData.email}</Text>
        </Box>
      ) : (
        <Text>Loading admin details...</Text>
      )}
    </Box>
  );
};

export default MainContent;
