import { apiSlice } from "../apiSlice";

const managerEndpoint = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeveloper: builder.query({
      query: ({ managerId }) => `/user?managerId=${managerId}`,
      providesTags: ["Developer"],
    }),
  }),
});

export const { useGetDeveloperQuery } = managerEndpoint;
