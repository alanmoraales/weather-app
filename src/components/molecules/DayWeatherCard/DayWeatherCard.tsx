import { Flex, Grid } from "@chakra-ui/react";
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
    <Heading variant="h5">{dayName}</Heading>
    <Flex gap={4} alignItems="center">
      <Grid gap={1} placeItems="center">
        <Body variant="label">Min</Body>
        <Heading variant="h6" color="primary">
          {minTemperature}
        </Heading>
      </Grid>
      <Body>-</Body>
      <Grid gap={1} placeItems="center">
        <Body variant="label">Max</Body>
        <Heading variant="h6" color="primary">
          {maxTemperature}
        </Heading>
      </Grid>
    </Flex>
  </Flex>
);

export default DayWeatherCard;
