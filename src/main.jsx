import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/poppins";
import {ChakraProvider, ColorModeScript, extendTheme} from "@chakra-ui/react";

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: `Poppins`,
    body: `Poppins`
  }
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App/>
  </ChakraProvider>,
);
