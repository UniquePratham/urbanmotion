import { Box, Text, VStack, Flex, Icon, Image, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Icons for Profile and Logout

const Sidebar = ({ text, datas, onSidebarClick }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Logic to handle logout, like clearing user data or redirecting
    localStorage.removeItem("sessionId");
    router.push("/signin"); // Redirect to login page after logout
  };

  return (
    <Box
      w={{ base: "100%", md: "20%" }}
      bg="gray.900"
      p={4}
      h="100vh"
      color="white"
      shadow="xl"
      position="sticky"
      top={0}
      borderRight="2px solid #2d3748" // A subtle border to add a bit of structure
    >
      <Image
        src="/hori.png" // Path to the logo in the `public` folder
        alt="Urban Motion Logo"
        boxSize="180px" // Adjust size as needed
        objectFit="contain"
        mt={{ md: "-50px" }}
      />
      <Text fontSize="xl" mt={-6} fontWeight="light" color="#00db00" mb={6}>
        {text}
      </Text>
      <VStack align="start" spacing={4}>
        {datas.map((data, index) => (
          <Flex
            key={index}
            align="center"
            gap={3}
            p={3}
            w="100%"
            cursor="pointer"
            borderRadius="md"
            transition="all 0.3s ease"
            _hover={{
              bg: "#00db00",
              color: "white",
              transform: "translateX(5px)",
            }}
            onClick={() => onSidebarClick(data.path)} // Update the active component
          >
            <Icon as={data.icon} w={6} h={6} />
            <Text fontWeight="medium" fontSize="lg">
              {data.label}
            </Text>
          </Flex>
        ))}
      </VStack>
      <Spacer />{" "}
      {/* This creates space to push the Profile and Logout buttons to the bottom */}
      {/* Profile Section */}
      {/* Logout Section */}
      <Flex
        align="center"
        mt={8}
        gap={3}
        p={3}
        w="100%"
        cursor="pointer"
        borderRadius="md"
        transition="all 0.3s ease"
        _hover={{
          bg: "red.600", // Red background on hover for logout
          color: "white",
          transform: "translateX(5px)",
        }}
        onClick={handleLogout} // Handle logout logic
      >
        <Icon as={FaSignOutAlt} w={6} h={6} />
        <Text fontWeight="medium" fontSize="lg">
          Logout
        </Text>
      </Flex>
    </Box>
  );
};

export default Sidebar;
