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
  Image,
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

  const footerLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "FAQ", href: "/faq" },
    { label: "Account", href: "/account" },
    { label: "Support", href: "/support" },
    { label: "Careers", href: "/careers" },
  ];

  return (
    <Box
      as="footer"
      bgImage="url('https://static.vecteezy.com/system/resources/thumbnails/033/164/427/small_2x/3d-abstract-digital-technology-green-light-particles-wave-free-png.png')"
      bgSize="cover"
      bgPosition="center"
      bgColor="black"
      position="relative"
      zIndex="-100" // Ensure the footer is below the sidebar
      color="white"
      py={12}
      px={{ base: 4, md: 12 }}
    >
      <Flex justify="center" align="center" mb={8}>
        <Image src="/hori.png" alt="UrbanMotion Logo" w="150px" />
      </Flex>

      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        zIndex="1"
        textAlign="center"
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

        {/* Footer Links */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="100%"
          px={{ base: 2, md: 10 }}
          mb={6}
        >
          <Text fontWeight="bold" fontSize="lg">
            UrbanMotion
          </Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                fontSize="sm"
                color="white"
                _hover={{ color: "gray.300" }}
              >
                {link.label}
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Copyright */}
        <Text fontSize="sm" mt={4} color="gray.400">
          © 2024 UrbanMotion. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
