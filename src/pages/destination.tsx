import { useRouter } from "next/router";
import type { NextPage } from "next";
import { connect } from "react-redux";
import Image from "next/image";
import { Fragment, useEffect } from "react";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ContentBox from "@atoms/ContentBox";
import AppBar from "@molecules/AppBar";
import Body from "@atoms/Body";
import Heading from "@atoms/Heading";
import DayWeatherCard from "@molecules/DayWeatherCard";
import SearchInput from "@molecules/SearchInput";
import assets from "@constants/assets";
import useForm from "hooks/useForm";
import moment from "moment";
import formatTemperature from "shared/utils/formatTemperature";
import routes from "@constants/routes";
import { useActions } from "store/hooks/useActions";
import { useTypedSelector } from "store/hooks/useTypedSelector";

const nextDays = [1, 2, 3, 4, 5, 6, 7];

interface ISearchDestinationFormValues {
  destinationName: string;
}

const searchDestinationFormSchema = yup.object().shape({
  destinationName: yup.string().required("Ingresa un destino"),
});

const DestinationWeather: NextPage = () => {
  const router = useRouter();
  const searchKey = router.query.name as string;
  const {
    destinationName,
    wettestDayIndex,
    dailyWeather,
    isFetching,
    thereAreNoResults,
    currentMaxTemperature,
    currentMinTemperature,
    currentTemperature,
  } = useTypedSelector((state) => state.weatherSearch);
  const { weatherSearchAction } = useActions();
  const { isOpen: searchBoxIsOpen, onOpen: onOpenSearchBox } = useDisclosure();
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

  useEffect(() => {
    if (searchKey) {
      weatherSearchAction(searchKey);
    }
  }, [searchKey]);

  return (
    <>
      <AppBar />
      <ContentBox paddingY={8} display="grid" gap={8}>
        <When condition={searchBoxIsOpen || thereAreNoResults}>
          <form onSubmit={submit}>
            <SearchInput
              {...register("destinationName")}
              hasError={Boolean(errors.destinationName)}
              errorMessage={errors.destinationName?.message}
              shouldFocusOnMount={searchBoxIsOpen}
            />
          </form>
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
              <Skeleton isLoaded={Boolean(destinationName) && !isFetching}>
                <Heading variant="h2">
                  {destinationName || "Ciudad de México"}
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
                <Skeleton isLoaded={Boolean(currentTemperature) && !isFetching}>
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
                  <Skeleton
                    isLoaded={Boolean(currentMinTemperature) && !isFetching}
                  >
                    <Heading variant="h6" color="primary">
                      {currentMinTemperature
                        ? formatTemperature(currentMinTemperature)
                        : "27 °C"}
                    </Heading>
                  </Skeleton>
                </Grid>
                <Body>-</Body>
                <Grid gap={1} placeItems="center">
                  <Body variant="label">Max</Body>
                  <Skeleton
                    isLoaded={Boolean(currentMaxTemperature) && !isFetching}
                  >
                    <Heading variant="h6" color="primary">
                      {currentMaxTemperature
                        ? formatTemperature(currentMaxTemperature)
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
                const minTemperature = dailyWeather[dayIndex]?.temp.min;
                const maxTemperature = dailyWeather[dayIndex]?.temp.max;
                return (
                  <Fragment key={dayIndex}>
                    <DayWeatherCard
                      dayName={dayMoment.format("dddd")}
                      minTemperature={
                        minTemperature && !isFetching
                          ? formatTemperature(minTemperature)
                          : ""
                      }
                      maxTemperature={
                        maxTemperature && !isFetching
                          ? formatTemperature(maxTemperature)
                          : ""
                      }
                      isWettestDay={wettestDayIndex === dayIndex}
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

export default connect((state) => state)(DestinationWeather);
