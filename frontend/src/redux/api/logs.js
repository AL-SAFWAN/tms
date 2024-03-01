import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const logsApi = createApi({
  reducerPath: 'logsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['logs'],
  endpoints: (builder) => ({
    getUserLogs: builder.query({
      query: (id) => `/logs/${id}`,
      providesTags: ['logs'],
    }),
    getLogs: builder.query({
      query: () => `/logs/`,
      providesTags: ['logs'],
    }),
  }),
});

export const { useGetLogsQuery, useGetUserLogsQuery } = logsApi;
