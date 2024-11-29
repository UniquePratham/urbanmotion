import {
  Box,
  Flex,
  Text,
  Link,
  Input,
  Button,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, link: "https://facebook.com" },
    { icon: FaTwitter, link: "https://twitter.com" },
    { icon: FaLinkedin, link: "https://linkedin.com" },
    { icon: FaInstagram, link: "https://instagram.com" },
    { icon: FaYoutube, link: "https://youtube.com" },
    { icon: FaGithub, link: "https://github.com" },
  ];

  return (
    <Box
      as="footer"
      bgImage="url('/footerbg.jpg')" // Add your image to public folder
      bgSize="cover"
      bgPosition="center"
      position="relative"
      color="white"
      py={12}
    >
      {/* Green Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.4)" // Transparent green overlay
        zIndex="0"
      />

      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        zIndex="1"
        textAlign="center"
        px={4}
        maxW="1200px"
        mx="auto"
      >
        {/* Email Subscription */}
        <VStack spacing={4} mb={10}>
          <Text fontSize="lg" fontWeight="bold">
            Sign up for coupons, updates, and other fun stuff!
          </Text>
          <HStack spacing={2}>
            <Input
              placeholder="Enter your email"
              bg="white"
              color="black"
              borderRadius="full"
              w={{ base: "250px", md: "400px" }}
              _placeholder={{ color: "gray.500" }}
            />
            <Button
              bg="#00db00"
              color="white"
              borderRadius="full"
              _hover={{
                bg: "white",
                color: "#00db00",
                transform: "scale(1.1)",
              }}
              transition="all 0.3s"
            >
              Submit
            </Button>
          </HStack>
        </VStack>

        {/* Social Media Icons */}
        <HStack spacing={6} mb={8}>
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.link}
              isExternal
              aria-label={social.link}
              _hover={{
                color: "white",
                transform: "scale(1.2)",
                transition: "transform 0.2s",
              }}
            >
              <Icon as={social.icon} boxSize={6} />
            </Link>
          ))}
        </HStack>

        {/* Footer Text */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="100%"
          px={{ base: 2, md: 10 }}
        >
          <Text fontWeight="bold" fontSize="lg">
            Nixie
          </Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Link href="/terms" fontSize="sm" color="white" _hover={{ color: "gray.300" }}>
              Terms
            </Link>
            <Link href="/privacy" fontSize="sm" color="white" _hover={{ color: "gray.300" }}>
              Privacy
            </Link>
            <Link href="/faq" fontSize="sm" color="white" _hover={{ color: "gray.300" }}>
              FAQ
            </Link>
            <Link href="/account" fontSize="sm" color="white" _hover={{ color: "gray.300" }}>
              Account
            </Link>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
