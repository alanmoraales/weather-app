import { fonts, fontSizes } from "design/tokens";
import { EHeadingVariants, EBodyVariants } from "design/declarations";

const { openSans } = fonts;

type THeadingFontSizes = {
  [K in EHeadingVariants]: string;
};

const headingFontSizes: THeadingFontSizes = {
  [EHeadingVariants.h1]: `clamp(${fontSizes["7xl"]}, 3vw, ${fontSizes["8xl"]})`,
  [EHeadingVariants.h4]: `clamp(${fontSizes.xl}, 2vw, ${fontSizes["3xl"]})`,
  [EHeadingVariants.h5]: `clamp(${fontSizes.lg}, 2vw, ${fontSizes["2xl"]})`,
  [EHeadingVariants.h6]: `clamp(${fontSizes.md}, 1vw, ${fontSizes.lg})`,
};

type TBodyFontSizes = {
  [K in EBodyVariants]: string;
};

const bodyFontSizes: TBodyFontSizes = {
  [EBodyVariants.paragraph]: `clamp(${fontSizes.md}, 1vw, ${fontSizes.lg})`,
  [EBodyVariants.label]: `clamp(${fontSizes.lg}, 1vw, ${fontSizes["2xl"]})`,
};

const baseTheme = {
  styles: {
    global: {
      "html, body": {
        backgroundColor: "background",
        fontSize: fontSizes.base,
      },
    },
  },
  fonts: {
    body: openSans,
    heading: openSans,
  },
  fontSizes: {
    ...headingFontSizes,
    ...bodyFontSizes,
  },
};

export { baseTheme };
