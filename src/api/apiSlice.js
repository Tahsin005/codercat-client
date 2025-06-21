import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/blogs',
        }),
        getRecentBlogs: builder.query({
            query: () => '/blogs/recent?limit=3',
        }),
    }),
});

export const { useGetBlogsQuery, useGetRecentBlogsQuery } = api;