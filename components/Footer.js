import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg="gray.800"
      color="white"
      p={6}
      textAlign="center"
      borderTop="1px solid green"
    >
      <Flex justify="space-between" align="center" flexWrap="wrap">
        <Box>
          <Text fontWeight="bold">CarRental Co.</Text>
          <Text fontSize="sm">© 2024 All Rights Reserved</Text>
        </Box>
        <Box>
          <Text>Follow us on:</Text>
          <Flex justify="center" gap={2} mt={2}>
            <Link href="#" color="green.400">
              Facebook
            </Link>
            <Link href="#" color="green.400">
              Instagram
            </Link>
            <Link href="#" color="green.400">
              Twitter
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
