import createAxiosInstance from "config/axios";
import Http from "./http";
import environment from "@constants/environment";

const { weatherApiUrl } = environment;

const weatherApi = Http(createAxiosInstance({ baseUrl: weatherApiUrl }));

export { weatherApi };
