import { Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../../app/services/products";
import { RootState } from "../../app/store";

interface InitialState {
  products: Product[] | null;
}

const initialState: InitialState = {
  products: null,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectproducts = (state: RootState) => state.products.products;
