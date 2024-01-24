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
            query: (id) => ({ url: `products?page=1&limit=10&affiliate=true&giftIdeaId=${id}`}),
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
    useGetGiftIdeasEditProductsByIdQuery
} = giftIdeasApis;