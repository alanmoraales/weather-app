import { Box, BoxProps } from "@chakra-ui/react";

const ContentBox = (props: BoxProps) => (
  <Box width="90%" maxWidth="1000px" margin="0 auto" {...props} />
);

export default ContentBox;
