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
  tagTypes: ['Tickets'], // Define a tag type
  endpoints: (builder) => ({
    getTicket: builder.query({
      query: (id) => `/tickets/${id}`,
      transformResponse: (ticket) => ({
        ...ticket,
        creation_date: formatDate(ticket.creation_date),
        resolution_date: formatDate(ticket.resolution_date),
      }),
      providesTags: ['Tickets'], // Associate this query with a tag
    }),
    // getTickets: builder.query({
    //   query: () => '/tickets',
    //   transformResponse: (tickets) =>
    //     tickets.map((ticket) => ({
    //       ...ticket,
    //       creation_date: formatDate(ticket.creation_date),
    //       resolution_date: formatDate(ticket.resolution_date),
    //     })),
    // }),
    getTickets: builder.query({
      query: (filter) => {
        let queryParams = new URLSearchParams();
        if (filter.status) {
          queryParams.append('status', filter.status);
        }
        if (filter.priority) {
          queryParams.append('priority', filter.priority);
        }

        // Construct the URL with any query parameters that are not null
        return `/tickets/?${queryParams.toString()}`;
      },
      transformResponse: (tickets) =>
        tickets.map((ticket) => ({
          ...ticket,
          creation_date: formatDate(ticket.creation_date),
          resolution_date: formatDate(ticket.resolution_date),
        })),
      invalidatesTags: ['Tickets'], // Invalidate this tag upon success
    }),
    createTicket: builder.mutation({
      query: (values) => ({
        url: `/tickets`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Tickets'], // Invalidate this tag upon success
    }),
    updateTicket: builder.mutation({
      query: (data) => ({
        url: `/tickets/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['Tickets'], // Invalidate this tag upon success
    }),
  }),
});

export const {
  useGetTicketQuery,
  useGetTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
} = ticketApi;
