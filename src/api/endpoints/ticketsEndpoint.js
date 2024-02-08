import { apiSlice } from "../apiSlice";

const ticketsEnpoint = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/ticket",
      providesTags: ["Tickets"],
    }),
    addTicket: builder.mutation({
      query: (data) => ({
        url: `/ticket`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),
    deleteTicket: builder.mutation({
      query: (data) => ({
        url: `/ticket/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
    updateTicketDetails: builder.mutation({
      query: (data) => ({
        url: `/ticket/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),
    updateTicketStatus: builder.mutation({
      query: (data) => ({
        url: `/ticket/updatestatus/${data.id}`,
        method: "PUT",
        body: {
          status: data.status,
        },
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const { useGetTicketsQuery } = ticketsEnpoint;
export const { useAddTicketMutation, useDeleteTicketMutation } = ticketsEnpoint;
export const { useUpdateTicketStatusMutation, useUpdateTicketDetailsMutation } =
  ticketsEnpoint;
