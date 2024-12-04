import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
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

const RetailerDashboard = () => {
  return (
    <>
    <SideBar text="Retailer Dashboard" datas={retailerDashboardData} />
    <Box p={6} bg="gray.800" borderRadius="lg">
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
    </>
  );
};

export default RetailerDashboard;
