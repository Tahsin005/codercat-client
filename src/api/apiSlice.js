import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Blog', 'Blogs'],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/blogs',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Blog', id })),
                        { type: 'Blogs', id: 'LIST' },
                    ]
                    : [{ type: 'Blogs', id: 'LIST' }],
        }),
        getBlogById: builder.query({
            query: (id) => `/blogs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id }],
        }),
        getRecentBlogs: builder.query({
            query: () => '/blogs/recent?limit=3',
            providesTags: [{ type: 'Blogs', id: 'RECENT' }],
        }),
        getFeaturedBlogs: builder.query({
            query: () => '/blogs/featured',
            providesTags: [{ type: 'Blogs', id: 'FEATURED' }],
        }),
        getPostsByCategory: builder.query({
            query: (category) => `/blogs/category/${category}`,
            providesTags: (result, error, category) => [{ type: 'Blogs', id: `CATEGORY_${category}` }],
        }),
        getCategories: builder.query({
            query: () => '/categories',
        }),
        getBlogsBySearch: builder.query({
            query: (query) => `/blogs/search?query=${query}`,
            providesTags: (result, error, query) => [{ type: 'Blogs', id: `SEARCH_${query}` }],
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
            invalidatesTags: [{ type: 'Blogs', id: 'LIST' }, { type: 'Blogs', id: 'RECENT' }, { type: 'Blogs', id: 'FEATURED' }],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Blog', id },
                { type: 'Blogs', id: 'LIST' },
                { type: 'Blogs', id: 'RECENT' },
                { type: 'Blogs', id: 'FEATURED' },
            ],
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...blog }) => ({
                url: `/blogs/${id}`,
                method: 'PUT',
                body: blog,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Blog', id },
                { type: 'Blogs', id: 'LIST' },
                { type: 'Blogs', id: 'RECENT' },
                { type: 'Blogs', id: 'FEATURED' },
            ],
        }),
    }),
});

export const { useGetBlogsQuery, useGetRecentBlogsQuery, useGetBlogByIdQuery, useGetFeaturedBlogsQuery, useGetPostsByCategoryQuery, useGetCategoriesQuery, useSubscribeToNewsletterMutation, useGetBlogsBySearchQuery, useGetPopularCategoriesQuery, useGetRelatedBlogsQuery, usePostBlogMutation, useDeleteBlogMutation, useUpdateBlogMutation } = api;