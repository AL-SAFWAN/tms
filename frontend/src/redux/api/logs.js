import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const logsApi = createApi({
  reducerPath: 'logsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/api/v1',
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
    deleteAllLogs: builder.mutation({
      query: () => ({
        url: `/logs/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['logs'],
    }),
    deleteUserLogs: builder.mutation({
      query: (id) => ({
        url: `/logs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['logs'],
    }),
  }),
});

export const {
  useGetLogsQuery,
  useGetUserLogsQuery,
  useDeleteAllLogsMutation,
  useDeleteUserLogsMutation,
} = logsApi;
