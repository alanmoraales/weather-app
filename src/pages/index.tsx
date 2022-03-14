import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@chakra-ui/react";
import ContentBox from "@atoms/ContentBox";
import Heading from "@atoms/Heading";
import AppBar from "@molecules/AppBar";
import SearchInput from "@molecules/SearchInput";
import DestinationWeatherCard from "@molecules/DestinationWeatherCard";
import placesService from "services/places";
import weatherService from "services/weather";
import useFetch from "hooks/useFetch";
import useForm from "hooks/useForm";
import routes from "@constants/routes";
import formatTemperature from "shared/utils/formatTemperature";
import { IWeatherData } from "@declarations/weather";

interface ISearchDestinationFormValues {
  destinationName: string;
}

const searchDestinationFormSchema = yup.object().shape({
  destinationName: yup.string().required("Ingresa un destino"),
});

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
  const router = useRouter();
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
  const {
    register,
    submit,
    formState: { errors },
  } = useForm<ISearchDestinationFormValues>({
    onSubmit: async ({ destinationName }) => {
      router.push(routes.destination(destinationName));
    },
    resolver: yupResolver(searchDestinationFormSchema),
    displaySuccessMessage: false,
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
        <form onSubmit={submit}>
          <SearchInput
            {...register("destinationName")}
            hasError={Boolean(errors.destinationName)}
            errorMessage={errors.destinationName?.message}
          />
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
