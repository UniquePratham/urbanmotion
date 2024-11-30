import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

const DiscountBanner = () => {
  // Messages for sliding
  const messages = [
    "Black Friday Discounts - Up to 50% off on luxury rentals!",
    "Exclusive Coupon for First-Time Users - Save 20% now!",
    "Explore our website for the best deals on premium services!",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  // Update message every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Box
      bg="#ccffcc" // Light green background color
      color="black"
      p={4}
      textAlign="center"
      overflow="hidden"
      whiteSpace="nowrap"
    >
      <motion.div
        key={currentMessage} // Key to trigger re-render for animation
        initial={{ x: "100%", opacity: 0 }} // Start off-screen and transparent
        animate={{ x: 0, opacity: 1 }} // Slide to the center and fade in
        exit={{ x: "-100%", opacity: 0 }} // Slide out to the left and fade out
        transition={{ type: "tween", duration: 1 }} // Animation settings
      >
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
          {messages[currentMessage]}
        </Text>
      </motion.div>
    </Box>
  );
};

export default DiscountBanner;
