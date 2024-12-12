import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Stack,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { Line, Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Statistics = () => {
  const [users, setUsers] = useState(0);
  const [retailers, setRetailers] = useState(0);
  const [cars, setCars] = useState(0);
  const [avgRatings, setAvgRatings] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [customersPerDay, setCustomersPerDay] = useState([]);
  const [carsPerDay, setCarsPerDay] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users
        const usersRes = await axios.get(
          "https://urban-motion-backend.vercel.app/api/customers/all-customers"
        );
        setUsers(usersRes.data.length);
        console.log("Fetched Users:", usersRes.data);

        // Fetch retailers
        const retailersRes = await axios.get(
          "https://urban-motion-backend.vercel.app/api/retailers/all-retailers"
        );
        setRetailers(retailersRes.data.retailers.length);
        console.log("Fetched Retailers:", retailersRes.data);

        // Fetch cars
        const carsRes = await axios.get(
          "https://urban-motion-backend.vercel.app/api/cars/all-cars"
        );
        setCars(carsRes.data.cars.length);
        const totalRating = carsRes.data.cars.reduce(
          (acc, car) => acc + car.rating,
          0
        );
        const avgRating =
          carsRes.data.cars.length > 0
            ? totalRating / carsRes.data.cars.length
            : 0;
        setAvgRatings(avgRating);
        console.log("Fetched Cars:", carsRes.data);

        // Generate random customers and cars per day (mock data)
        const customerGrowth = generateGrowthData(usersRes.data.length, 30); // 30 days growth
        const carGrowth = generateGrowthData(carsRes.data.cars.length, 30); // 30 days growth

        setCustomersPerDay(customerGrowth);
        setCarsPerDay(carGrowth);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Function to generate random growth data
  const generateGrowthData = (initialValue, days) => {
    let data = [];
    let value = initialValue;
    for (let i = 0; i < days; i++) {
      value += Math.floor(Math.random() * 10); // Simulate 10 new users/cars per day on average
      data.push(value);
    }
    return data;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading size="lg" mb={8}>
        Statistics Overview
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Stack spacing={4}>
              <Heading size="md">Total Users</Heading>
              <Text fontSize="2xl">{users}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack spacing={4}>
              <Heading size="md">Total Retailers</Heading>
              <Text fontSize="2xl">{retailers}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack spacing={4}>
              <Heading size="md">Total Cars</Heading>
              <Text fontSize="2xl">{cars}</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stack spacing={4}>
              <Heading size="md">Average Car Rating</Heading>
              <Text fontSize="2xl">{avgRatings.toFixed(2)}</Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Divider my={8} />

      <Heading size="md" mb={4}>
        Growth Over Time
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Line
              data={{
                labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                datasets: [
                  {
                    label: "Users Growth",
                    data: customersPerDay,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Line
              data={{
                labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                datasets: [
                  {
                    label: "Cars Growth",
                    data: carsPerDay,
                    fill: false,
                    borderColor: "rgb(255, 99, 132)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Statistics;
