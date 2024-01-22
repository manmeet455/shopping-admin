import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';

export const giftIdeasApis = createApi({
    reducerPath: 'giftIdeas',
    baseQuery: baseQueryInstance,
    refetchOnMountOrArgChange: 30,
    endpoints: (build) => ({
        getGiftIdeas: build.query({
            query: () => ({ url: `https://suscel-backend.foobar.in/api/admin/category/categories?page=1&limit=10` }),
        })
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
    useGetGiftIdeasQuery
} = giftIdeasApis;