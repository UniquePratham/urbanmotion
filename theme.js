// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`, // Applies to all headings
    body: `'Poppins', sans-serif`, // Applies to body text
  },
});

export default theme;
