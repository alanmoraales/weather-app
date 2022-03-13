import { extendTheme } from "@chakra-ui/react";
import { colors } from "design/tokens";
import { baseTheme } from "./baseTheme";

const { smitten, eerieBlack, amaranthMP, pureWhite, battleshipGrey } = colors;

const light = extendTheme({
  ...baseTheme,
  colors: {
    background: pureWhite,
    primary: {
      normal: smitten,
      dark: amaranthMP,
    },
    neutral: {
      white: {
        normal: pureWhite,
      },
      gray: {
        normal: battleshipGrey,
      },
      black: {
        normal: eerieBlack,
      },
    },
  },
});

export { light };
