import { Flex, Box, Link, Image, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(15px)"
      zIndex="10"
      align="center"
      justify="space-between"
      p="1.5rem 2rem"
    >
      <Image src="/hori.png" alt="Logo" h="40px" />
      <Flex gap="2.5rem">
        {["Home", "Service Tracking", "Gallery", "About", "Contact Us"].map(
          (item) => (
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
          )
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
