import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';

export const giftIdeasApis = createApi({
    reducerPath: 'orders',
    baseQuery: baseQueryInstance,
    endpoints: (build) => ({
        getGiftIdeas: build.query({
            query: () => ({ url: `gift-ideas?page=1&limit=10` }),
        })
    }),
})

export const {
    useGetGiftIdeasQuery,
} = giftIdeasApis;