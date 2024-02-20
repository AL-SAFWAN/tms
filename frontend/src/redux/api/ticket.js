import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
  reducerPath: 'ticketAPi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/tickets/',
    prepareHeaders: (headers, { getState }) => {
      //   const token = getState().auth.token; // Assuming the token is stored in the auth slice of your Redux state
      const token = 'test'; // Assuming the token is stored in the auth slice of your Redux state
      if (token) {
        headers.set(
          'Authorization',
          `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZSI6IlJlcXVlc3RlciIsImV4cCI6MTcwODQ0MzkyMX0.BDb-4vPi01pkE4a3C_L77ZZUvNaquWTWg6VVcVgAYaU'}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTicket: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetTicketQuery } = ticketApi;
