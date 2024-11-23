import { ChakraProvider, extendTheme, Box, Text } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.800" color="white" p="4">
        <Text>Hello Chakra UI!</Text>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
