import { Box, Heading, Text } from "@chakra-ui/react";

const Notifications = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Notifications
      </Heading>
      <Text>
        View all notifications related to car bookings, returns, and any system
        updates.
      </Text>
      {/* Add list or table for displaying notifications */}
    </Box>
  );
};

export default Notifications;
