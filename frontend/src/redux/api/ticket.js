import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatDate } from '../../utils/formats';
export const ticketApi = createApi({
  reducerPath: 'ticketApi',
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
  tagTypes: ['Tickets'],
  endpoints: (builder) => ({
    getTicket: builder.query({
      query: (id) => `/tickets/${id}`,
      transformResponse: (ticket) => ({
        ...ticket,
        creation_date: formatDate(ticket.creation_date),
        resolution_date: formatDate(ticket.resolution_date),
      }),
      providesTags: ['Tickets'],
    }),
    getTickets: builder.query({
      query: (filter) => {
        let queryParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value.toString());
          }
        });
        console.log(queryParams.toString());
        return `/tickets/?${queryParams.toString()}`;
      },
      transformResponse: (obj) => {
        obj.items.map((ticket) => ({
          ...ticket,
          creation_date: formatDate(ticket.creation_date),
          resolution_date: formatDate(ticket.resolution_date),
        }));
        return obj;
      },
      providesTags: ['Tickets'],
    }),
    createTicket: builder.mutation({
      query: (values) => ({
        url: `/tickets`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Tickets'],
    }),
    updateTicket: builder.mutation({
      query: (data) => ({
        url: `/tickets/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
});

export const {
  useGetTicketQuery,
  useGetTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
} = ticketApi;
