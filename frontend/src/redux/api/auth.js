import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/',
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: `/login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: values.email,
          password: values.password,
        }),
      }),
    }),
    singUp: builder.mutation({
      query: (values) => ({
        url: `/signup`,
        method: 'POST',
        body: values,
      }),
    }),
  }),
});

export const { useLoginMutation, useSingUpMutation } = authApi;
