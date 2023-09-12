import { ACCESS_TOKEN_KEY } from "@constants/common.constant";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

const url = `${process.env.NEXT_PUBLIC_API_URL}` || "";

const httpClient = (baseURL: string = url) => {
  const http = axios.create({
    baseURL,
  });

  http.interceptors.request.use(async (config: any) => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);
    if (accessToken) {
      (
        config.headers as AxiosRequestHeaders
      ).authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 401) {
          return Promise.reject(error);
        }
        if (error?.response?.status === 400) {
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  return http;
};

export default httpClient;
