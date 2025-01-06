import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
  Spinner,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FaUsers, FaStore, FaCar } from "react-icons/fa"; // Importing icons
import axios from "axios";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const UserReports = () => {
  const [users, setUsers] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users, retailers, and cars
        const usersRes = await axios.get(
          "https://urban-motion-backend.vercel.app/api/customers/all-customers"
        );
        const retailersRes = await axios.get(
          "https://urban-motion-backend.vercel.app/api/retailers/all-retailers"
        );
        const carsRes = await axios.get(
          "https://urban-motion-backend.vercel.app/api/cars/all-cars"
        );

        setUsers(usersRes.data);
        setRetailers(retailersRes.data.retailers);
        setCars(carsRes.data.cars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description:
            "There was an error fetching data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generatePDF = (type) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.addImage("pdf_logo.png", "PNG", 10, 10, 50, 10); // Add logo
    doc.text("Report - UrbanMotion", 80, 20);
    doc.setFontSize(12);

    if (type === "customers") {
      doc.text("Users:", 20, 40);
      users.forEach((user, index) => {
        doc.text(
          `${index + 1}. Name: ${user.name}, Email: ${user.email}`,
          20,
          50 + index * 10
        );
      });
    }

    if (type === "retailers") {
      doc.text("Retailers:", 20, 50 + users.length * 10 + 10);
      retailers.forEach((retailer, index) => {
        doc.text(
          `${index + 1}. Name: ${retailer.name}, Email: ${retailer.email}`,
          20,
          60 + (users.length + index) * 10
        );
      });
    }

    if (type === "cars") {
      doc.text("Cars:", 20, 60 + (users.length + retailers.length) * 10 + 10);
      cars.forEach((car, index) => {
        doc.text(
          `${index + 1}. Model: ${car.model}, Price: ${car.price}`,
          20,
          70 + (users.length + retailers.length + index) * 10
        );
      });
    }

    // Save the document
    doc.save(`${type}-report.pdf`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal" />
      </Box>
    );
  }

  return (
    <Box p={5} bg="gray.800" minH="100vh" color="white">
      <Heading size="lg" mb={8} color="teal.300" textAlign="center">
        User Reports
      </Heading>
      <Text mb={4} textAlign="center" fontSize="lg">
        Download the latest reports for users, retailers, and cars.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        {/* Customer Report */}
        <Box
          p={5}
          bg="gray.700"
          boxShadow="lg"
          borderRadius="lg"
          textAlign="center"
        >
          <Heading size="md" mb={2} color="teal.400">
            <Icon as={FaUsers} mr={2} /> Customer Report
          </Heading>
          <Button
            colorScheme="teal"
            onClick={() => generatePDF("customers")}
            width="full"
            variant="solid"
          >
            Download Customer Report
          </Button>
        </Box>

        {/* Retailer Report */}
        <Box
          p={5}
          bg="gray.700"
          boxShadow="lg"
          borderRadius="lg"
          textAlign="center"
        >
          <Heading size="md" mb={2} color="teal.400">
            <Icon as={FaStore} mr={2} /> Retailer Report
          </Heading>
          <Button
            colorScheme="teal"
            onClick={() => generatePDF("retailers")}
            width="full"
            variant="solid"
          >
            Download Retailer Report
          </Button>
        </Box>

        {/* Car Report */}
        <Box
          p={5}
          bg="gray.700"
          boxShadow="lg"
          borderRadius="lg"
          textAlign="center"
        >
          <Heading size="md" mb={2} color="teal.400">
            <Icon as={FaCar} mr={2} /> Car Report
          </Heading>
          <Button
            colorScheme="teal"
            onClick={() => generatePDF("cars")}
            width="full"
            variant="solid"
          >
            Download Car Report
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserReports;
