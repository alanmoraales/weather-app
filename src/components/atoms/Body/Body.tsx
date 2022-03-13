import { Text, TextProps } from "@chakra-ui/react";
import { EBodyVariants, ETypographyColors } from "design/declarations";

interface IBody extends TextProps {
  variant?: keyof typeof EBodyVariants;
  color?: keyof typeof ETypographyColors;
}

const Body = ({ variant = "paragraph", color = "normal", ...props }: IBody) => (
  <Text
    fontSize={variant}
    fontWeight="normal"
    color={ETypographyColors[color]}
    {...props}
  />
);

export default Body;
