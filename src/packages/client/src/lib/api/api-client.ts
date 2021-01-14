import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import { AuthPaths } from '@packages/common';

import { ApiError, ErrorDetails, globalErrorField } from './api-error';

interface BaseResponse {
  errors?: Record<string, string>;
}

interface ApiErrorDataType {
  data: ErrorDetails;
  status: number;
}

type ApiClientRequest = <Req, Res>(url: string, data?: Req, opts?: Partial<AxiosRequestConfig>) => Promise<Res>;

interface ApiClient {
  get: ApiClientRequest;
  post: ApiClientRequest;
  put: ApiClientRequest;
  delete: ApiClientRequest;
}

const isOkStatus = (status: number): boolean => {
  return status >= 200 && status < 300;
};

const isUnauthorizedStatus = (status: number): boolean => {
  return status === 401;
};

const throwApiError = ({ data = {}, status = 500 }: ApiErrorDataType): ApiError => {
  console.error('API: Error Ocurred', status, data); //eslint-disable-line
  throw new ApiError(data, status);
};

export function initApi({ apiUrl, globalError }: { apiUrl: string; globalError: string }): ApiClient {
  const generalError = {
    [globalErrorField]: globalError,
  };

  const handleResponse = <R extends BaseResponse>(response: AxiosResponse<R>): R => {
    if (!response) {
      throwApiError({
        data: generalError,
        status: 500,
      });
      return response;
    }

    if (isOkStatus(response.status)) {
      return response.data;
    }
    if (isUnauthorizedStatus(response.status)) {
      const { href } = window.location;
      window.location.href = AuthPaths.signinPath(href, true);
      return response.data;
    }

    const errorData: ApiErrorDataType = {
      status: response.status,
      data: response.data && response.data.errors ? response.data.errors : generalError,
    };
    throwApiError(errorData);
    return response.data;
  };

  const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    responseType: 'json',
  });

  // Do not throw errors on 'bad' server response codes
  api.interceptors.response.use(
    (axiosConfig) => axiosConfig,
    (error: AxiosError<Record<string, unknown>>): AxiosResponse<Record<string, unknown>> =>
      error.response || {
        data: {},
        status: 500,
        statusText: '',
        config: error.config,
        headers: {},
      },
  );

  const httpRequest = (method: Method) =>
    async function <Req, Res>(url: string, data?: Req, opts?: Partial<AxiosRequestConfig>): Promise<Res> {
      let urlWithSlash: string = url;

      if (urlWithSlash[0] !== '/') {
        urlWithSlash = `/${urlWithSlash}`;
      }

      const options: AxiosRequestConfig = {
        method,
        url: urlWithSlash,
        ...opts,
      };

      if (data) {
        if (method === 'get') {
          options.params = data;
        } else {
          options.data = data;
        }
      }

      const response: AxiosResponse<Res> = await api(options);
      return handleResponse(response);
    };

  const getRequest = httpRequest('get');
  const postRequest = httpRequest('post');
  const putRequest = httpRequest('put');
  const deleteRequest = httpRequest('delete');

  return {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
  };
}
