import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance(config);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const http = {
  get: <ResponseType>(url: string, restConfig: AxiosRequestConfig = {}) =>
    request<ResponseType>({ method: 'GET', url, ...restConfig }),
  post: <RequestType, ResponseType>(
    url: string,
    data: RequestType,
    restConfig: AxiosRequestConfig = {}
  ) => request<ResponseType>({ method: 'POST', url, data, ...restConfig }),
};

export default http;
