import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const giftBundleQueries = createApi({
    reducerPath: 'giftBundles',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_APP_API_URL,
    }),
    endpoints: (build) => ({
        getGiftBundles: build.query({
            query: () => ({ url: `bundles?page=1&limit=10` }),
        }),
        getGiftBundleById: build.query({
            query: (id) => ({ url: `bundles?page=1&limit=10/${id}` }),
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
    useGetGiftBundlesQuery,
    useGetGiftBundlesByIdQuery,
} = giftBundleQueries;