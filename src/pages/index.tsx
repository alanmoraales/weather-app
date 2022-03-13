import type { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import AppBar from "@molecules/AppBar";
import ContentBox from "@atoms/ContentBox";
import Heading from "@atoms/Heading";
import SearchInput from "@molecules/SearchInput";
import DestinationWeatherCard from "@molecules/DestinationWeatherCard";

const Home: NextPage = () => (
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
        <DestinationWeatherCard
          destinationName="Acapulco"
          minTemperature="20 °C"
          maxTemperature="35 °C"
          actionUrl="/destination?name=acapulco"
        />
        <DestinationWeatherCard
          destinationName="Ciudad de México"
          minTemperature="20 °C"
          maxTemperature="35 °C"
          actionUrl="/destination?name=acapulco"
        />
        <DestinationWeatherCard
          destinationName="Guadalajara"
          minTemperature="20 °C"
          maxTemperature="35 °C"
          actionUrl="/destination?name=acapulco"
        />
      </Grid>
    </ContentBox>
  </>
);

export default Home;
