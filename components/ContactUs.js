import { Box, Heading, Text, Button, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ContactUs = () => (
  <MotionBox
    as="section"
    h="100vh"
    py={16}
    px={8}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <Flex h="full" alignItems="center">
      <Box w="50%">
        <Heading fontSize="5xl" color="white">
          Contact{" "}
          <Text as="span" color="#00db00">
            Us
          </Text>
        </Heading>
        <Text fontSize="xl" mt={4}>
          Reach out to our WhatsApp Business number: <strong>9433211591</strong>
          . Schedule a meeting or inquire about our services. Just send us a
          message, and we’ll take care of the rest!
        </Text>
        <Button
          mt={8}
          bg="#00db00"
          color="white"
          _hover={{ bg: "white", color: "#00db00" }}
        >
          Message Us
        </Button>
      </Box>
      <Image
        src="/contact.jpg"
        alt="Contact Us"
        w="50%"
        borderRadius="md"
        boxShadow="xl"
      />
    </Flex>
  </MotionBox>
);

export default ContactUs;
