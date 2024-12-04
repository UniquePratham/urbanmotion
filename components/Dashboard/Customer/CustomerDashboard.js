import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import SideBar from "../CommonDashboardComponents/SideBar";
import { FaCar, FaCalendarAlt, FaBell, FaUser, FaMoneyBillWave, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

const customerDashboardData = [
  { icon: FaCar, label: "My Bookings" },
  { icon: FaCalendarAlt, label: "Book a Car" },
  { icon: FaBell, label: "Notifications" },
  { icon: FaUser, label: "Profile" },
  { icon: FaMoneyBillWave, label: "Payments" },
  { icon: FaFileAlt, label: "Rental History" },
  { icon: FaSignOutAlt, label: "Logout" },
];

const CustomerDashboard = () => {
  return (
    <>
    <SideBar text="Customer Dashboard" datas={customerDashboardData} />
    <Box p={6} bg="gray.800" borderRadius="lg">
      <Heading color="white" mb={4}>
        Customer Dashboard
      </Heading>
      <Text color="gray.400" mb={6}>
        Welcome to your dashboard, here you can track your orders, browse
        products, and manage your account.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="teal" w="full">
          My Orders
        </Button>
        <Button colorScheme="teal" w="full">
          Browse Products
        </Button>
        <Button colorScheme="teal" w="full">
          Account Settings
        </Button>
      </VStack>
    </Box>
    </>
  );
};

export default CustomerDashboard;
