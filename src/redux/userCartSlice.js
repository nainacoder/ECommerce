import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantities: {},
  productsIncart: [],
};

const userCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQuantities: (state, action) => {
      if (action.payload.type === "increment") {
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [action.payload.id]: (state.quantities[action.payload.id] || 0) + 1,
          },
        };
      }
      if (action.payload.type === "decrement") {
        if (state.quantities[action.payload.id] === 1) {
          delete state.quantities[action.payload.id];
          let data = state.productsIncart?.filter(
            (item) => item.id !== action.payload.id
          );
          state.productsIncart = data;
          return state;
        }
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [action.payload.id]: (state.quantities[action.payload.id] || 0) - 1,
          },
        };
      }
    },
    addToCart: (state, action) => {
      return {
        ...state,
        productsIncart: [...state.productsIncart, action.payload],
      };
    },
    clearCart: (state) => {
      state.quantities = {};
      state.productsIncart = [];
    },
  },
});

export const { addToCart, setQuantities, clearCart } = userCartSlice.actions;

export default userCartSlice.reducer;
