// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userCartSlice from "./userCartSlice";

const store = configureStore({
  reducer: {
    state: userReducer,
    cart: userCartSlice,
  },
});

export default store;
