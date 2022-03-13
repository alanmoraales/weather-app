import { AxiosRequestConfig, AxiosInstance } from "config/axios";

const Http = (axios: AxiosInstance) => {
  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const axiosResponse = await axios.get<T>(url, config);
    return axiosResponse.data;
  };

  const post = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const axiosResponse = await axios.post<T>(url, data, config);
    return axiosResponse.data;
  };

  const put = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const axiosResponse = await axios.put<T>(url, data, config);
    return axiosResponse.data;
  };

  const remove = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const axiosResponse = await axios.delete<T>(url, config);
    return axiosResponse.data;
  };

  return {
    get,
    post,
    put,
    remove,
  };
};

export default Http;
