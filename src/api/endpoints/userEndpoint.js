import { apiSlice } from "../apiSlice";

const developerEndpoint = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedProjects: builder.query({
      query: () => `/projects`,
      providesTags: ["DevProjects"],
    }),

    addDeveloper: builder.mutation({
      query: (data) => ({
        url: `/user/developer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Developer"],
    }),

    updateDeveloper: builder.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Developer"],
    }),
    deleteDeveloper: builder.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Developer"],
    }),
  }),
});

export const { useAddDeveloperMutation } = developerEndpoint;
export const { useUpdateDeveloperMutation } = developerEndpoint;
export const { useGetAssignedProjectsQuery } = developerEndpoint;
export const { useDeleteDeveloperMutation } = developerEndpoint;
