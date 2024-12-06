import {
  Flex,
  Box,
  Link,
  Image,
  IconButton,
  Text,
  VStack,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for responsive menu
  const [sessionId, setSessionId] = useState(null); // Store sessionId in state
  const [userData, setUserData] = useState(null); // Store user data
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Show/hide profile menu
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessionId = localStorage.getItem("sessionId");
      if (storedSessionId) {
        setSessionId(storedSessionId);

        // Fetch user data based on sessionId
        fetch(
          `https://urban-motion-backend.vercel.app/api/sessions/${storedSessionId}`
        )
          .then((response) => response.json())
          .then((data) => setUserData(data))
          .catch((err) => console.error("Error fetching user data:", err));
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    setSessionId(null);
    router.push("/signin");
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
        <Image src="/hori.png" alt="Logo" h="40px" cursor="pointer" />
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

        {/* Profile Icon and Dropdown */}
        {sessionId && userData ? (
          <Flex align="center" position="relative">
            <Avatar
              size="sm"
              bg="green.500"
              cursor="pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <Box
                position="absolute"
                top="50px"
                right="0"
                bg="rgba(0, 0, 0, 0.8)"
                p="1rem"
                borderRadius="sm"
                zIndex="1000"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)"
                display="flex"
                flexDirection="column"
                alignItems="center"
                w="200px"
              >
                <Text
                  color="white"
                  fontSize="14px"
                  mb="1rem"
                  textAlign="center"
                  w="100%"
                  wordBreak="break-word"
                >
                  {userData.email}
                </Text>
                <Link
                  href="/dashboard"
                  fontSize="14px"
                  fontWeight="bold"
                  color="white"
                  w="100%"
                  textAlign="center"
                  py="8px"
                  _hover={{
                    background: "linear-gradient(90deg, #00db00, #009900)",
                    color: "white",
                  }}
                >
                  Dashboard
                </Link>
                <Button
                  aria-label="Logout"
                  colorScheme="red"
                  size="sm"
                  w="100%"
                  onClick={handleLogout}
                  mt="1rem"
                >
                  Logout
                </Button>
              </Box>
            )}
          </Flex>
        ) : (
          <Link
            href="/signin"
            display="inline-flex"
            alignItems="center"
            fontSize="15px"
            color="black"
            bg="#00db00"
            px="14px"
            py="6px"
            borderRadius="sm"
            _hover={{
              bg: "white",
              color: "black",
              transform: "scale(1.05)",
              transition: "0.2s ease-in-out",
            }}
          >
            <FaUserCircle style={{ marginRight: "8px" }} />
            Login
          </Link>
        )}
      </Flex>

      {/* Hamburger Icon for Mobile */}
      <IconButton
        aria-label="Menu"
        icon={isOpen ? <FaTimes /> : <FaBars />}
        display={{ base: "flex", md: "none" }}
        bg="transparent"
        color="#00db00"
        fontSize="24px"
        _hover={{
          color: "white",
        }}
        onClick={toggleMenu}
        transition="transform 0.2s"
        transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
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
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          {sessionId && userData ? (
            <Flex align="center" direction="column">
              <Text
                color="white"
                fontSize="14px"
                textAlign="center"
                mb="1rem"
                w="100%"
                wordBreak="break-word"
              >
                {userData.email}
              </Text>
              <Link
                href="/dashboard"
                fontSize="14px"
                fontWeight="bold"
                color="white"
                w="100%"
                textAlign="center"
                py="8px"
                _hover={{
                  background: "linear-gradient(90deg, #00db00, #009900)",
                  color: "white",
                }}
              >
                Dashboard
              </Link>
              <Button
                aria-label="Logout"
                colorScheme="red"
                size="sm"
                w="100%"
                onClick={handleLogout}
                mt="1rem"
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Link
              href="/signin"
              display="inline-flex"
              alignItems="center"
              fontSize="15px"
              color="black"
              bg="#00db00"
              px="14px"
              py="6px"
              borderRadius="sm"
              _hover={{
                bg: "white",
                color: "black",
                transform: "scale(1.05)",
                transition: "0.2s ease-in-out",
              }}
            >
              <FaUserCircle style={{ marginRight: "8px" }} />
              Login
            </Link>
          )}
        </VStack>
      )}
    </Flex>
  );
};

export default Navbar;
