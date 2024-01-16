import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const orderQueries = createApi({
    reducerPath: 'orders',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.VITE_APP_API_URL,
    }),
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({ url: `orders?page=1&limit=10` }),
        }),
        getOrderById: build.query({
            query: (id) => ({ url: `orders?page=1&limit=10/${id}` }),
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
    useGetOrdersQuery,
    useGetOrderByIdQuery,
} = orderQueries;