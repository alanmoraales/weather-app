import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { light } from "design/themes";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/400.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={light}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
