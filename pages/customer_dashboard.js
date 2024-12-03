// pages/dashboard.js
import {
    Box,
    Flex,
    Text,
    Grid,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Icon,
    VStack,
    Divider,
    HStack,
    Link,
    Image
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import { FiHome, FiUser, FiCar, FiBell, FiSettings, FiPieChart } from "react-icons/fi";
  import { BiLogOut } from "react-icons/bi";
  
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);
  
  export default function Dashboard() {
    return (
      <Flex h="100vh" bg="gray.900" color="white">
        {/* Sidebar */}
        <Box w="20%" bg="gray.800" p={4} textAlign="center">
        <Link href="/" _hover={{ textDecoration: "none" }} display="flex" justifyContent="center">
        <Image src="/hori.png" alt="Logo" h="40px" cursor="pointer" />
      </Link>
          <Text fontSize="xl" fontWeight="bold" color="#00db00" m={3} cursor="pointer" mb={6} _hover={{color:"white",borderRadius:"10px", bgColor:"#00db00",border:"5px solid black"}}>
            CAR RENTAL SYSTEM
          </Text>
          <VStack align="center" spacing={4}>
            <SidebarItem icon={FiHome} label="Dashboard" />
            <SidebarItem icon={FiUser} label="Drivers" />
            <SidebarItem icon={FiCar} label="Bookings" />
            <SidebarItem icon={FiBell} label="Notifications" />
            <SidebarItem icon={FiSettings} label="Settings" />
            <Divider borderColor="gray.700" />
            <SidebarItem icon={FiPieChart} label="Reports" />
            <SidebarItem icon={BiLogOut} label="Logout" />
          </VStack>
        </Box>
  
        {/* Main Content */}
        <Box flex="1" p={6}>
          {/* Top Section */}
          <Flex justify="space-between" align="center" mb={8}>
            <Text fontSize="lg" color="gray.400">
              Tue, 14 Nov 2023, 11:30 AM
            </Text>
            <Input placeholder="Search here" bg="gray.800" border="none" />
          </Flex>
  
          {/* Statistics */}
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <StatCard label="Income" value="$9460.00" growth="-1.5%" />
            <StatCard label="Expenses" value="$5660.00" growth="2.5%" />
            <PieChartCard />
          </Grid>
  
          {/* Car Availability & Status */}
          <Grid templateColumns="2fr 1fr" gap={6} mt={8}>
            <CarAvailability />
            <CarStatus />
          </Grid>
  
          {/* Earnings Summary */}
          <Box bg="gray.800" p={6} borderRadius="md" boxShadow="lg">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Earning Summary
            </Text>
            <Text color="gray.400" fontSize="sm" mb={4}>
              Last 6 months vs Same period last year
            </Text>
            {/* Replace below box with a graphing library like `react-chartjs-2` */}
            <MotionBox h="200px" bg="gray.700" borderRadius="md" />
          </Box>
        </Box>
      </Flex>
    );
  }
  
  // Sidebar Item Component
  const SidebarItem = ({ icon, label }) => (
    <MotionBox
      as={Flex}
      align="center"
      gap={3}
      p={3}
      w="100%"
      cursor="pointer"
      borderRadius="md"
      whileHover={{ scale: 1.05, backgroundColor: "#00db00" }}
      transition="all 0.2s ease"
    >
      <Icon as={icon} w={6} h={6} />
      <Text fontWeight="medium">{label}</Text>
    </MotionBox>
  );
  
  // Statistic Card Component
  const StatCard = ({ label, value, growth }) => (
    <MotionBox
      p={6}
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      whileHover={{ scale: 1.05 }}
      transition="all 0.2s ease"
    >
      <Text fontSize="sm" color="gray.400" mb={2}>
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
      <Text
        fontSize="sm"
        color={growth.startsWith("-") ? "red.400" : "#00db00"}
        mt={1}
      >
        {growth} compared to yesterday
      </Text>
    </MotionBox>
  );
  
  // Pie Chart Card Component (Placeholder)
  const PieChartCard = () => (
    <MotionBox
      p={6}
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      whileHover={{ scale: 1.05 }}
      transition="all 0.2s ease"
    >
      <Text fontSize="sm" color="gray.400" mb={2}>
        Hire vs Cancel
      </Text>
      <Box h="100px" bg="gray.700" borderRadius="md" />
    </MotionBox>
  );
  
  // Car Availability Component
  const CarAvailability = () => (
    <MotionBox
      p={6}
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      whileHover={{ scale: 1.05 }}
      transition="all 0.2s ease"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Car Availability
      </Text>
      <HStack spacing={4}>
        <Input placeholder="Car number" bg="gray.700" border="none" />
        <Input placeholder="Date" bg="gray.700" border="none" />
        <MotionButton
          bg="#00db00"
          color="white"
          _hover={{ bg: "#00a700" }}
          whileHover={{ scale: 1.05 }}
          transition="all 0.2s ease"
        >
          Check
        </MotionButton>
      </HStack>
    </MotionBox>
  );
  
  // Live Car Status Component
  const CarStatus = () => (
    <MotionBox
      p={6}
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      whileHover={{ scale: 1.05 }}
      transition="all 0.2s ease"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Live Car Status
      </Text>
      <Table variant="simple" size="sm" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Car no.</Th>
            <Th>Driver</Th>
            <Th>Status</Th>
            <Th>Earning</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>01</Td>
            <Td>6455</Td>
            <Td>Alex Norman</Td>
            <Td>Completed</Td>
            <Td>$35.44</Td>
          </Tr>
          {/* Add more rows here */}
        </Tbody>
      </Table>
    </MotionBox>
  );
  