import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../CommonDashboardComponents/SideBar";
import AddCar from "./AddCar";
import RemoveCar from "./RemoveCar";
import Notifications from "./Notifications";
import CarsBooked from "./CarsBooked";
import Cars from "./Cars";
import MainContent from "./MainContent";
import { useRouter } from "next/router";

// Import icons from react-icons
import {
  FaCar,
  FaTrash,
  FaBell,
  FaCalendarAlt,
  FaExchangeAlt,
  FaUser,
} from "react-icons/fa";

const RetailerDashboard = () => {
  const [retailerData, setRetailerData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("profile"); // Default active component
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      // Fetch retailer session data using the sessionId from localStorage
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setRetailerData(data.data))
        .catch((err) => console.error("Failed to fetch retailer data:", err));
    } else {
      // Redirect to login page if sessionId doesn't exist
      router.push("/login");
    }
  }, []);

  // Handle clicking sidebar buttons to change active component
  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "add-car":
        return <AddCar />;
      case "remove-car":
        return <RemoveCar />;
      case "notifications":
        return <Notifications />;
      case "mycars":
        return <Cars />;
      case "cars-booked":
        return <CarsBooked />;
      case "profile":
        return <MainContent retailerData={retailerData} />; // Profile component with retailer data
      default:
        return <AddCar />;
    }
  };

  const sidebarData = [
    { icon: FaUser, label: "Profile", path: "profile" },
    { icon: FaCar, label: "Add Car", path: "add-car" },
    { icon: FaCalendarAlt, label: "My Cars", path: "mycars" },
    { icon: FaTrash, label: "Remove Car", path: "remove-car" },
    { icon: FaCalendarAlt, label: "Cars Booked", path: "cars-booked" },
    { icon: FaBell, label: "Notifications", path: "notifications" },
  ];

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Sidebar
        text="Retailer Dashboard"
        datas={sidebarData}
        onSidebarClick={handleSidebarClick} // Pass the click handler
      />
      <Box
        flex="1"
        p={4}
        color="white"
        borderRadius={{base:0,md:"20px"}}
        bg="gray.900" // Ensure the content area has a solid background
        zIndex={10} // Ensure the content area is above the sidebar
        position="relative" // Keep content positioned above the sidebar
      >
        {renderContent()} {/* Render the active component */}
      </Box>
    </Flex>
  );
};

export default RetailerDashboard;
