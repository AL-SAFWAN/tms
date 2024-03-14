import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatDate } from '../../utils/formats';
export const ticketApi = createApi({
  reducerPath: 'ticketApi',
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
  tagTypes: ['Tickets'],
  endpoints: (builder) => ({
    getTicket: builder.query({
      query: (id) => `/tickets/${id}`,
      // transformResponse: (ticket) => ({
      //   ...ticket,
      //   creation_date: formatDate(ticket.creation_date),
      //   resolution_date: formatDate(ticket.resolution_date),
      // }),
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
      transformResponse: (obj) => ({
        ...obj,
        items: obj.items.map((ticket) => ({
          ...ticket,
          creation_date: formatDate(ticket.creation_date),
          resolution_date: formatDate(ticket.resolution_date),
        })),
      }),
      providesTags: ['Tickets'],
    }),
    getAgentsTickets: builder.query({
      query: (filter) => {
        let queryParams = new URLSearchParams();
        console.log(filter, 'filter');
        Object.entries(filter).forEach(([key, value]) => {
          if (value && typeof value !== 'object') {
            queryParams.append(key, value.toString());
          }
        });
        return `/tickets/agent/${filter.path.id}/?${queryParams.toString()}`;
      },
      transformResponse: (obj) => ({
        ...obj,
        items: obj.items.map((ticket) => ({
          ...ticket,
          creation_date: formatDate(ticket.creation_date),
          resolution_date: formatDate(ticket.resolution_date),
        })),
      }),
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
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
});

export const {
  useGetTicketQuery,
  useGetTicketsQuery,
  useGetAgentsTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketApi;
