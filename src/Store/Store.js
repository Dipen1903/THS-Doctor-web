import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Reducers/AuthSlice";
import LayoutSlice from "./Reducers/LayoutSlice";

export const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice,
    LayoutSlice: LayoutSlice,
  },
});
