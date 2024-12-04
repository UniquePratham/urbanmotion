import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Motion Components
const MotionBox = motion(Box);

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
    whileHover={{ scale: 1.05, backgroundColor: "#00db00", color: "white" }}
    transition="all 0.2s ease"
  >
    <Icon as={icon} w={6} h={6} />
    <Text fontWeight="medium">{label}</Text>
  </MotionBox>
);

// Sidebar Component
export default function SideBar({ text, datas }) {
  return (
    <Box
      w={{ base: "100%", md: "20%" }} // Responsive: Full width on small screens
      bg="gray.800"
      p={4}
      h="100vh"
      color="white"
    >
      {/* Brand Name */}
      <Text fontSize="2xl" fontWeight="bold" color="#00db00" mb={6}>
        URBAN MOTION
      </Text>

      {/* Sidebar Header */}
      <Text fontSize="xl" fontWeight="bold" color="#00db00" mb={6}>
        {text}
      </Text>

      {/* Sidebar Items */}
      <VStack align="start" spacing={4}>
        {datas.map((data, index) => (
          <SidebarItem key={index} icon={data.icon} label={data.label} />
        ))}
      </VStack>
    </Box>
  );
}
