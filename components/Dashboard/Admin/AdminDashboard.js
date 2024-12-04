import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import {
  FaUsers,
  FaCar,
  FaRegChartBar,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
  FaWrench,
  FaClipboardList,
} from "react-icons/fa";
import SideBar from "../CommonDashboardComponents/SideBar";

// Admin Dashboard data
const adminDashboardData = [
  { icon: FaUsers, label: "Manage Users" },  // Admin managing the platform's users
  { icon: FaCar, label: "Manage Cars" },  // Admin managing cars rented on the platform
  { icon: FaRegChartBar, label: "Statistics" },  // Admin viewing platform-wide stats
  { icon: FaUserShield, label: "User Reports" },  // Admin can view user complaints or issues
  { icon: FaWrench, label: "Settings" },  // Admin configuring platform settings
  { icon: FaClipboardList, label: "Pending Approvals" },  // Admin viewing requests for new car rentals or user approvals
  { icon: FaCog, label: "System Logs" },  // Admin can access logs for platform operations
  { icon: FaSignOutAlt, label: "Logout" },  // Logging out from the admin panel
];


const AdminDashboard = () => {
  return (
    <>
      <SideBar text="Admin Dashboard" datas={adminDashboardData} />
      <Box p={6} bg="gray.800" borderRadius="lg">
        <Heading color="white" mb={4}>
          Admin Dashboard
        </Heading>
        <Text color="gray.400" mb={6}>
          Welcome to the admin dashboard. Manage users, view analytics, and
          perform other administrative tasks.
        </Text>
        <VStack spacing={4}>
          <Button colorScheme="red" w="full">
            Manage Users
          </Button>
          <Button colorScheme="red" w="full">
            View Analytics
          </Button>
          <Button colorScheme="red" w="full">
            Site Settings
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default AdminDashboard;
