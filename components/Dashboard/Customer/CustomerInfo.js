import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

const CustomerInfo = ({ customer }) => {
  return (
    <Box bg="gray.700" p={6} borderRadius="lg" color="white">
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Text fontWeight="bold">Name:</Text>
          <Text>{customer.name}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Email:</Text>
          <Text>{customer.email}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Driving License ID:</Text>
          <Text>{customer.drivingLicenseId}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Verification Type:</Text>
          <Text>{customer.verificationType}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Verification ID:</Text>
          <Text>{customer.verificationId}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Is Verified:</Text>
          <Text>{customer.isVerified ? "Yes" : "No"}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CustomerInfo;
