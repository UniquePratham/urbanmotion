import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
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

const customerDashboardData = [
  { icon: FaCar, label: "My Bookings" },
  { icon: FaCalendarAlt, label: "Book a Car" },
  { icon: FaBell, label: "Notifications" },
  { icon: FaUser, label: "Profile" },
  { icon: FaMoneyBillWave, label: "Payments" },
  { icon: FaFileAlt, label: "Rental History" },
  { icon: FaSignOutAlt, label: "Logout" },
];

// Sidebar Component
const Sidebar = ({ text, datas, onLogout }) => (
  <Box
    w={{ base: "100%", md: "20%" }}
    bg="gray.800"
    p={4}
    h="100vh"
    color="white"
  >
    {/* Brand Name */}
    <Text fontSize="2xl" fontWeight="bold" color="#00db00" mb={6}>
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
          bg="gray.700"
          _hover={{ bg: "#00db00", color: "white" }}
          onClick={data.label === "Logout" ? onLogout : null}
        >
          <Icon as={data.icon} w={6} h={6} />
          <Text fontWeight="medium">{data.label}</Text>
        </Flex>
      ))}
    </VStack>
  </Box>
);

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

  const bgColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Flex>
      <Sidebar
        text="Customer Dashboard"
        datas={customerDashboardData}
        onLogout={handleLogout}
      />
      <Box flex="1" p={6} bg={bgColor} borderRadius="lg">
        <Heading color="teal.500" mb={4}>
          Welcome, {customerData?.name || "Guest"}!
        </Heading>
        <Text color="gray.500" mb={6}>
          Here&apos;s your dashboard where you can manage bookings, account
          settings, and more.
        </Text>
        {customerData ? (
          <Box>
            <Text>Name: {customerData.name}</Text>
            <Text>Email: {customerData.email}</Text>
          </Box>
        ) : (
          <Text>Loading customer details...</Text>
        )}
      </Box>
    </Flex>
  );
};

export default CustomerDashboard;
