import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
  Button,
  Link,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

// Motion Components
const MotionBox = motion(Box);

// Sidebar Item Component
const SidebarItem = ({ icon, label }) => (
  <Flex
    align="center"
    gap={3}
    p={2}
    w="100%"
    cursor="pointer"
    borderRadius="md"
    transition="all 0.2s ease"
    _hover={{
      color: "#00db00",
      transform: "translateX(10px)",
    }}
  >
    <Icon as={icon} w={6} h={6} />
    <Text fontWeight="medium" fontSize="lg">
      {label}
    </Text>
  </Flex>
);

// Sidebar Component
export default function SideBar({ text, datas }) {
  return (
    <MotionBox
      as={Box}
      w={{ base: "100%", md: "20%" }}
      h="100vh"
      bg="gray.900"
      p={4}
      color="white"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      shadow="xl"
    >
      {/* Logo and Brand Name */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <Flex align="center" gap={3} mb={6} cursor="pointer">
          <Icon as={FaHome} w={8} h={8} color="#00db00" />
          <Text fontSize="2xl" fontWeight="bold" color="#00db00">
            URBAN MOTION
          </Text>
        </Flex>
      </Link>

      {/* Sidebar Header */}
      <Text fontSize="xl" fontWeight="bold" color="#00db00" mb={6}>
        {text}
      </Text>

      <Divider borderColor="gray.700" mb={6} />

      {/* Sidebar Items */}
      <VStack align="start" spacing={4}>
        {datas.map((data, index) => (
          <SidebarItem key={index} icon={data.icon} label={data.label} />
        ))}
      </VStack>

      {/* Home Button */}
      <Box mt="auto" pt={6}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button
            leftIcon={<FaHome />}
            w="100%"
            bg="#00db00"
            color="black"
            _hover={{ bg: "green.500", color: "white" }}
          >
            Home
          </Button>
        </Link>
      </Box>
    </MotionBox>
  );
}
