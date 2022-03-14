import { Flex, Grid, Skeleton } from "@chakra-ui/react";
import Heading from "@atoms/Heading";
import Body from "@atoms/Body";

interface IDayWeatherCard {
  dayName: string;
  minTemperature: string;
  maxTemperature: string;
}

const DayWeatherCard = ({
  dayName,
  minTemperature,
  maxTemperature,
}: IDayWeatherCard) => (
  <Flex justifyContent="space-between" gap={4} padding={4} alignItems="center">
    <Heading variant="h5" textTransform="capitalize">
      {dayName}
    </Heading>
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
);

export default DayWeatherCard;
