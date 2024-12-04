import { Box, Heading, Text, Button, VStack, Flex } from "@chakra-ui/react";
import {
  FaCar,
  FaPlus,
  FaEdit,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import SideBar from "../CommonDashboardComponents/SideBar";

// Retailer dashboard data for the left sidebar
const retailerDashboardData = [
  { icon: FaCar, label: "My Cars" },
  { icon: FaPlus, label: "Add Car" },
  { icon: FaEdit, label: "Manage Cars" },
  { icon: FaCalendarCheck, label: "Booking Requests" },
  { icon: FaMoneyBillWave, label: "Earnings" },
  { icon: FaChartBar, label: "Statistics" },
  { icon: FaUser, label: "Profile" },
  { icon: FaSignOutAlt, label: "Logout" },
];

// Retailer Dashboard Component
const RetailerDashboard = () => {
  return (
    <Flex>
      {/* Left Sidebar */}
      <SideBar text="Retailer Dashboard" datas={retailerDashboardData} />

      {/* Right Content */}
      <Box flex="1" p={6} bg="gray.800" borderRadius="lg">
        <Heading color="white" mb={4}>
          Retailer Dashboard
        </Heading>
        <Text color="gray.400" mb={6}>
          Welcome to your dashboard, manage your store, view orders, and update
          your product catalog.
        </Text>
        <VStack spacing={4}>
          <Button colorScheme="blue" w="full">
            Manage Products
          </Button>
          <Button colorScheme="blue" w="full">
            View Orders
          </Button>
          <Button colorScheme="blue" w="full">
            Store Settings
          </Button>
        </VStack>
      </Box>

      {/* Right Sidebar for car management */}
      <Box
        w={{ base: "100%", md: "20%" }}
        bg="gray.900"
        p={4}
        h="100vh"
        color="white"
        display={{ base: "none", md: "block" }} // Only display on medium and larger screens
      >
        <Heading color="white" size="md" mb={6}>
          Car Management
        </Heading>
        <VStack spacing={4} align="start">
          <Button colorScheme="green" w="full">
            Add Car
          </Button>
          <Button colorScheme="red" w="full">
            Remove Car
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default RetailerDashboard;
