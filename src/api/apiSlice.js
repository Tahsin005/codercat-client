import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/blogs',
        }),
        getBlogById: builder.query({
            query: (id) => `/blogs/${id}`,
        }),
        getRecentBlogs: builder.query({
            query: () => '/blogs/recent?limit=3',
        }),
        getFeaturedBlogs: builder.query({
            query: () => '/blogs/featured',
        }),
        getPostsByCategory: builder.query({
            query: (category) => `/blogs/category/${category}`,
        }),
        getCategories: builder.query({
            query: () => '/categories',
        }),
    }),
});

export const { useGetBlogsQuery, useGetRecentBlogsQuery, useGetBlogByIdQuery, useGetFeaturedBlogsQuery, useGetPostsByCategoryQuery, useGetCategoriesQuery } = api;