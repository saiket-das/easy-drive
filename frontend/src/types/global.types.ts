import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type ErrorProps = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type MetaProps = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type ResponseProps<T> = {
  data?: T;
  error?: ErrorProps;
  meta?: MetaProps;
  success: boolean;
  message: string;
};

export type ResponseReduxProps<T> = ResponseProps<T> & BaseQueryApi;

export type QueryParamProps = {
  name: string;
  value: boolean | React.Key;
};
