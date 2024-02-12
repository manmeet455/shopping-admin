import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';

export const productApis = createApi({
    reducerPath: 'product',
    baseQuery: baseQueryInstance,
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ page = 1, limit = 50, isAffiliate = 'true' }) => ({ url: `products?page=${page}&limit=${limit}&affiliate=${isAffiliate}` }),
        }),

        getProductById: build.query({
            query: (id) => ({ url: `products/${id}` }),
        }),

        updateProductById: build.mutation({
            query: ({ id, ...data }) => ({
                url: `products/${id}`,
                method: 'put',
                body: data,
            }),
        }),

    }),
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductByIdMutation,

} = productApis;