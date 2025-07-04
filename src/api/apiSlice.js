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
        getBlogsBySearch: builder.query({
            query: (query) => `/blogs/search?query=${query}`,
        }),
        getPopularCategories: builder.query({
            query: () => '/categories/popular',
        }),
        getRelatedBlogs: builder.query({
            query: (blogId) => `/blogs/related/${blogId}`
        }),
        subscribeToNewsletter: builder.mutation({
            query: (email) => ({
                url: '/subscribe',
                method: 'POST',
                body: JSON.stringify({ email }),
            }),
        }),
        postBlog: builder.mutation({
            query: (blog) => ({
                url: '/blogs',
                method: 'POST',
                body: blog,
            }),
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetBlogsQuery, useGetRecentBlogsQuery, useGetBlogByIdQuery, useGetFeaturedBlogsQuery, useGetPostsByCategoryQuery, useGetCategoriesQuery, useSubscribeToNewsletterMutation, useGetBlogsBySearchQuery, useGetPopularCategoriesQuery, useGetRelatedBlogsQuery, usePostBlogMutation, useDeleteBlogMutation } = api;