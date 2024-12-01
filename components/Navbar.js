import {
  Flex,
  Box,
  Link,
  Image,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for responsive menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(15px)"
      zIndex="300"
      align="center"
      justify="space-between"
      p="1.5rem 2rem"
    >
      {/* Logo */}
      <Image src="/hori.png" alt="Logo" h="40px" />

      {/* Desktop Links */}
      <Flex display={{ base: "none", md: "flex" }} gap="2.5rem" align="center">
        {["About", "Perks", "Gallery"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            fontWeight="bold"
            fontSize="15px"
            textTransform="uppercase"
            color="white"
            _hover={{
              color: "green.300",
              transform: "scale(1.1)",
              transition: "0.15s",
            }}
          >
            {item}
          </Link>
        ))}
        {/* Login Button */}
        <Link
          href="/signin"
          display="flex"
          alignItems="center"
          fontWeight="bold"
          fontSize="15px"
          color="white"
          _hover={{
            color: "green.300",
            transform: "scale(1.1)",
            transition: "0.15s",
          }}
        >
          <FaUserCircle style={{ marginRight: "0.5rem" }} />
          Login
        </Link>
      </Flex>

      {/* Hamburger Icon for Mobile */}
      <IconButton
        aria-label="Menu"
        icon={isOpen ? <FaTimes /> : <FaBars />} // Toggle between FaBars and FaTimes
        display={{ base: "flex", md: "none" }}
        bg="transparent"
        color="white"
        fontSize="24px"
        _hover={{
          color: "green.300",
        }}
        onClick={toggleMenu}
        transition="transform 0.2s" // Smooth animation
        transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"} // Optional rotation effect
      />


      {/* Mobile Menu */}
      {isOpen && (
        <VStack
          position="absolute"
          top="100%"
          left="0"
          w="100%"
          bg="rgba(0, 0, 0, 0.95)"
          p="1rem"
          spacing="1rem"
          align="center"
          display={{ base: "flex", md: "none" }}
        >
          {["About", "Perks", "Gallery", "Team"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              fontWeight="bold"
              fontSize="15px"
              textTransform="uppercase"
              color="white"
              _hover={{
                color: "green.300",
                transform: "scale(1.1)",
                transition: "0.15s",
              }}
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item}
            </Link>
          ))}
          {/* Login Button */}
          <Link
            href="/signin"
            display="flex"
            alignItems="center"
            fontWeight="bold"
            fontSize="15px"
            color="white"
            _hover={{
              color: "green.300",
              transform: "scale(1.1)",
              transition: "0.15s",
            }}
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            <FaUserCircle style={{ width: "15px", marginRight: "0.5rem" }} />
            Login
          </Link>
        </VStack>
      )}
    </Flex>
  );
};

export default Navbar;
