import createAxiosInstance from "config/axios";
import Http from "./http";
import environment from "@constants/environment";

const { reservamosApiUrl } = environment;

const reservamosApi = Http(createAxiosInstance({ baseUrl: reservamosApiUrl }));

export { reservamosApi };
