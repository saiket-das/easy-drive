import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { ErrorProps } from "../../types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const err = result?.error as ErrorProps;
    toast.error(err.data.message);
  }
  if (result?.error?.status === 403) {
    const err = result?.error as ErrorProps;
    toast.error(err.data.message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["car", "booking"],
  endpoints: () => ({}),
});
