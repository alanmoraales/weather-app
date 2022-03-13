import Link from "next/link";
import { Flex, Grid, Skeleton } from "@chakra-ui/react";
import Heading from "@atoms/Heading";
import Body from "@atoms/Body";

interface IDestinationWeatherCard {
  destinationName: string;
  minTemperature: string;
  maxTemperature: string;
  actionUrl: string;
}

const DestinationWeatherCard = ({
  destinationName,
  minTemperature,
  maxTemperature,
  actionUrl,
}: IDestinationWeatherCard) => (
  <Link href={actionUrl} passHref>
    <Flex
      as="a"
      justifyContent="space-between"
      gap={4}
      boxShadow="0px 3px 10px rgba(0, 0, 0, 0.1)"
      padding={4}
      alignItems="center"
      borderRadius="md"
    >
      <Heading variant="h5">{destinationName}</Heading>
      <Flex gap={4} alignItems="center">
        <Grid gap={1} placeItems="center">
          <Body variant="label">Min</Body>
          <Skeleton
            isLoaded={Boolean(minTemperature)}
            height="19.19px"
            width="100%"
          >
            <Heading variant="h6" color="primary">
              {minTemperature}
            </Heading>
          </Skeleton>
        </Grid>
        <Body>-</Body>
        <Grid gap={1} placeItems="center">
          <Body variant="label">Max</Body>
          <Skeleton
            isLoaded={Boolean(maxTemperature)}
            height="19.19px"
            width="100%"
          >
            <Heading variant="h6" color="primary">
              {maxTemperature}
            </Heading>
          </Skeleton>
        </Grid>
      </Flex>
    </Flex>
  </Link>
);

export default DestinationWeatherCard;
