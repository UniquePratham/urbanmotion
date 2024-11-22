import { Box, Flex, Link, Button, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      align="center"
      padding="1.5rem"
      bg="gray.800"
      color="white"
      boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold" color="green.300">
        rent
      </Text>
      <Flex gap="4">
        <Link href="#" _hover={{ color: "green.300" }}>
          Home
        </Link>
        <Link href="#" _hover={{ color: "green.300" }}>
          Cars
        </Link>
        <Link href="#" _hover={{ color: "green.300" }}>
          Our Services
        </Link>
      </Flex>
      <Button bg="green.400" color="white" _hover={{ bg: "green.500" }}>
        Contact Us
      </Button>
    </Flex>
  );
};

export default Navbar;
