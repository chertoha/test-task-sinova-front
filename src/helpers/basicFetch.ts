import { ResponseError } from "./responseErrors";
import { stringifySearchParams } from "./url";

const { API_URL } = process.env;

export type FetchOptions = {
 method?: string;
 params?: any;
 body?: any;
 headers?: any;
 next?: NextFetchRequestConfig;
};

export const basicFetch = async <T>(
 url: string,
 options?: FetchOptions,
): Promise<T | undefined> => {
 const method = options?.method || "GET";
 const params = options?.params;
 const body = options?.body;
 const headers = options?.headers;
 const next = options?.next;
 const searchParams = params && stringifySearchParams(params);

 const host = API_URL + "/api";
 const baseUrl = `${host}${url}`;
 const fetchUrl = searchParams ? baseUrl + "?" + searchParams : baseUrl;

 const response = await fetch(fetchUrl, {
  method,
  body,
  headers,
  next,
 });

 if (!response.ok) {
  let message = "Failed to fetch data";
  const errorResponse = await response.json();
  message = `CHE LOG -> ${errorResponse?.message} / status ${response.status}` || message;
  throw new ResponseError(message, errorResponse);
 }

 const contentType = response.headers.get("content-type");
 if (!contentType || !contentType.includes("application/json")) {
  return Promise.resolve(undefined);
 }

 return response.json() as T;
};
