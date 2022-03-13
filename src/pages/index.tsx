import type { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import AppBar from "@molecules/AppBar";
import ContentBox from "@atoms/ContentBox";
import Heading from "@atoms/Heading";
import SearchInput from "@molecules/SearchInput";
import DestinationWeatherCard from "@molecules/DestinationWeatherCard";
import placesService from "services/places";
import weatherService from "services/weather";
import useFetch from "hooks/useFetch";
import { IWeatherData } from "@declarations/weather";
import routes from "@constants/routes";
import formatTemperature from "shared/utils/formatTemperature";

const popularDestinations = {
  acapulco: "Acapulco",
  cdmx: "Ciudad de México",
  guadalajara: "Guadalajara",
};

const getDestinationsWeatherData =
  (destinationName: string) => async (): Promise<IWeatherData> => {
    const cities = await placesService.searchCities({
      searchKey: destinationName,
    });
    if (cities.length) {
      const destination = cities[0];
      const weatherData = await weatherService.getWeatherData({
        lat: destination.lat,
        long: destination.long,
      });
      return weatherData;
    }
    throw new Error("Destination not found");
  };

const Home: NextPage = () => {
  const { data: acapulcoWeatherData } = useFetch<IWeatherData | undefined>({
    initialData: undefined,
    fetcher: getDestinationsWeatherData(popularDestinations.acapulco),
  });
  const { data: cdmxWeatherData } = useFetch<IWeatherData | undefined>({
    initialData: undefined,
    fetcher: getDestinationsWeatherData(popularDestinations.cdmx),
  });
  const { data: guadalajaraWeatherData } = useFetch<IWeatherData | undefined>({
    initialData: undefined,
    fetcher: getDestinationsWeatherData(popularDestinations.guadalajara),
  });
  const weatherData = {
    [popularDestinations.acapulco]: acapulcoWeatherData,
    [popularDestinations.cdmx]: cdmxWeatherData,
    [popularDestinations.guadalajara]: guadalajaraWeatherData,
  };

  return (
    <>
      <AppBar />
      <ContentBox paddingY={8} display="grid" gap={8}>
        <Heading>Encuentra tu clima ideal</Heading>
        <form action="">
          <SearchInput />
        </form>
        <Grid gap={4} paddingTop={8}>
          <Heading variant="h6">
            El clima de hoy en nuestros destinos más populares
          </Heading>
          {Object.values(popularDestinations).map((destinationName) => {
            const minTemperature =
              weatherData[destinationName]?.daily[0]?.temp.min;
            const maxTemperature =
              weatherData[destinationName]?.daily[0]?.temp.max;

            return (
              <DestinationWeatherCard
                key={destinationName}
                destinationName={destinationName}
                minTemperature={
                  minTemperature ? formatTemperature(minTemperature) : ""
                }
                maxTemperature={
                  maxTemperature ? formatTemperature(maxTemperature) : ""
                }
                actionUrl={routes.destination(destinationName)}
              />
            );
          })}
        </Grid>
      </ContentBox>
    </>
  );
};

export default Home;
