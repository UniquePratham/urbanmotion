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
      <Link href="/" _hover={{ textDecoration: "none" }}>
        <Image src="/hori.png" alt="Logo" h="40px" cursor="pointer"/>
      </Link>

      {/* Desktop Links */}
      <Flex display={{ base: "none", md: "flex" }} gap="2.5rem" align="center">
        {["About", "Perks", "Gallery"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            fontWeight="bold"
            fontSize="15px"
            textTransform="uppercase"
            color="#00db00"
            _hover={{
              color: "white",
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
          display="inline-flex"
          alignItems="center"
          fontSize="15px"
          color="black"
          bg="#00db00"
          px="14px"
          py="6px"
          borderRadius="sm" // Slightly rounded
          _hover={{
            bg: "white",
            color: "black",
            transform: "scale(1.05)", // Subtle scaling
            transition: "0.2s ease-in-out",
          }}
        >
          <FaUserCircle style={{ marginRight: "8px" }} />
          Login
        </Link>
      </Flex>

      {/* Hamburger Icon for Mobile */}
      <IconButton
        aria-label="Menu"
        icon={isOpen ? <FaTimes /> : <FaBars />} // Toggle between FaBars and FaTimes
        display={{ base: "flex", md: "none" }}
        bg="transparent"
        color="#00db00"
        fontSize="24px"
        _hover={{
          color: "white",
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
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(15px)"
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
            display="inline-flex"
            alignItems="center"
            fontSize="15px"
            color="black"
            bg="#00db00"
            px="14px"
            py="6px"
            borderRadius="sm" // Slightly rounded
            _hover={{
              bg: "white",
              color: "black",
              transform: "scale(1.05)", // Subtle scaling
              transition: "0.2s ease-in-out",
            }}
          >
            <FaUserCircle style={{ marginRight: "8px" }} />
            Login
          </Link>
        </VStack>
      )}
    </Flex>
  );
};

export default Navbar;
