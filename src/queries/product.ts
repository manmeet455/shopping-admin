import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';

export const productApis = createApi({
    reducerPath: 'product',
    baseQuery: baseQueryInstance,
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({ url: `products?page=1&limit=10&affiliate=true` }),
        }),

        getProductById: build.query({
            query: (id) => ({ url: `products/${id}` }),
        }),

    }),
})
 
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
} = productApis;