// features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  products: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: { ...action.payload } };
    },
    setAllProducts: (state, action) => {
      return { ...state, products: [...action.payload] };
    },
  },
});

export const { setUser, clearUser, setAllProducts } = userSlice.actions;

export default userSlice.reducer;
