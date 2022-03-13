import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from "next/image";
import { useRef } from "react";
import {
  Grid,
  Flex,
  Divider,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { When, If, Then, Else } from "react-if";
import ContentBox from "@atoms/ContentBox";
import AppBar from "@molecules/AppBar";
import Body from "@atoms/Body";
import Heading from "@atoms/Heading";
import DayWeatherCard from "@molecules/DayWeatherCard";
import SearchInput from "@molecules/SearchInput";
import assets from "@constants/assets";

const DestinationWeather: NextPage = () => {
  const router = useRouter();
  const { isOpen: searchBoxIsOpen, onOpen: onOpenSearchBox } = useDisclosure();
  const inputRef = useRef(null);
  const theAreNoResults = router.query.name === "acapulco";

  return (
    <>
      <AppBar />
      <ContentBox paddingY={8} display="grid" gap={8}>
        <When condition={searchBoxIsOpen || theAreNoResults}>
          <SearchInput ref={inputRef} shouldFocusOnMount={searchBoxIsOpen} />
        </When>
        <If condition={theAreNoResults}>
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
              <Heading variant="h2">Ciudad de México</Heading>
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
                  <Heading variant="h6">Domingo</Heading>
                  {/* TODO add weather icon*/}
                </Flex>
                <Heading color="primary">27 °C</Heading>
              </Grid>
              <Flex gap={4} alignItems="center" paddingBottom={2}>
                <Grid gap={1} placeItems="center">
                  <Body variant="label">Min</Body>
                  <Heading variant="h6" color="primary">
                    20 °C
                  </Heading>
                </Grid>
                <Body>-</Body>
                <Grid gap={1} placeItems="center">
                  <Body variant="label">Max</Body>
                  <Heading variant="h6" color="primary">
                    35 °C
                  </Heading>
                </Grid>
              </Flex>
            </Flex>
            <Grid gap={4} paddingTop={8}>
              <Heading variant="h6">Próximo 7 días</Heading>
              <DayWeatherCard
                dayName="Lunes"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
              <Divider />
              <DayWeatherCard
                dayName="Martes"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
              <Divider />
              <DayWeatherCard
                dayName="Miércoles"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
              <Divider />
              <DayWeatherCard
                dayName="Jueves"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
              <Divider />
              <DayWeatherCard
                dayName="Viernes"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
              <Divider />
              <DayWeatherCard
                dayName="Sábado"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
              <Divider />
              <DayWeatherCard
                dayName="Domingo"
                minTemperature="20 °C"
                maxTemperature="35 °C"
              />
            </Grid>
          </Else>
        </If>
      </ContentBox>
    </>
  );
};

export default DestinationWeather;
