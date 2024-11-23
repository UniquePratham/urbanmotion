import { Flex, Icon, Link } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Sidebar = () => {
  return (
    <Flex
      direction="column"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="60px"
      bg="linear-gradient(180deg, #0f0, #004d00)"
      justify="center"
      align="center"
      gap="1.5rem"
    >
      <Link href="#" isExternal>
        <Icon
          as={FaFacebook}
          boxSize="7"
          color="white"
          _hover={{
            color: "green.300",
            transform: "scale(1.2)",
            transition: "0.3s",
          }}
        />
      </Link>
      <Link href="#" isExternal>
        <Icon
          as={FaTwitter}
          boxSize="7"
          color="white"
          _hover={{
            color: "green.300",
            transform: "scale(1.2)",
            transition: "0.3s",
          }}
        />
      </Link>
      <Link href="#" isExternal>
        <Icon
          as={FaLinkedin}
          boxSize="7"
          color="white"
          _hover={{
            color: "green.300",
            transform: "scale(1.2)",
            transition: "0.3s",
          }}
        />
      </Link>
    </Flex>
  );
};

export default Sidebar;
