import { Heading as ChakraHeading, HeadingProps } from "@chakra-ui/react";
import { EHeadingVariants, ETypographyColors } from "design/declarations";

interface IHeading extends HeadingProps {
  variant?: keyof typeof EHeadingVariants;
  color?: keyof typeof ETypographyColors;
}

const Heading = ({
  variant = "h1",
  textDecoration = "none",
  color = "normal",
  ...props
}: IHeading) => (
  <ChakraHeading
    as={variant}
    fontSize={variant}
    fontWeight="bold"
    color={ETypographyColors[color]}
    textDecoration={textDecoration}
    {...props}
  />
);

export default Heading;
