import { Product } from "@prisma/client";
import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    editProduct: builder.mutation<string, Product>({
      query: (product) => ({
        url: `/products/edit/${product.id}`,
        method: "PUT",
        body: product,
      }),
    }),
    removeProduct: builder.mutation<string, string>({
      query: (id) => ({
        url: `/products/remove/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
    addProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: "/products/add",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useEditProductMutation,
  useRemoveProductMutation,
  useAddProductMutation,
} = productsApi;

export const {
  endpoints: {
    getAllProducts,
    getProduct,
    editProduct,
    removeProduct,
    addProduct,
  },
} = productsApi;
