import { Box, useToast, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomerDashboard from "../components/Dashboard/CustomerDashboard";
import RetailerDashboard from "../components/Dashboard/RetailerDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    // Fetch userType from localStorage
    const storedUserType = localStorage.getItem("userType");

    // If userType is not found, redirect to login page
    if (!storedUserType) {
      toast({
        title: "Not Authenticated",
        description: "Please log in to access the dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      router.push("/signin");
      return;
    }

    // Set the userType from localStorage and stop the loading spinner
    setUserType(storedUserType);
    setLoading(false);
  }, [toast, router]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  return (
    <Box p={6} bg="gray.900" minH="100vh">
      {userType === "customer" && <CustomerDashboard />}
      {userType === "retailer" && <RetailerDashboard />}
      {userType === "admin" && <AdminDashboard />}
      {!userType && (
        <Text color="gray.400">Invalid user type. Please log in again.</Text>
      )}
    </Box>
  );
};

export default Dashboard;
