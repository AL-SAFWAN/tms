import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentsApi = createApi({
  reducerPath: 'commentApi',
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
  tagTypes: ['comment'],
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: `/comments/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsApi;
