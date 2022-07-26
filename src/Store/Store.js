import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Reducers/AuthSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import RegisterSlice from "./Reducers/RegiserSlice";

export const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice,
    LayoutSlice: LayoutSlice,
    RegisterSlice: RegisterSlice,
  },
});
