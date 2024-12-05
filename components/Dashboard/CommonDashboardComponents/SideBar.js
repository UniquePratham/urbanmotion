import { Box, Flex, VStack, Icon, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Sidebar = ({ text, datas }) => {
  const router = useRouter();

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
    >
      <Image
        src="/hori.png" // Path to the logo in the `public` folder
        alt="Urban Motion Logo"
        mb={8}
        boxSize="50px" // Adjust size as needed
        objectFit="contain"
      />
      <Text fontSize="xl" fontWeight="bold" color="#00db00" mb={6}>
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
            transition="all 0.2s ease"
            _hover={{
              bg: "#00db00",
              color: "white",
              transform: "translateX(5px)",
            }}
            onClick={() => router.push(data.path)}
          >
            <Icon as={data.icon} w={6} h={6} />
            <Text fontWeight="medium" fontSize="lg">
              {data.label}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
