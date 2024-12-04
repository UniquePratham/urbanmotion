import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCar,
  FaCalendarAlt,
  FaBell,
  FaUser,
  FaMoneyBillWave,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

// Sidebar Component
const Sidebar = ({ text, datas, onLogout }) => (
  <Box
    w={{ base: "100%", md: "20%" }}
    bg="gray.900"
    p={4}
    h="100vh"
    color="white"
    shadow="xl"
  >
    {/* Brand Name */}
    <Text fontSize="2xl" fontWeight="bold" color="#00db00" mb={8}>
      URBAN MOTION
    </Text>

    {/* Sidebar Header */}
    <Text fontSize="xl" fontWeight="bold" color="#00db00" mb={6}>
      {text}
    </Text>

    {/* Sidebar Items */}
    <VStack align="start" spacing={4}>
      {datas.map((data, index) => (
        <Flex
          key={index}
          align="center"
          gap={3}
          p={3}
          w="100%"
          cursor="pointer"
          borderRadius="md"
          transition="all 0.2s ease"
          _hover={{
            bg: "#00db00",
            color: "white",
            transform: "translateX(5px)",
          }}
          onClick={data.label === "Logout" ? onLogout : null}
        >
          <Icon as={data.icon} w={6} h={6} />
          <Text fontWeight="medium" fontSize="lg">
            {data.label}
          </Text>
        </Flex>
      ))}
    </VStack>
  </Box>
);

// Main Content Component
const MainContent = ({ customerData }) => {
  const bgColor = useColorModeValue("gray.800", "gray.800");

  return (
    <Box flex="1" p={6} bg={bgColor} borderRadius="lg">
      <Heading color="teal.400" mb={4}>
        Welcome, {customerData?.name || "Guest"}!
      </Heading>
      <Text color="gray.400" mb={6}>
        Here&apos;s your dashboard where you can manage bookings, account
        settings, and more.
      </Text>
      {customerData ? (
        <Box color="gray.100">
          <Text>Name: {customerData.name}</Text>
          <Text>Email: {customerData.email}</Text>
        </Box>
      ) : (
        <Text>Loading customer details...</Text>
      )}
    </Box>
  );
};

// Dashboard Container Component
const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setCustomerData(data.data))
        .catch((err) => console.error("Failed to fetch customer data:", err));
    }
  }, []);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("sessionId");
    localStorage.removeItem("userType");

    // Redirect to the login page
    window.location.href = "/signin";
  };

  return (
    <Flex>
      <Sidebar
        text="Customer Dashboard"
        datas={[
          { icon: FaCar, label: "My Bookings" },
          { icon: FaCalendarAlt, label: "Book a Car" },
          { icon: FaBell, label: "Notifications" },
          { icon: FaUser, label: "Profile" },
          { icon: FaMoneyBillWave, label: "Payments" },
          { icon: FaFileAlt, label: "Rental History" },
          { icon: FaSignOutAlt, label: "Logout" },
        ]}
        onLogout={handleLogout}
      />
      <MainContent customerData={customerData} />
    </Flex>
  );
};

export default CustomerDashboard;
