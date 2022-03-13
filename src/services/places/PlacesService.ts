import { reservamosApi } from "services/http";
import { IPlace, ISearchPlaces, EPlaceResultType } from "@declarations/places";

const PlacesService = () => {
  const searchCities = async ({
    searchKey,
  }: ISearchPlaces): Promise<IPlace[]> => {
    const searchResults = await reservamosApi.get<IPlace[]>(
      `/places?q=${searchKey}`
    );
    const citiesResults = searchResults.filter(
      ({ result_type }) => result_type === EPlaceResultType.city
    );
    return citiesResults;
  };

  return {
    searchCities,
  };
};

const placesService = PlacesService();

export default placesService;
