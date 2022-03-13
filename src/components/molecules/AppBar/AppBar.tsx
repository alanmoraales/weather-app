import Link from "next/link";
import { Box } from "@chakra-ui/react";
import ContentBox from "@atoms/ContentBox";
import ReservamosLogo from "@atoms/ReservamosLogo";
import routes from "@constants/routes";

const AppBar = () => (
  <Box
    borderBottomWidth="1px"
    borderBottomStyle="solid"
    borderBottomColor="gray.normal"
  >
    <ContentBox paddingTop={5} paddingBottom={5}>
      <Link href={routes.home} passHref>
        <a>
          <ReservamosLogo />
        </a>
      </Link>
    </ContentBox>
  </Box>
);

export default AppBar;
