import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryInstance from './baseQuery';

export const uploadApis = createApi({
    reducerPath: 'upload',
    baseQuery: baseQueryInstance,
    endpoints: (build) => ({
        addImage: build.mutation({
            query: (data) => ({ url: `upload/single`, method: 'post', body: data }),
        }),
        
        addMultipleImages: build.mutation({
            query: (data) => ({ url: `upload/multiple`, method: 'post', body: data }),
        }),
    }),
})

export const {
    useAddImageMutation,
    useAddMultipleImagesMutation
} = uploadApis;