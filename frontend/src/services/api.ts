import { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from 'frontend/src/utils/constants';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (url: string, config?: object): Promise<AxiosResponse> => {
  const fullUrl = `${API_BASE_URL}${url}`;
  return await apiClient.get(fullUrl, config);
};

export const post = async (url: string, data: object, config?: object): Promise<AxiosResponse> => {
  const fullUrl = `${API_BASE_URL}${url}`;
  return await apiClient.post(fullUrl, data, config);
};

export const put = async (url: string, data: object, config?: object): Promise<AxiosResponse> => {
  const fullUrl = `${API_BASE_URL}${url}`;
  return await apiClient.put(fullUrl, data, config);
};

export const del = async (url: string, config?: object): Promise<AxiosResponse> => {
  const fullUrl = `${API_BASE_URL}${url}`;
  return await apiClient.delete(fullUrl, config);
};