import { apiSlice } from './apiSlice.js';
import { PRODUCTS_URL } from '../constants.js';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, // 
    }),
    getProductDetail: builder.query({
      query: (product_ID)=>({
        url: `${PRODUCTS_URL}/${product_ID}`
      }),
      keepUnusedDataFor: 5
    }
    )
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productsApiSlice; // 
