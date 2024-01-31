import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';

export const giftIdeasApis = createApi({
    reducerPath: 'giftIdeas',
    baseQuery: baseQueryInstance,
    refetchOnMountOrArgChange: 30,
    endpoints: (build) => ({
        getGiftIdeas: build.query({
            query: () => ({ url: `category/categories?page=1&limit=10` }),

        }),
        getGiftIdeasById: build.query({
            query: (id) => ({ url: `category/${id}` }),
        }),

        getGiftIdeasProductsById: build.query({
            query: (id) => ({ url: `category/${id}/products?page=1&limit=10/` }),
        }),

        getGiftIdeasEditProductsById: build.query({
            // query: (id) => ({ url: `products?page=1&limit=10&affiliate=true&giftIdeaId=${id}` })
            query: (id) => ({ url: `products?page=1&limit=10&affiliate=true${id === "new" ? "" : `&giftIdeaId=${id}`}`}),
        }),

        updateGiftIdeas: build.mutation({
            query: ({ id, ...data }) => ({
                url: `category/${id}`,
                method: 'put',
                body: data,
            }),
        }),

        deleteGiftIdeas: build.mutation({
            query: (id) => ({ url: `category/${id}`, method: "delete" }),
        }),

        addGiftIdeas: build.mutation({
            query: (data) => ({
                url: 'category',
                method: 'post',
                body: data,
            }),
        }),


        // updateOrder: build.mutation({
        //     query: (id, {data}) => ({ url: `post/${id}` }),
        // }),
        // deleteOrders: build.query({
        //     query: (id) => ({ url: `post/${id}` }),
        // }),
        // createOrders: build.query({
        //     query: (id) => ({ url: `post/${id}` }),
        // }),
    }),
})

export const {
    useGetGiftIdeasQuery,
    useGetGiftIdeasByIdQuery,
    useGetGiftIdeasProductsByIdQuery,
    useGetGiftIdeasEditProductsByIdQuery,
    useUpdateGiftIdeasMutation,
    useDeleteGiftIdeasMutation,
    useAddGiftIdeasMutation,
} = giftIdeasApis;