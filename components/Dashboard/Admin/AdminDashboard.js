import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../CommonDashboardComponents/SideBar";
import ManageUsers from "./ManageUsers";
import ManageRetailers from "./ManageRetailers";
import ManageCars from "./ManageCars";
import Statistics from "./Statistics";
import UserReports from "./UserReports";
import SystemLogs from "./SystemLogs";
import MainContent from "./MainContent"; // Import MainContent
import { useRouter } from "next/router";

// Import icons from react-icons
import {
  FaUsers,
  FaWarehouse,
  FaCar,
  FaUser,
  FaChartBar,
  FaFileAlt,
  FaDatabase,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("manage-users"); // Default active component
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://your-api-endpoint.com/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setAdminData(data.data))
        .catch((err) => console.error("Failed to fetch admin data:", err));
    }
  }, []);

  const sidebarData = [
    { icon: FaUsers, label: "Manage Users", path: "manage-users" },
    { icon: FaWarehouse, label: "Manage Retailers", path: "manage-retailers" },
    { icon: FaCar, label: "Manage Cars", path: "manage-cars" },
    { icon: FaChartBar, label: "Statistics", path: "statistics" },
    { icon: FaFileAlt, label: "User Reports", path: "user-reports" },
    { icon: FaDatabase, label: "System Logs", path: "system-logs" },
    { icon: FaUser, label: "Profile", path: "profile" }
  ];

  // Handle clicking sidebar buttons to change active component
  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "manage-users":
        return <ManageUsers />;
      case "manage-retailers":
        return <ManageRetailers />;
      case "manage-cars":
        return <ManageCars />;
      case "statistics":
        return <Statistics />;
      case "user-reports":
        return <UserReports />;
      case "system-logs":
        return <SystemLogs />;
      case "profile":
        return <MainContent />; // Display admin profile content
      default:
        return <ManageUsers />;
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Sidebar
        text="Admin Dashboard"
        datas={sidebarData}
        onSidebarClick={handleSidebarClick} // Pass the click handler
      />
      <Box
        flex="1"
        p={4}
        color="white"
        borderRadius="20px"
        bg="gray.800" // Ensure the content area has a solid background
        zIndex={10} // Ensure the content area is above the sidebar
        position="relative" // Keep content positioned above the sidebar
      >
        {renderContent()} {/* Render the active component */}
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
