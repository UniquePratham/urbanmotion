import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import theme from "../theme"; // Path to your theme.js


export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>UrbanMotion - Your Car Solution</title>
        <meta
          name="description"
          content="UrbanMotion - Your Car Solution"
        />
        <link rel="icon" href="/short.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
