import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../CommonDashboardComponents/SideBar";
import MainContent from "./MainContent";
import BookCar from "./BookCar";
import Bookings from "./Bookings";
import Notifications from "./Notifications";
import Payments from "./Payments";
import RentalHistory from "./RentalHistory";
import { useRouter } from "next/router";

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setCustomerData(data.data))
        .catch((err) => console.error("Failed to fetch customer data:", err));
    }
  }, []);

  const sidebarData = [
    { icon: "FaCar", label: "Book a Car", path: "/dashboard/book-car" },
    {
      icon: "FaCalendarAlt",
      label: "My Bookings",
      path: "/dashboard/bookings",
    },
    {
      icon: "FaBell",
      label: "Notifications",
      path: "/dashboard/notifications",
    },
    { icon: "FaMoneyBillWave", label: "Payments", path: "/dashboard/payments" },
    {
      icon: "FaFileAlt",
      label: "Rental History",
      path: "/dashboard/rental-history",
    },
  ];

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard":
        return <MainContent customerData={customerData} />;
      case "/dashboard/book-car":
        return <BookCar />;
      case "/dashboard/bookings":
        return <Bookings />;
      case "/dashboard/notifications":
        return <Notifications />;
      case "/dashboard/payments":
        return <Payments />;
      case "/dashboard/rental-history":
        return <RentalHistory />;
      default:
        return <MainContent customerData={customerData} />;
    }
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Sidebar text="Customer Dashboard" datas={sidebarData} />
      <Box flex="1" p={4}>
        {renderContent()}
      </Box>
    </Flex>
  );
};

export default CustomerDashboard;
