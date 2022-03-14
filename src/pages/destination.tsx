import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from "next/image";
import { useRef, Fragment, useState, useEffect } from "react";
import {
  Grid,
  Flex,
  Divider,
  useDisclosure,
  Button,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { When, If, Then, Else } from "react-if";
import ContentBox from "@atoms/ContentBox";
import AppBar from "@molecules/AppBar";
import Body from "@atoms/Body";
import Heading from "@atoms/Heading";
import DayWeatherCard from "@molecules/DayWeatherCard";
import SearchInput from "@molecules/SearchInput";
import assets from "@constants/assets";
import { IWeatherData } from "@declarations/weather";
import placesService from "services/places";
import weatherService from "services/weather";
import useFetch from "hooks/useFetch";
import moment from "moment";
import formatTemperature from "shared/utils/formatTemperature";
import { IPlace } from "@declarations/places";

const nextDays = [1, 2, 3, 4, 5, 6, 7];

const DestinationWeather: NextPage = () => {
  const router = useRouter();
  const searchKey = router.query.name as string;
  const { data: resultCities, isFetching: isFetchingResultCities } = useFetch<
    IPlace[]
  >({
    initialData: [],
    fetcher: () => placesService.searchCities({ searchKey }),
  });
  const foundCity = resultCities[0];
  const [thereAreNoResults, setThereAreNoResults] = useState(false);
  const { data: resultWeatherData } = useFetch<IWeatherData | undefined>({
    initialData: undefined,
    fetcher: () =>
      weatherService.getWeatherData({
        lat: foundCity.lat,
        long: foundCity.long,
      }),
    shouldFetch: Boolean(resultCities.length),
    dependencies: [resultCities],
  });
  const { isOpen: searchBoxIsOpen, onOpen: onOpenSearchBox } = useDisclosure();
  const inputRef = useRef(null);
  const minTemperature = resultWeatherData?.daily[0]?.temp.min;
  const maxTemperature = resultWeatherData?.daily[0]?.temp.max;
  const currentTemperature = resultWeatherData?.current?.temp;

  useEffect(() => {
    setThereAreNoResults(!resultCities.length && !isFetchingResultCities);
  }, [resultCities, isFetchingResultCities]);

  return (
    <>
      <AppBar />
      <ContentBox paddingY={8} display="grid" gap={8}>
        <When condition={searchBoxIsOpen || thereAreNoResults}>
          <SearchInput ref={inputRef} shouldFocusOnMount={searchBoxIsOpen} />
        </When>
        <If condition={thereAreNoResults}>
          <Then>
            <Grid placeItems="center" gap={4} paddingTop={12}>
              <Box margin="0 auto">
                <Image
                  src={assets.lostTravelers}
                  alt="Viajeros perdidos"
                  width="233px"
                  height="161px"
                />
              </Box>
              <Heading variant="h4" textAlign="center">
                Oops! Nuestros viajeros se han perdido
              </Heading>
              <Body textAlign="center">
                No hemos encontrado ningún destino con los parámetros requeridos
              </Body>
            </Grid>
          </Then>
          <Else>
            <Grid gap={2}>
              <Body>El clima de hoy en:</Body>
              <Skeleton isLoaded={Boolean(foundCity)}>
                <Heading variant="h2">
                  {foundCity?.city_name || "Ciudad de México"}
                </Heading>
              </Skeleton>
              <Button
                variant="ghost"
                width="fit-content"
                padding={0}
                onClick={onOpenSearchBox}
              >
                <Body color="primary" textDecoration="underline">
                  Cambiar destino
                </Body>
              </Button>
            </Grid>
            <Flex
              justifyContent="space-between"
              gap={4}
              alignItems="end"
              paddingX={4}
              margin="0 auto"
              width="100%"
            >
              <Grid gap={1}>
                <Flex gap={2}>
                  <Heading variant="h6" textTransform="capitalize">
                    {moment().format("dddd")}
                  </Heading>
                  {/* TODO add weather icon*/}
                </Flex>
                <Skeleton isLoaded={Boolean(currentTemperature)}>
                  <Heading color="primary">
                    {currentTemperature
                      ? formatTemperature(currentTemperature)
                      : "27 °C"}
                  </Heading>
                </Skeleton>
              </Grid>
              <Flex gap={4} alignItems="center" paddingBottom={2}>
                <Grid gap={1} placeItems="center">
                  <Body variant="label">Min</Body>
                  <Skeleton isLoaded={Boolean(minTemperature)}>
                    <Heading variant="h6" color="primary">
                      {minTemperature
                        ? formatTemperature(minTemperature)
                        : "27 °C"}
                    </Heading>
                  </Skeleton>
                </Grid>
                <Body>-</Body>
                <Grid gap={1} placeItems="center">
                  <Body variant="label">Max</Body>
                  <Skeleton isLoaded={Boolean(maxTemperature)}>
                    <Heading variant="h6" color="primary">
                      {maxTemperature
                        ? formatTemperature(maxTemperature)
                        : "27 °C"}
                    </Heading>
                  </Skeleton>
                </Grid>
              </Flex>
            </Flex>
            <Grid gap={4} paddingTop={8}>
              <Heading variant="h6">Próximo 7 días</Heading>
              {nextDays.map((dayIndex) => {
                const dayMoment = moment().add(dayIndex, "days");
                const minTemperature =
                  resultWeatherData?.daily[dayIndex]?.temp.min;
                const maxTemperature =
                  resultWeatherData?.daily[dayIndex]?.temp.max;
                return (
                  <Fragment key={dayIndex}>
                    <DayWeatherCard
                      dayName={dayMoment.format("dddd")}
                      minTemperature={
                        minTemperature ? formatTemperature(minTemperature) : ""
                      }
                      maxTemperature={
                        maxTemperature ? formatTemperature(maxTemperature) : ""
                      }
                    />
                    <When condition={dayIndex !== nextDays.length}>
                      <Divider />
                    </When>
                  </Fragment>
                );
              })}
            </Grid>
          </Else>
        </If>
      </ContentBox>
    </>
  );
};

export default DestinationWeather;
