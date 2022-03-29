import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import moment from "moment";
import { light } from "design/themes";
import { wrapper } from "redux";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/400.css";
import "moment/locale/es";

moment.locale("es");

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={light}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
